import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { RendererBehaviour } from "./renderer-behaviour.js";

const uuidv4 = require('uuid/v4');

/**
 * `LowerCaseDashedName` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class DynReferenceListMultiSelector extends RendererBehaviour {

    static get template() {
        return html`
            <style is="custom-style" include="soma-styles iron-flex iron-flex-alignment">                 
                :host {
                    display: block;                    
                    -webkit-font-smoothing: antialiased;
                    font-family: 'Roboto', 'Noto', sans-serif;
                    width:100%;
                    font-size:15px;
                    color: var(--app-secondary-background-color);                     
              
                }  
                
                .small {
                    width: 220px;
                }
                .medium {
                    width: 320px;
                }
                .large{
                    width: 520px;
                }

                #addButton{                    
                    
                    height: 40px;
                    width: 40px;                    
                }


                              
                .tooltipMixin {
                    --tooltip-text-color:var(--app-secondary-color);  
                    --tooltip-background-color: var(--app-secondary-background-color);

                    --paper-tooltip: {
                        @apply --paper-font-common-base; 
                        font-size: 14px;                      
                    }

                    --paper-tooltip-opacity: 0.9;
                    --paper-tooltip-text-color: var(--tooltip-text-color);
                    --paper-tooltip-background: var(--tooltip-background-color);

                    @apply --tooltip-mixin;
                }

                .invalid{
                    color:#dd2c00;
                }

                .dynContainerMixin {
                    margin-right:15px;
                    --primary-text-color:  var(--app-primary-color); 
                    --secondary-text-color:var(--app-secondary-color);  
                    @apply --dyn-container-mixin;
                }

                paper-icon-button[disabled]{
                    color:grey;            
                }

                div[selected]{
                    background-color: rgba(0,102,153,0.2);          
                }

                .selectableSpan{
                    cursor:pointer;
                }

                .listItem{
                    padding-left: 10px;
                }

                #confirmContainer[hidden]{
                    display:none;
                }
                
            </style>

            
            <div id="mContainer" class="dynContainerMixin layout vertical center-justified">                    
                <paper-tooltip id="tooltip" for="title" class="tooltipMixin">[[field.description]]</paper-tooltip>
                <div class="layout horizontal">
                    <span id="title">[[field.title]]</span> 
                    <span class="flex"></span>
                    <span class="end-justified" >
                        <paper-icon-button id="addButton" icon="add-box" disabled="[[!isCreatable]]" on-tap="_newItem"></paper-icon-button> 
                        <paper-icon-button id="editButton" icon="create" disabled="[[!editable(hasSelection)]]" on-tap="_editItem"></paper-icon-button> 
                        <paper-icon-button id="removeButton" icon="delete" disabled="[[!removable(hasSelection)]]" on-tap="_deleteItem"></paper-icon-button> 
                    </span>
                </div>
                <div id="confirmContainer" class="layout horizontal" hidden>
                    <span>Confirma?</span>
                    <span class="flex"></span>
                    <span class="end-justified" >
                        <paper-icon-button id="confirmButton" icon="check" on-tap="_onConfirm"></paper-icon-button>
                        <paper-icon-button id="cancelButton" icon="close" on-tap="_onCancel"></paper-icon-button>
                    </span>
                </div>
               
               
                <div id="checks" class="layout vertical center-justified ">
                    <template id="checkTemplate" is="dom-repeat" items="[[itemsList]]" > 
                        <div id="[[item.name]]Container" class="listItem">
                            <span class="selectableSpan" item-id ="[[item.name]]" on-tap="_select">[[item.title]]</span>                          
                        </div>                     
                    </template>
                </div>               
            </div>
        

        `;
    }

    static get properties() {
        let properties = {
            hasSelection: {
                type: Boolean,
                value: false
            },
            selected: {
                type: String
            }
        }

        return {
            ...super.properties,
            ...properties
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
    }

    _select(event) {

        let selectedDiv = this.shadowRoot.querySelectorAll("div[selected]");
        for (let div of selectedDiv) {
            div.removeAttribute('selected');
        }

        this.$.confirmContainer.setAttribute("hidden", null);
        if (this.selected == event.target.itemId) {
            this.selected = undefined;
            this.hasSelection = false;
        } else {
            this.selected = event.target.itemId;
            this.shadowRoot.querySelector(`#${this.selected}Container`).setAttribute("selected", null);
            this.hasSelection = true;
        }
    }

    _newItem() {

        let targetForm = 'form';
        //let targetForm = this.targetFormIdx[this.field.target] == undefined ? this.targetFormIdx.default : this.targetFormIdx[this.field.target];

        let newId = `${this.field.target}_${uuidv4()}`;
        this.dispatchEvent(new CustomEvent('start-alternate', {
            bubbles: true,
            composed: true,
            detail: {
                alternativeNode: {
                    destinationSet: [`${targetForm}/${this.field.target}/new/${newId}`],
                    currentDestinationIdx: 0
                }
            }
        }));
    }

    _editItem() {
        let targetForm = this.targetFormIdx[this.field.target] == undefined ? this.targetFormIdx.default : this.targetFormIdx[this.field.target];

        this.dispatchEvent(new CustomEvent('start-alternate', {
            bubbles: true,
            composed: true,
            detail: {
                alternativeNode: {
                    destinationSet: [`${targetForm}/${this.field.target}/edit/${this.selected}`],
                    currentDestinationIdx: 0
                }
            }
        }));

    }

    _deleteItem() {
        this.$.confirmContainer.removeAttribute("hidden");
    }

    editable(hasSelection) {
        return hasSelection && this.isEditable;
    }

    removable(hasSelection) {
        return hasSelection && this.isRemovable;
    }

    _onConfirm(event) {
        this.$.confirmContainer.setAttribute("hidden", null);

        this.dispatchEvent(new CustomEvent('remove-entity', {
            bubbles: true,
            composed: true,
            detail: {
                entityName: this.field.target,
                instanceId: this.selected
            }
        }));

        this.selected = undefined;
        this.hasSelection = false;
    }

    _onCancel(event) {
        this.$.confirmContainer.setAttribute("hidden", null);
    }

}

customElements.define('dyn-reference-list-multi-selector2', DynReferenceListMultiSelector);