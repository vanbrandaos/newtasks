import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import {PocFormView} from './poc-form-view.js';

const uuidv4 = require('uuid/v4');


//import {SomaDynamicFormView} from '@soma/soma-dynamic-common/views/soma-dynamic-form-view.js';
import { getStagedInstance, submit, generateNewId, generateUUID } from "@soma/soma-dynamic-common/utils/entities-utils.js";

export class TaskFormView extends PocFormView {

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

    _addInstance(entityName) {

        let uuid = generateUUID(entityName);
        let newId = generateNewId(entityName);
        let mode = 'new';

        let idValue = this.state.entities[entityName].model.idField == 'id' ? newId : uuid;  
        let entityDepend = this.state.entities[entityName].model.dependsOn.entityName;        
        let stagingEntityList = Object.keys(this.state.workspace[entityName].staging);
        
        if (this.state.entities[entityName].model.dependsOn && stagingEntityList.length ==1) {
            mode = 'edit';    
            idValue = stagingEntityList;
        }
        
            let dependents = this.state.entities[entityDepend].model.dependents;        
            for (let dependent of dependents) {
                console.log(dependent)
            }
        


        this.dispatchEvent(new CustomEvent('start-alternate', {
            bubbles: true,
            composed: true,
            detail: {
                alternativeNode: {
                    destinationSet: [`${this.name}/${entityName}/${mode}/${idValue}`],
                    currentDestinationIdx: 0
                }
            }
        }));        
    }


 
}

customElements.define('task-form-view', TaskFormView);
