import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

/**
 * `LowerCaseDashedName` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
export class RendererBehaviour extends PolymerElement {
    static get properties() {
        return {
            field: {
                type: Object,
                notify: true
            },
            disabled: {
                type: Boolean,
                notify: true,
                value: false
            },
            //os valores abaixo sao preenchidos pelo form durante a sua criacao
            isCreatable: {
                type: Boolean,
                value: false
            },
            isEditable: {
                type: Boolean,
                value: false
            },
            isRemovable: {
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
    }


    small() {
        this.$.mContainer.classList.add('small');
    }
    medium() {
        this.$.mContainer.classList.add('medium');
    }
    large() {
        this.$.mContainer.classList.add('large');
    }

    validate() {
        return true;
    }

    setValue(value) {
        this.value = value;
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

}
