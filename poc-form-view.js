import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { calculateSplices } from '@polymer/polymer/lib/utils/array-splice.js';

import { SomaDynamicFormView } from '@soma/soma-dynamic-common/views/soma-dynamic-form-view.js';
import { getStagedInstance, submit, generateNewId, generateUUID } from "@soma/soma-dynamic-common/utils/entities-utils.js";

const uuidv4 = require('uuid/v4');

/**
 * `LowerCaseDashedName` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
export class PocFormView extends SomaDynamicFormView {

    static get template() {
        return super.template;
    }

    static get properties() {
        return {
            title: {
                type: String
            },
            entityName: {
                type: String
            },
            instanceId: {
                type: String
            },
            model: {
                type: Object
            },
            currentBindings: {
                type: Array
            },
            formValues: {
                type: Object
            },
            __oldModelName__: {
                type: String
            },
            pageName: {
                type: String,
                value: 'formView'
            },
            name: {
                type: String
            },
            hasNext: {
                type: Boolean,
                value: false
            },
            hasBack: {
                type: Boolean,
                value: false
            },
            hasCarouselControls: {
                type: Boolean,
                value: false
            }
        }
    }



    /**
     * Instance of the element is created/upgraded. Use: initializing state,
     * set up event listeners, create shadow dom.
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * Use for one-time configuration of your component after local
     * DOM is initialized.
     */
    ready() {
        super.ready();

        this.$.form.addEventListener('form-state-loaded', (event) => this._updateStaging(event));

        this.$.collisionSolver.addEventListener('commit-changes', (event) => this._commitChanges(event));
        this.$.collisionSolver.addEventListener('discard-changes', (event) => this._discardChanges(event));

        window.addEventListener('navigator-ready', () => {
            this.correlationId = uuidv4();
            this.dispatchEvent(new CustomEvent('request-navigation-status', {
                bubbles: true,
                composed: true,
                detail: {
                    correlationId: this.correlationId
                }
            }));
        });

        window.addEventListener('set-navigation-controls', (event) => {
            if (event.detail.correlationId == this.correlationId) {
                this.showNavigationControls(event.detail);
            }
        });

        this.bindToHandler('route', (route) => this._buildView(route.page, route.subject));


        this.shadowRoot.addEventListener('remove-entity', (event) => this._removeEntity(event.detail));
    }

    _buildView(page, subject) {
        this._loadView(page, subject);
    }

    _cleanView() {
        this._unbindPath();
    }

    _setViewState(subject) {
        if (subject && subject.length >= 1) {
            this.entityName = subject[0];
            this.viewMode = subject[1];
            this.instanceId = subject[2];
            this.viewName = subject[3] || 'default';
        }
    }

    _restoreDefaultSettings() {
        this.setSaveBtnText("Salvar");
        this.removeAttribute('hide-button');
        this.setDefaultTitle();
        this.$.form.clearStatusBar();
        this.formValues = {};
    }

    _populateForm() {

        let idField = this.model.idField;

        if (this.viewMode != 'new') {

            let watchRemoved = () => {
                this.currentBindings.push(
                    this.bindToHandler(`entities.${this.entityName}.instances.${this.instanceId}`, (instance) => {
                        if (!instance) {
                            this.$.form.setStatusMessage('O formulário não é mais válido, pois o registro foi removido.', 'error');
                            this.setMode('info');
                            this.dispatch(this.actions.removeInstance(this.entityName, this.instanceId));
                        }
                    })
                );
            }

            if (this.state.entities[this.entityName].instances[this.instanceId] == undefined) {
                let stagingBind;

                stagingBind = this.bindToHandler(`entities.${this.entityName}.instances.${this.instanceId}`, (instance) => {
                    if (instance != undefined) {
                        this.formValues = getStagedInstance(this.entityName, this.instanceId);
                        if (stagingBind != undefined) {
                            this.unbindFromPath(stagingBind);
                        }
                        watchRemoved();

                    }
                });
                this.currentBindings.push(stagingBind);
            } else {
                this.formValues = getStagedInstance(this.entityName, this.instanceId);
                watchRemoved();
            }



        } else {
            this.formValues = getStagedInstance(this.entityName, this.instanceId, { [idField]: this.instanceId, isNew: true });
            this.dispatch(this.actions.flagModification(this.entityName, this.instanceId, 'uuid', true));
        }


        if (this.model.dependsOn) {
            this._decorateFormValue(this.model.fields[this.model.fieldByName[this.model.dependsOn.fieldName]]);
        }

        this._populateFields();

    }

    _populateFields() {
        let modelName = this.model.name;
        let groupsForView = this.model.views[this.viewName].groups;
        let fields = this.model.fields.filter(field => {
            let proceed = false;
            for (let group of field.groups) {
                proceed = groupsForView.includes(group) || proceed;
            }
            return proceed;
        });


        for (let i = 0; i < fields.length; i++) {
            let field = fields[i];
            let fieldName = fields[i].name;

            switch (fields[i].type) {
                case 'text':             
                case 'email': 
                case 'number': 
                case 'computed': {
                    this.currentBindings.push(this.bindToHandler(`workspace.${modelName}.staging.${this.instanceId}.${fieldName}`, (fieldValue) => {
                        this.$.form.setFieldValue(fieldName, fieldValue, modelName);
                    }));
                    break;
                }               

                case 'list': {
                    this.$.form.setItemList(fieldName, field.values, modelName);
                    this.currentBindings.push(this.bindToHandler(`workspace.${modelName}.staging.${this.instanceId}.${fieldName}`, (fieldValue) => {
                        this.$.form.setFieldValue(fieldName, fieldValue, modelName);
                    }));
                    break;
                }

                case 'object': {
                    this.$.form.setItemList(fieldName, field.settings.entityList, modelName);
                    this.currentBindings.push(this.bindToHandler(`workspace.${modelName}.staging.${this.instanceId}.${fieldName}`, (fieldValue) => {
                        this.$.form.setFieldValue(fieldName, fieldValue, modelName);
                    }));
                    break;
                }                

                case 'reference': {
                    let target = field.target;
                    let targetField = field.targetField;
                    let uniques = this.model.uniques;


                    this.currentBindings.push(this.bindPathsToHandler((targetInstances, targetStagedInstances) => {

                        let itemsList = Object.values({ ...targetInstances, ...targetStagedInstances });

                        if (targetField != undefined) {
                            itemsList = itemsList.filter(targetInstance => targetInstance[targetField] == this.instanceId);
                        }

                        let previousUniqueList = undefined;
                        let currentUniqueList;
                        for (let unique of uniques) {
                            if (unique.includes(fieldName)) {
                                if (unique.length > 1) {


                                    let allTargetIds = Object.keys(targetInstances);
                                    let filledFields = [];
                                    let emptyFields = [];
                                    for (let uniqueField of unique) {
                                        if (this.formValues[uniqueField] != undefined && uniqueField != fieldName) {
                                            filledFields.push(uniqueField);
                                        } else {
                                            emptyFields.push(uniqueField);
                                        }
                                    }

                                    let allExistingTargets = [];

                                    if (filledFields.length > 0) {
                                        //tem coisa preenchida
                                        let instances = Object.values(this.state.entities[this.entityName].instances);
                                        let filteredInstances = instances;
                                        for (let filledField of filledFields) {
                                            filteredInstances = filteredInstances.filter(instance => instance[filledField] == this.formValues[filledField]);
                                        }

                                        allExistingTargets = filteredInstances.map(instance => instance[fieldName]);
                                        for (let existingId of allExistingTargets) {
                                            let idx = allTargetIds.indexOf(existingId);
                                            if (idx >= 0) {
                                                allTargetIds.splice(idx, 1);
                                            }
                                        }

                                        currentUniqueList = allTargetIds.map(id => targetInstances[id]);

                                        if (this.formValues[fieldName] != undefined) {
                                            currentUniqueList.push(targetInstances[this.formValues[fieldName]]);
                                        }
                                    }

                                    //eh uma composta

                                } else if (targetField != undefined) {
                                    currentUniqueList = itemsList.filter(targetInstance => targetInstance[targetField] == undefined);
                                }
                            }

                            if (previousUniqueList == undefined && currentUniqueList != undefined) {
                                previousUniqueList = currentUniqueList;
                            } else if (previousUniqueList != undefined && currentUniqueList != undefined) {
                                let commonItemsList = [];
                                for (let item of currentUniqueList) {
                                    for (let previousItem of previousUniqueList) {
                                        if (previousItem.name == item.name) {
                                            commonItemsList.push(item);
                                            break;
                                        }
                                    }
                                }
                                previousUniqueList = commonItemsList;

                            }
                            currentUniqueList = undefined;
                        }

                        itemsList = previousUniqueList == undefined ? itemsList : previousUniqueList;
                        itemsList = itemsList.map(targetInstance => ({
                            name: targetInstance[field.selectorName],
                            title: targetInstance[field.selectorTitle]
                        }));

                        this.$.form.setItemList(fieldName, itemsList, modelName);
                        if (this.formValues[fieldName] != undefined) {
                            this.$.form.setFieldValue(fieldName, this.formValues[fieldName], this.entityName);
                        }


                    }, `entities.${target}.instances`, `workspace.${target}.staging`));



                    break;
                }

                case 'associationMaster': {
                    let targetName = field.target;
                    let targetBinding;

                    this.currentBindings.push(this.bindToHandler(`workspace.${modelName}.staging.${this.instanceId}.${fieldName}`, (targetId) => {
                        if(targetBinding!=undefined){
                            this.unbindFromPath(targetBinding);
                        }
                        
                        if (targetId != undefined) {
                            targetBinding = this.bindToHandler(`entities.${targetName}.instances.${targetId}`, (targetEntityInstance) => {
                                let targetWorkspaceInstance = getStagedInstance(targetName, targetId);
                                let itemsList = [
                                    {
                                        name: targetWorkspaceInstance[field.selectorName],
                                        title: targetWorkspaceInstance[field.selectorTitle]
                                    }
                                ];

                                this.$.form.setItemList(fieldName, itemsList, modelName);
                                this.$.form.setFieldValue(fieldName, targetId, modelName);
                            });
                            this.currentBindings.push(targetBinding);
                        } else {
                            this.$.form.setItemList(fieldName, [], modelName);
                            this.$.form.setFieldValue(fieldName, targetId, modelName);
                        }

                    }));

                    break;
                }


            }
        }
    }

    _loadView(page, subject) {

        this._cleanView();

        if (page && subject) {
            if (page == this.name) {

                this.pageName = "loading";
                this._setViewState(subject);

                if (this.viewMode == 'new') {
                    if (this.state.entities[this.entityName].instances[this.instanceId] != undefined) {

                        this.dispatchEvent(new CustomEvent('navigate', {
                            bubbles: true,
                            composed: true,
                            detail: {
                                destinations: [`${this.name}/${this.entityName}/edit/${this.instanceId}/${this.viewName}`],
                                previousDestination: `${this.name}/${this.entityName}/new/${this.instanceId}/${this.viewName}`
                            }
                        }));

                        return;
                    }
                }

                if (this.entityName && this.instanceId) {


                    this.pageName = "formView";

                    this.model = this.state.entities[this.entityName].model;

                   // if (this.entityName == 'TriggerConf'){    

                        //this.$.saveButton.setAttribute('hidden',true);                             
                        //this.$.cancelButton.setAttribute('hidden',true);    
                       // this.setAttribute('hide-button',true);
                    //} else {
                        this._restoreDefaultSettings();
                   // }

                    if (this.model && this.model.layoutConfiguration && this.model.layoutConfiguration.size) {
                        this.$.container.classList.add(this.model.layoutConfiguration.size);
                    }
                    else {
                        this.$.container.classList.add('medium');
                    }

                    //DO NOT CHANGE THIS ORDER - ESTE CODIGO NAO PODE SER OTIMIZADO
                    //HORAS SACRIFICADAS PARA O DEUS DA OTIMIZACAO: 9
                    if (this.model.name != this.__oldModelName__ || this.viewName != this.__oldViewName__) {
                        this.$.form.loadForm(this.model, this.viewMode, this.viewName);

                        this.__oldModelName__ = this.model.name;
                        this.__oldViewName__ = this.viewName;
                    }

                    this.setMode(this.viewMode);
                }



                this.correlationId = uuidv4();


                this.dispatchEvent(new CustomEvent('request-navigation-status', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        correlationId: this.correlationId
                    }
                }));

                this._populateForm();


            }
        }

    }




    _unbindPath() {
        if (!this.currentBindings)
            this.currentBindings = [];

        for (let i = 0; i < this.currentBindings.length; i++) {
            this.unbindFromPath(this.currentBindings[i]);
        }
    }





    _decorateFormValue(field) {

        let value;
        let parentInstanceId;

        if (this.state.workspace[this.entityName].staging[this.instanceId]) {
            let targetId = this.state.workspace[this.entityName].staging[this.instanceId][field.name];
            if (targetId) {
                value = getStagedInstance(field.target, targetId);
            }
        }

        if (!value) {
            let previousPath = this.state.route.path[this.state.route.path.length - 2].split('/');
            if (previousPath.length > 0) {
                let parentEntityName = previousPath[2];

                if (previousPath[3] == 'edit') {
                    parentInstanceId = previousPath[4];
                    //  value = this.state.entities[parentEntityName].instances[parseInt(parentInstanceId)];
                    value = this.state.entities[parentEntityName].instances[parentInstanceId];
                } else if (previousPath[3] == 'new') {
                    parentInstanceId = previousPath[4];
                    value = this.state.workspace[parentEntityName].staging[parentInstanceId];
                }
            }
        }


        if (value && field) {
            this.dispatch(this.actions.changeInstance(this.entityName,this.instanceId,field.name,value[field.selectorName]));
            this.dispatch(this.actions.flagModification(this.entityName,this.instanceId,field.name,true));
        }

    }


    _updateStaging(event) {

        let stagingValues;
        let instanceValues = this.state.entities[this.entityName].instances[this.instanceId];

        if (this.state.workspace[this.entityName]) {
            stagingValues = this.state.workspace[this.entityName].staging[this.instanceId];            
        }        

        if (stagingValues && event.detail.fieldValue != stagingValues[event.detail.fieldName] && (event.detail.fieldValue != undefined || event.detail.fieldValue == null)) {
            this.dispatch(this.actions.changeInstance(this.entityName, this.instanceId, event.detail.fieldName, event.detail.fieldValue));

            let modified = !instanceValues || instanceValues[event.detail.fieldName] != event.detail.fieldValue;

            this.dispatch(this.actions.flagModification(this.entityName, this.instanceId, event.detail.fieldName, modified));

            /////testes do campo com regra de formação
            let computedFields = this.model.fields.filter(field => field.type == "computed");
            for (let computedField of computedFields) {

                let formationRules = computedField.formationRules;
                let customValue;
                for (let rule of formationRules) {
                    let field = this.model.fields[this.model.fieldByName[rule.fieldName]];
                    let value;
                    if (field.type == "reference") {
                        let targetInstance = getStagedInstance(field.target, stagingValues[rule.fieldName]);
                        if (targetInstance != undefined) {
                            value = targetInstance[rule.displayValue];
                        }
                    } else if (field.type == "list" && field.values != undefined) {
                        let listValue = field.values.find(value => value.name == stagingValues[rule.fieldName]);
                        if (listValue != undefined) {
                            value = listValue[rule.displayValue];
                        }
                    } else {
                        value = stagingValues[rule.fieldName];
                    }

                    if (customValue == undefined) {
                        customValue = value;
                    } else {
                        customValue = `${customValue} - ${value}`;
                    }
                }

                this.dispatch(this.actions.changeInstance(this.entityName, this.instanceId, computedField.name, customValue));

            }

        }




    }

    _solveCascade(entityName, instanceId) {
        let skip = false;
        if (this.model.dependsOn) {

            let instance = getStagedInstance(entityName, instanceId);
            let targetId = instance[this.model.dependsOn.fieldName];
            let parentInstance = getStagedInstance(this.model.dependsOn.entityName, targetId);

            if (parentInstance.isNew) {
                if (instance.isNew) {

                    let stagedTarget = getStagedInstance(this.model.dependsOn.entityName, targetId);
                    let targetModel = this.state.entities[this.model.dependsOn.entityName].model;
                    let fieldNames = targetModel.fieldsByTarget[entityName] || [];

                    for (let i = 0; i < fieldNames.length; i++) {
                        let field = targetModel.fields[targetModel.fieldByName[fieldNames[i]]];
                        let targetField;
                        let modified = false;
                        if (field.multValue) {
                            targetField = stagedTarget[fieldNames[i]] || [];
                            targetField = targetField.slice();
                            if (!targetField.includes(instance[this.model.idField])) {
                                targetField.push(instance[this.model.idField]);
                                modified = true;
                            }
                        } else {
                            if (targetField != instance[this.model.idField]) {
                                targetField = instance[this.model.idField];
                                modified = true;
                            }

                        }

                        this.dispatch(this.actions.changeInstance(this.model.dependsOn.entityName, targetId, fieldNames[i], targetField));
                        this.dispatch(this.actions.flagModification(this.model.dependsOn.entityName, targetId, fieldNames[i], modified));

                    }

                    skip = true;
                }
            }
        }
        return skip;
    }

    _submitChanges(entityName, instanceId) {

        let submitPropagation = this.state.workspace[entityName].submitPropagation[instanceId];

        let submitList = [{ entityName, instanceId }].concat(submitPropagation);
        let collisions = [];
        let models = {};
        let instances = {};

        if (!this._solveCascade(entityName, instanceId)) {

            for (let submitInstance of submitList) {
                let model = this.state.entities[submitInstance.entityName].model;
                let stagedValues = getStagedInstance(submitInstance.entityName, submitInstance.instanceId);
                let modifiedFields = this.state.workspace[submitInstance.entityName].modifiedFields[submitInstance.instanceId];
                let collision = this._hasCollision(model, submitInstance.instanceId, stagedValues, modifiedFields);

                if (collision.hasCollision) {
                    models[model.name] = model;
                    instances[model.name] = instances[model.name] || {};
                    instances[model.name][submitInstance.instanceId] = stagedValues;
                    collisions.push(collision);
                }

            }

            if (collisions.length > 0) {
                //view de colisao
                this.$.closeButton.setAttribute('hidden', null);
                this.showNavigationControls(false);
                this.$.collisionSolver.setReference(entityName, instanceId);
                this.$.collisionSolver.loadView(models, instances, collisions);
                this.title = 'Resolução de Conflitos';
                this.pageName = 'collisionView';
                return false;
            }

            for (let submitInstance of submitList) {
                let model = this.state.entities[submitInstance.entityName].model;
                let stagedValues = getStagedInstance(submitInstance.entityName, submitInstance.instanceId);
                let modifiedFields = this.state.workspace[submitInstance.entityName].modifiedFields[submitInstance.instanceId];
                submit(model, submitInstance.instanceId, stagedValues, modifiedFields);
            }

            this._unbindPath();

        }
        return true;

    }



    _hasCollision(model, instanceId, stagedValues, modifiedFields) {

        let entityName = model.name;

        let collisions = { entityName, instanceId, fields: {}, hasCollision: false };
        let instance = this.state.entities[model.name].instances[instanceId];
        let fields = model.fields;

        if (instance) {
            for (let i = 0; i < fields.length; i++) {
                let hasCollision = false;
                let instanceValue = instance[fields[i].name];
                let previousValue = modifiedFields[fields[i].name].previousValue;
                let formValue = stagedValues[fields[i].name];
                if (fields[i].multValue) {

                    let splices = calculateSplices(formValue, previousValue);
                    let merged = instanceValue.slice();

                    for (let splice of splices) {
                        for (let removed of splice.removed) {
                            if (merged.indexOf(removed) > -1) {
                                merged.splice(merged.indexOf(removed), 1);
                            }
                        }

                        for (let j = 0; j < splice.addedCount; j++) {
                            merged.push(formValue[splice.index + j]);
                        }
                    }

                    stagedValues[fields[i].name] = merged;

                } else {
                    if (instanceValue != previousValue) {
                        hasCollision = true;
                    }
                }

                if (hasCollision) {
                    collisions.hasCollision = true;
                    collisions.entityName = entityName;
                    collisions.instanceId = instanceId;
                    collisions.fields[fields[i].name] = {
                        dbValue: instanceValue,
                        instanceValue: previousValue,
                        formValue
                    }
                }
            }
        }

        return collisions;

    }

    _commitChanges(event) {

        let entityNames = event.detail.entityNames;
        let instances = event.detail.instances;

        for (let entityName of entityNames) {
            for (let instance of Object.values(instances[entityName])) {
                let modifiedFields = this.state.workspace[entityName].modifiedFields[instance[this.model.idField]];
                let submitPropagation = this.state.workspace[entityName].submitPropagation[instance[this.model.idField]];

                this.dispatch(this.actions.removeInstance(entityName, instance[this.model.idField]));

                getStagedInstance(entityName, instance[this.model.idField]);

                let modifiedList = Object.keys(modifiedFields).filter(fieldName => {
                    return modifiedFields[fieldName].modified;
                });

                for (let fieldName of modifiedList) {
                    this.dispatch(this.actions.changeInstance(entityName, instance[this.model.idField], fieldName, instance[fieldName]));
                    this.dispatch(this.actions.flagModification(entityName, instance[this.model.idField], fieldName, true));
                }

                for (let propagationRule of submitPropagation) {
                    this.dispatch(this.actions.submitPropagation(entityName, instance[this.model.idField], propagationRule.entityName, propagationRule.instanceId));
                }

            }
        }


        this.$.backButton.removeAttribute('hidden');
        this.setDefaultTitle();
        this.pageName = "formView";


        let shouldContinue = this._submitChanges(event.detail.referenceEntityName, event.detail.referenceInstanceId);

        let view = this.model.views[this.viewName];
        if (view.next.destination && shouldContinue) {
            this.navigate();
        }

    }

    _discardChanges(event) {
        for (let entityName of event.detail.entityNames) {
            for (let id of event.detail.instanceIds[entityName]) {
                this.dispatch(this.actions.removeInstance(entityName, id));
            }
        }

        this.$.closeButton.removeAttribute('hidden');
        this.setDefaultTitle();
        this.pageName = 'formView';

        //this.dispatchEvent(new CustomEvent('cancel-instance', { bubbles: true, composed: true, detail: { entityName: this.entityName, instanceId: this.instanceId } }));
        this.dispatchEvent(new CustomEvent('navigate', {
            bubbles: true,
            composed: true,
            detail: {
                destinations: ['remove']
            }
        }));

    }

    _commit() {
        let view = this.model.views[this.viewName];
        let shouldContinue = true;
        if (this.$.form.validateForm()) {
            if (view.next.action == "submit") {
                shouldContinue = this._submitChanges(this.entityName, this.instanceId);
            }

            if (view.next.action == "submitall") {
                console.log(this.entityName)
                console.log(this.instanceId)
                
                let movi = this.state.entities[this.entityName].instances[this.instanceId];                
                

                //shouldContinue = this._submitChanges(this.entityName, this.instanceId);
            }


            if (view.next.destination && shouldContinue) {
                this.navigate();
            }



        } else {
            setTimeout(() => this.$.form.clearStatusBar(), 5000);
            this.$.form.setStatusMessage('O formulário possui campos inválidos.', 'error');
        }
    }


    _removeEntity(event) {        
        let entityName = event.entityName;
        let instanceId = event.instanceId;
        let instance = this.state.entities[entityName].instances[instanceId]

        this.dispatch(this.actions.removeInstance(entityName, instanceId));
        if (instance != undefined) {

            if (Soma.container.websocket) {
                let msgType = 'REMOVE_ENTITY';

                Soma.container.websocket.sendMessage(
                    { type: msgType, entity: entityName, id: instance.id }
                );
            }
        }
    }



    _back() {
        this.dispatchEvent(new CustomEvent('navigate', {
            bubbles: true,
            composed: true,
            detail: {
                destinations: ['back']
            }
        }));
    }

    _next() {
        this.dispatchEvent(new CustomEvent('navigate', {
            bubbles: true,
            composed: true,
            detail: {
                destinations: ['next']
            }
        }));
    }

    _cancelChanges() {
        let instance = this.state.entities[this.entityName].instances[this.instanceId];
        this.dispatch(this.actions.cancel(this.entityName, this.instanceId, instance));

        this.dispatchEvent(new CustomEvent('navigate', {
            bubbles: true,
            composed: true,
            detail: {
                destinations: ['remove']
            }
        }));


    }

    _cancelAll() {

        this.dispatchEvent(new CustomEvent('navigate', {
            bubbles: true,
            composed: true,
            detail: {
                destinations: ['remove-all']
            }
        }));
    }

    _previousInstance() {
        this.dispatchEvent(new CustomEvent('navigate', {
            bubbles: true,
            composed: true,
            detail: {
                destinations: ['previous-node']
            }
        }));
    }

    _nextInstance() {
        this.dispatchEvent(new CustomEvent('navigate', {
            bubbles: true,
            composed: true,
            detail: {
                destinations: ['next-node']
            }
        }));
    }


    showNavigationControls(detail) {
        this.hasCarouselControls = detail.hasCarouselControls;
        this.hasBack = detail.hasBack;
        this.hasNext = detail.hasNext;

    }

    navigate() {
        let view = this.model.views[this.viewName];

        let destination;

        if (view.next.destination == 'selector' && view.next.selector != undefined) {
            destination = this.$.form.getFieldAttributeValue(view.next.selector.fieldName, view.next.selector.fieldAttribute, this.entityName);
        } else {
            destination = view.next.destination;
        }

        let elementInfo;
        let type;
        if (destination != undefined) {
            type = destination.split('-')[0];
            elementInfo = destination.split('-')[1];
            if (elementInfo != undefined) {
                elementInfo = elementInfo.split(':');
            }
        }

        let destinationURL;

        switch (type) {
            case 'view': {
                destinationURL = `${elementInfo[0]}/${this.entityName}/${this.viewMode}/${this.instanceId}/${elementInfo[1]}`;
                break;
            }

            case 'list': {
                let secondParameter = elementInfo[1];
                if (secondParameter == 'currentId') {
                    secondParameter = this.instanceId;
                }
                destinationURL = `${elementInfo[0]}/${secondParameter}`;
                break;
            }

            case 'url': {
                destinationURL = `${elementInfo[0]}`;
            }

            case 'remove': {
                destinationURL = 'remove';
            }
        }

        this.dispatchEvent(new CustomEvent('navigate', {
            bubbles: true,
            composed: true,
            detail: {
                destinations: [destinationURL]
            }
        }));


    }

    setSaveBtnText(text) {
        this.$.saveButton.innerHTML = text;
    }

    setCancelBtnText(text) {
        this.$.cancelButton.innerHTML = text;
    }

    setMode(mode) {

        if (mode == 'info') {
            this.setAttribute('hide-button', null);
        }

        this.$.form.setMode(mode);
    }


    setDefaultTitle() {
        if (this.viewMode == "new") {
            this.title = "Adicionar " + this.model.title;
            this.editMode = false;
        } else if (this.viewMode == "edit") {
            this.title = "Editar " + this.model.title;
            this.editMode = true;
        } else if (this.viewMode == "info") {
            this.title = this.model.title;
            this.setAttribute('hide-button', null);
        }
    }

    setFormItemList(fieldName, values, modelName) {
        this.$.form.setItemList(fieldName, values, modelName);
    }

    setFormFieldValue(fieldName, value, modelName) {
        this.$.form.setFieldValue(fieldName, value, modelName);
    }

    setTargetFormIdx(targetFormIdx) {
        this.$.form.setTargetFormIdx(targetFormIdx);
    }

}

customElements.define('poc-form-view', PocFormView);