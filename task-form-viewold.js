import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import "@polymer/app-layout/app-toolbar/app-toolbar.js";
import "@polymer/iron-flex-layout/iron-flex-layout.js";
import "@polymer/iron-flex-layout/iron-flex-layout-classes.js";

import "@polymer/paper-icon-button/paper-icon-button.js";

import "@soma/soma-styles/soma-styles.js";

import {SomaStoreMixin} from "@soma/soma-utils/soma-redux.js";
import {SomaDynamicFormView} from '@soma/soma-dynamic-common/views/soma-dynamic-form-view.js';
import { getStagedInstance } from "@soma/soma-dynamic-common/utils/entities-utils.js";

export class TaskFormView extends SomaDynamicFormView {

    static get template() {
        return html`                
        <style>

        </style>
        ${super.template}
        `;
        
    }

    static get properties() {        
        return super.properties;
        /*let properties = {
		};
		return Object.assign({}, super.properties, properties);*/       
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

    _loadView(page, subject) {

        let forms = this.shadowRoot.querySelectorAll('soma-dynamic-form');
        for (let x = 1; x < forms.length; x++){
            forms[x].style.display = 'none';
        }

        this._unbindPath();
        this.showNavigationControls(false);

        if (page && subject) {     
            for (let i = 0; i < subject.length; i = i+3) {  
                if (i==0){              
                    super._loadView(page,subject.slice(i,(i+3)));
                }else{
                    this._newView(subject.slice(i,(i+3)));
                }                      
            }           
        }
    }
    
    _newView(subject) {
        this.entityName = subject[0];
        this._subject = subject[1];
        this.instanceId = parseInt(subject[2]);

        let form;        
        let nameForm = `form${this.entityName}`
        form = this.shadowRoot.querySelector('#'+nameForm);
                                
        if (!form){
            //this.setAttribute('hide-button',true);
            let newForm = document.createElement('soma-dynamic-form');
            newForm.id = nameForm
            newForm.classList.add('layout','vertical','center','formContainer');       
            this.$.container2.appendChild(newForm); 
            form = this.shadowRoot.querySelector('#'+nameForm);   

            form.addEventListener('form-state-loaded', (event) => this._updateStaging(event));
            form.addEventListener('submit-changes', (event) => {this._submitChanges(event.detail.entityName, event.detail.instanceId)});
            form.addEventListener('cancel-changes', (event) => super._cancelChanges(event));
            form.addEventListener('new-instance', (event) => super._addInstance(event));                            
        }
        this.$.form.setAttribute('hide-button',true);
        form.style.display = 'block';   

        if (this.entityName && this.instanceId) {
            this.model = this.state.entities[this.entityName].model;
            if (this.model && this.model.layoutConfiguration && this.model.layoutConfiguration.size) {
                this.$.container.classList.add(this.model.layoutConfiguration.size);                            
            }
            else {
                this.$.container.classList.add('medium');                                           
            }

            this.setDefaultTitle();

            //DO NOT CHANGE THIS ORDER - ESTE CODIGO NAO PODE SER OTIMIZADO
            //HORAS SACRIFICADAS PARA O DEUS DA OTIMIZACAO: 9
            if (this.model.name != this.__oldModelName__) {
                form.loadForm(this.model);
                this.__oldModelName__ = this.model.name;
            }

            form.setMode(this._subject);

            //SABE-SE QUE ESSE TRECHO VAI SER EXECUTADO CADA VEZ QUE A INSTANCIA MUDAR
            //E POR CONSEQUENCIA CODIGO QUE PODERIA SER EXECUTADO APENAS NA MUDANCA DE MODELO
            //PODE SER EXECUTADO VARIAS VEZES. NO ENTANTO ESSA MUDANCA PERMITE QUE TENHAMOS
            //CONJUNTOS QUE DEPENDAM DA INSTANCIA
            for (let i = 0; i < this.model.fields.length; i++) {
                if (this.model.fields[i].type == 'reference') {

                    this._observeTargetInstanceChanges(this.model.fields[i].target, this.model.fields[i], this.model.name);

                } else if (this.model.fields[i].type == 'list') {
                    form.setItemList(this.model.fields[i].name, this.model.fields[i].values, this.model.name);
                }
            }
            
            form.clearStatusBar();
            
            if (this._subject != 'new') {
                this.currentBindings.push(
                    this.bindToHandler(`entities.${this.entityName}.instances.${this.instanceId}`, (instance) => {
                        if (!instance) {
                            form.setStatusMessage('O formulário não é mais válido, pois o registro foi removido.', 'error');
                            form.setMode('info');
                            this.dispatch(this.actions.removeInstance(this.entityName, this.instanceId));
                        }
                    })
                );
            }

            let stagingObjt = {};
            //VALORES DO FORMULARIO SAO LIDOS DA STAGING. LOGO, A STAGING DEVE EXISTIR NO MOMENTO
            //EM QUE O OBJETO COM VALORES DO FORM FOR CRIADO                        
            if (!this.state.workspace[this.entityName] || !this.state.workspace[this.entityName].staging[this.instanceId]) {
                stagingObjt = { id: this.instanceId, isNew: this._subject == 'new' };
            }
            this.formValues = getStagedInstance(this.entityName, this.instanceId, stagingObjt);
            if (this.model.dependsOn) {
                this._decorateFormValue(this.model.fields[this.model.fieldByName[this.model.dependsOn.fieldName]]);
            }
            form.loadInstanceValues(this.formValues);
            form.setAttribute('hide-button',true);   
        }             
    }


    _updateStaging(event) {      
        //A FUNÇÃO ORIGINAL ACESSA THIS.ENTITYNAME, QUANDO NEW FORM, ESTE SERÁ O NOVO ENTITYNAME. SE, APÓS ISSO, O PRIMEIRO FORM ALTERAR
        //UMA COMBO QUE CRIA MAIS FORMS, O ENTITYNAME ESTARÁ SETADO COM O ÚLTIMO FORM CRIADO
        if (this.entityName !=event.detail.entityName){
            this.entityName = event.detail.entityName;
            this.instanceId = event.detail.instanceId;        
        }
        super._updateStaging(event);

        //ACESSA CAMPOS TIPO LIST DA ENTIDADE (COMBO) ALTERADA E CRIA NOVO FORM SE EXISTIR UMA
        //ENTIDADE PARA A OPÇÃO ESCOLHIDA. TAMBÉM OCULTA POSSÍVEIS FORMS CRIADOS E NÃO SELECTED.
        let fields = this.state.entities[event.detail.entityName].model.fields;         
        let form;  
        for (let i=0; i < fields.length; i++){
            
            if (fields[i].type == 'list'){ 
                for (let x=0; x < fields[i].values.length; x++){    

                    if (this.state.entities[fields[i].values[x].nameForm] && fields[i].values[x].name===event.detail.fieldValue){
                        let param = [fields[i].values[x].nameForm,'new',this.instanceId];
                        this._newView(param)
                    } else if (!this.state.entities[fields[i].values[x].nameForm] && fields[i].values[x].name===event.detail.fieldValue){
                        this.$.form.removeAttribute('hide-button');                        
                    }                        
                                                                        
                    form = this.shadowRoot.querySelector(`#form${fields[i].values[x].nameForm}`)                                                        
                    if (form && (fields[i].values[x].name != event.detail.fieldValue)) {                                                
                        form.style.display = 'none';                                
                    }
                }
            }
        }                  
    }  

    setDefaultTitle() {
    }

}

customElements.define('task-form-view', TaskFormView);
