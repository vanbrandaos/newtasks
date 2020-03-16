import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import "@polymer/app-layout/app-toolbar/app-toolbar.js";
import "@polymer/iron-flex-layout/iron-flex-layout.js";
import "@polymer/iron-flex-layout/iron-flex-layout-classes.js";

import "@polymer/paper-icon-button/paper-icon-button.js";

import "@soma/soma-styles/soma-styles.js";

import { SomaDynamicFormView } from '@soma/soma-dynamic-common/views/soma-dynamic-form-view.js';
import { getStagedInstance } from "@soma/soma-dynamic-common/utils/entities-utils.js";

/**
 * `LowerCaseDashedName` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class AdminFormView extends SomaDynamicFormView {

    static get template() {
        return super.template;
    }

    static get properties() {
        return super.properties;
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
    }


    static get observers() {
        return super.observers;
    }


    _loadReferences(target, field, modelName) {

        if (target && field && modelName) {

            if (!this.currentBindings) {
                this.currentBindings = [];
            }

            this.currentBindings.push(
                this.bindToHandler('entities.' + target + '.instances', (instances) => {

                    let valueList = [];

                    if (this.state.entities[modelName].model.dependents && this.state.entities[modelName].model.dependents.includes(target)) {
                        let stagedInstance;
                        let stagedTargetInstances;
                        let stagedInstaceValue;

                        if (!this.state.entities[modelName].instances[this.instanceId] && !this.state.workspace[modelName]) {
                            //
                        } else {
                            stagedInstance = getStagedInstance(modelName, this.instanceId);
                        }

                        if (this.state.workspace[target]) {
                            stagedTargetInstances = this.state.workspace[target].staging;
                        }

                        if (stagedInstance) {
                            stagedInstaceValue = stagedInstance[field.name];
                        }

                        if (stagedInstaceValue) {
                            if (field.multValue) {
                                for (let i = 0; i < stagedInstaceValue.length; i++) {
                                    let value = getStagedInstance(target, stagedInstaceValue[i]);
                                    if (value) {
                                        valueList.push(value);
                                    }

                                }
                            } else {
                                if (stagedTargetInstances[stagedInstaceValue]) {
                                    let value = getStagedInstance(target, stagedInstaceValue);
                                    if (value) {
                                        valueList.push(value);
                                    }
                                }
                            }
                        }

                    } else if (this.state.entities[modelName].model.dependsOn && this.state.entities[modelName].model.dependsOn.fieldName == field.name) {
                        let valueListIds = [];
                        let stagedInstances;
                        let keys = Object.keys(instances);

                        let dependsOn = this.state.entities[modelName].model.dependsOn;


                        if (this.state.workspace[dependsOn.entityName]) {
                            stagedInstances = this.state.workspace[this.state.entities[modelName].model.dependsOn.entityName].staging;
                            valueList = Object.values(stagedInstances);
                            valueListIds = Object.keys(stagedInstances);

                            for (let i = 0; i < keys.length; i++) {
                                if (!valueListIds.includes(keys[i])) {
                                    valueList.push(instances[keys[i]]);
                                }
                            }
                        } else {
                            valueList = Object.values(instances);
                        }


                    } else {
                        valueList = Object.values(instances);
                    }

                    this._setReferenceField(valueList, field, modelName);

                })
            );

        }

    }


    _submitChanges(entityName, instanceId) {
        let skip = false;

        if (this.model.dependsOn) {
            let instance = this.state.workspace[entityName].staging[instanceId];

            if (instance.isNew) {
                let targetId = instance[this.model.dependsOn.fieldName];
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
                        if (!targetField.includes(instance.id)) {
                            targetField.push(instance.id);
                            modified = true;
                        }
                    } else {
                        if (targetField != instance.id) {
                            targetField = instance.id;
                            modified = true;
                        }

                    }

                    this.dispatch(this.actions.changeInstance(this.model.dependsOn.entityName, targetId, fieldNames[i], targetField));
                    this.dispatch(this.actions.flagModification(this.model.dependsOn.entityName, targetId, fieldNames[i], modified));

                }

                skip = true;


            }
        }

        if (!skip) {
            super._submitChanges(entityName, instanceId);
            return;

        }

        this.dispatchEvent(new CustomEvent('back', { detail: { goCurrent: true } }));
    }

    _updateStaging(event) {

        if (event.detail.entityName == 'Feature' && event.detail.fieldName == 'roles') {
            let operation = event.detail.operation;

            if (operation.value) {

                let feature = this.state.workspace['Feature'].staging[event.detail.instanceId];

                let application = getStagedInstance('Application', feature.application);

                if (!application.roles || !application.roles.includes(operation.target)) {
                    let appRoles = application.roles || [];
                    appRoles = appRoles.slice();
                    appRoles.push(operation.target);
                    this.dispatch(this.actions.changeInstance('Application', application.id, 'roles', appRoles));
                    this.dispatch(this.actions.flagModification('Application', application.id, 'roles', true));
                    this.dispatch(this.actions.submitPropagation('Feature', event.detail.instanceId, 'Application', application.id));


                }
            }
        } else if (event.detail.entityName == 'Application' && event.detail.fieldName == 'roles') {
            let operation = event.detail.operation;

            if (!operation.value) {
                let application = this.state.workspace['Application'].staging[event.detail.instanceId];
                for (let i = 0; i < application.features.length; i++) {

                    let feature = getStagedInstance('Feature', application.features[i]);

                    let idx = feature.roles.indexOf(operation.target);
                    if (idx > -1) {
                        let newRoles = feature.roles.slice();
                        newRoles.splice(idx, 1);
                        this.dispatch(this.actions.changeInstance('Feature', feature.id, 'roles', newRoles));
                        this.dispatch(this.actions.flagModification('Feature', feature.id, 'roles', true));
                        this.dispatch(this.actions.submitPropagation('Application', event.detail.instanceId, 'Feature', feature.id));
                    }
                }
            }
        }

        super._updateStaging(event);

        if (this.model.dependsOn && event.detail.fieldName == this.model.dependsOn.fieldName) {
            let targetFieldName = this.model.dependsOn.fieldName;
            this.dispatch(this.actions.flagModification(event.detail.entityName, event.detail.instanceId, targetFieldName, false));
        }
    }
}

customElements.define('admin-form-view', AdminFormView);
