import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import "@polymer/iron-icons/iron-icons.js";


import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/paper-item/paper-item.js";
import "@polymer/paper-listbox/paper-listbox.js";
import "@polymer/paper-tooltip/paper-tooltip.js";

import "@polymer/neon-animation/neon-animation.js";

import "@soma/soma-styles/soma-styles.js";

const uuidv4 = require('uuid/v4');

import { SomaStoreMixin } from "@soma/soma-utils/soma-redux.js";
/**
 * `LowerCaseDashedName` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class DynRenderer extends SomaStoreMixin(PolymerElement) {
    static get template() {
        return html`
           <style include="soma-styles iron-flex iron-flex-alignment">
                :host{
                    display: block;
                    -webkit-font-smoothing: antialiased;
                    font-family: 'Roboto', 'Noto', sans-serif;
                    width:100%;


                    --paper-input-container-label: {
                       font-size:15px;
                       @apply --paper-font-common-base;
                    };

                    --paper-input-container-input: {
                       font-size:60px;
                    };


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

                paper-icon-button{
                    color:var(--primary-text-color);
                    @apply --dyn-single-selector-mixin;
                }

               
                #addButton{
                    color:var(--secondary-text-color);
                    height: 48px;
                    width: 48px;
                }

                paper-listbox{
                    background-color: var(--primary-background-color);
                }

                paper-dropdown-menu{
                    width:calc(100% - 32px);
                    height: 64px;
                    --paper-input-container-color:var(--primary-text-color);

                    --paper-input-container-input: {
                        font-size:15px;
                    }

                    --paper-item-selected:{
                        color:var( --primary-text-color);
                    }

                    --paper-item-focused:{
                        color:var( --primary-text-color);
                    }

                    --paper-item-menu-input:{
                        color:var( --primary-text-color);
                    }

                    --paper-item:{
                        color:var( --primary-text-color);
                    };


                    --paper-dropdown-menu-button:{
                        --iron-icon-fill-color: var( --primary-text-color);
                    }




                    @apply --paper-font-common-base;
                    @apply --dyn-single-selector-mixin;


                }

                paper-dropdown-menu[disabled]{
                    --paper-input-container-disabled:{
                            opacity:0.85;
                    }

                    --paper-dropdown-menu-button:{
                            --iron-icon-fill-color: var(--primary-text-color);
                            opacity:0.85;
                        }

                     @apply --dyn-single-selector-mixin;
                }

                #buttons{
                    float: right;
                    margin-top: -37px;
                    margin-left:25px;
                }

                #closeBtn{                 
                    height: 32px;
                    width: 32px;
                    margin-right:-15px;
                    margin-top: -22px;
                }

                #addBtn{                    
                    height: 35px;
                    width: 35px;                   
                    margin-right:-7px;                    
                }                

                #closeBtn[disabled]{
                   @apply --paper-icon-button-disabled;
                }

                .dynContainerMixin {
                    --primary-text-color:  var(--app-primary-color);
                    --secondary-text-color:  var(--app-secondary-color);
                    --primary-background-color: var(--app-primary-background-color);
                    --secondary-background-color: var(--app-secondary-background-color);
                    --paper-icon-button-ink-color: var(--primary-text-color);


                    --paper-icon-button-disabled: {
                        --paper-icon-button-disabled-text: var(--primary-text-color);
                        opacity:0.85
                    };

                    --paper-input-container-shared-input-style: {

                        position: relative; /* to make a stacking context */
                        outline: none;
                        box-shadow: none;
                        padding: 0;
                        margin: 0;
                        width: 100%;
                        max-width: 100%;
                        background: transparent;
                        border: none;
                        color:   var(--app-primary-color);
                        -webkit-appearance: none;
                        text-align: inherit;
                        vertical-align: bottom;
                        @apply --paper-font-subhead;

                    };

                    @apply --dyn-container-mixin;
                }

            </style>

            <paper-tooltip for="sContainer" class="tooltipMixin">[[field.description]]</paper-tooltip>        
            <div id="selectorContainer" class="primaryCombination dynContainerMixin" >           
               <paper-dropdown-menu id="sContainer" label="[[field.title]]"  disabled="{{disabled}}" no-animations>
                    <paper-listbox  id="pl" slot="dropdown-content" class="dropdown-content" attr-for-selected="name" selected="{{value}}" on-iron-select="_getSelected">                                                                                     
                        <template is="dom-repeat" items="{{itemsList}}"> 
                            <paper-item id="{{item.name}}" name="{{item.name}}">{{item.title}}</paper-item>                           
                        </template>                                           
                    </paper-listbox>                                       
                </paper-dropdown-menu>         
                <div id="buttons" class="layout horizontal">     
                        <paper-icon-button id="addBtn" icon="arrow-forward" on-tap="_onAdd"></paper-icon-button>   
                </div>                
            </div>
                 
        `;
    }

    static get properties() {
        return {                    
            field: {
                type: Object
            },            
            itemsList: {
                type: Array
            },
            disabled: {
                type: Boolean,
                notify: true,
                value: false
            },
            valid: {
                type: Boolean,
                notify: true,
                value: true
            },
            value: {
                type: Object,
                observer: "_valueChanged"
            },
            editMode: {
                type: Boolean
            },
            readMode: {
                type: Boolean
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
    }
    
    clear(event) {
        this.$.pl.selected = undefined;
    }

    setValue(value) {
        this.value = value;
        if (value) {
            this.$.pl.selected = value;
        }
    }

    _getSelected(e) {
        this.valid = this.validate();
    }
  

    setMode(editMode,readMode){
        if(this.field){
            if (readMode) {
                this.disabled = true;

            } else {
                if (!editMode) {
                    if (this.field.readOnly) {
                        this.disabled = true;
                    } else {
                        this.disabled = false;
                    }
                } else {
                    if (this.field.editable) {
                        this.disabled = false;
                    } else {
                        this.disabled = true;
                    }
                }
            } 
        }
    }

    _onAdd(event) {
        //generate temporary id for new instance
        this.validate();
        if (this.valid) {            
            if (this.state.entities[this.value]) {
                this.dispatchEvent(new CustomEvent('new-instance', { detail: { entityName: this.value }, bubbles: true, composed: true }));
            } else{
                
            }
        }
    }

    generateNewId() {
        let min = Math.ceil(0);
        let max = Math.floor(100000);
        let newId = Math.floor(Math.random() * (max - min)) + min;
        let isNewId = false;

        while (!isNewId) {
            if (this.state.entities[this.value].idList.includes(`${newId}`) && this.state.workspace[this.value] && this.state.workspace[this.value].staging.has(`${newId}`)) {
                newId = Math.floor(Math.random() * (max - min)) + min;
            } else {
                isNewId = true;
            }
        }
        return newId;
        
    }   

    _valueChanged(value, oldValue) {        
        this.valid = true;
        if (value != oldValue) { //&& oldValue != undefined               
            this.dispatchEvent(new CustomEvent('send-value', { detail: { fieldName: this.id, value: value }, bubbles: true })); //valid: this.valid,            
        }
    }

    validate() {
        if ((this.$.pl.selected == null || this.$.pl.selected == "" || this.$.pl.selected == undefined) && this.field.required) {
            this.valid = false;
            this.$.sContainer.errorMessage = "Campo obrigatório";
        } else {
            this.valid = true;
        }

        this.$.pl.invalid = !this.valid;
        this.$.sContainer.invalid = !this.valid;

        return this.valid;

    }

    small() {
        this.$.selectorContainer.classList.add('small');
    }
    medium() {
        this.$.selectorContainer.classList.add('medium');
    }
    large() {
        this.$.selectorContainer.classList.add('large');
    }
}
customElements.define('dyn-renderer', DynRenderer);