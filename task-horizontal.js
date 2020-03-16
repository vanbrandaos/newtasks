import {PolymerElement, html} from '@polymer/polymer';
import {somaReduxMixin} from './store.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@soma/soma-styles/soma-styles';

import './task-view'

import { ListFormMediator } from "@soma/soma-dynamic-common/views/list-form-mediator.js";
import { SomaDynamicFormView } from '@soma/soma-dynamic-common/views/soma-dynamic-form-view.js';
import "@soma/soma-dynamic-common/views/soma-dynamic-list.js";




class TaskHorizontal extends somaReduxMixin(PolymerElement) {
  static get template() {
    return html`
    <style is="custom-style" include="soma-styles iron-flex iron-positioning iron-flex-alignment"></style>
    <style>
    
    :host {
        --app-primary-background-color: white;
        --app-primary-color: #006699;
        --app-secondary-background-color: #006699;
        --app-secondary-color: white;
    };

    .szSmall {
      max-width:50px;
    }

    .szMedium {
      max-width:130px;
    }

    .szLarge {
      width:180px;
    }

    .margin{
      margin: 10px 20px;
    }

    .titleBar{
      height:64px;
      font-size:24px;
    }

    .colorInput{
      width:100px;
      --primary-text-color: var(--app-primary-color);
    }

    .border{
      border: 1px dotted #ccc;
    }

    .item {
    /* O flex: 1; é necessário para que cada item se expanda ocupando o tamanho máximo do container. */      
      margin: 10px;
      text-align: left;
      font-size: 1.5em;
  }

    h1 {
    margin: 0 0 0 0;
    font-size: 0.90em;
    font-weight: normal;
    }

    .header{
      margin: 10px 0;
      color: var(--paper-grey-600);
      font-size:0.90em;
    }

    h1 legend{
      margin: 10px 0;
      font-size:0.90em;
    }  
    </style>

    <soma-dynamic-form-view></soma-dynamic-form-view>

    <!--
    <div class="content layout horizontal center-center slot="content">
    <div id="windowInfo" class="appTitleBar" style="width:1200px;">
    <div class="title layout horizontal center center-justified titleBar secondaryCombination appTitleBar">
    <span>horizontal</span>
    </div>
    <div class="margin layout horizontal center justified">

    <paper-input always-float-label value={{rate}} class="item colorInput szSmall inputPrimary" type="number" label="rate"></paper-input>
        <paper-input class="colorInput inputPrimary" allowed-pattern="[0-9]" type="number" value={{numberOfSamples}} always-float-label class="item" label = "numberOfSamples"></paper-input>    
        <paper-dropdown-menu always-float-label label="sampleMode" class="colorInput inputPrimary item" no-animations>
          <paper-listbox slot="dropdown-content" name="drop" attr-for-selected="value" selected="{{sampleMode}}">
            <paper-item value="10178">Finite Samples</paper-item>      
            <paper-item value="10123">Continuous Samples</paper-item>
            <paper-item value="12522">Hardware Timed Single Point</paper-item>      
          </paper-listbox>
        </paper-dropdown-menu>           
        <paper-input class="colorInput inputPrimary" type="number" value={{fetchTimeout}} always-float-label class="item" label="fetchTimeout"></paper-input>
    </div>
    </div>
    </div>  -->


    `;
  }
    static get properties() { 
     return{
      // rate:  Number,
      // numberOfSamples: Number,
     // sampleMode: String,
      // fetchTimeout: Number
    }      
  }

  getValuesHorizontal(){
    let rate = this.rate;    
    let numberOfSamples = this.numberOfSamples;
    let sampleMode = this.sampleMode;
    let fetchTimeout = this.fetchTimeout;

    this.dispatch(this.actions.addHorizontalPanel(rate,numberOfSamples,sampleMode,fetchTimeout));
    this.bindToHandler('parameters',(parameters) =>{
        console.log(parameters);         
        //console.log(JSON.stringify(parameters));        
    })
  }

  constructor() {
    super();
  }

  ready() {
    super.ready();  
    /*this.fetchTimeout = 10;  
      this.$.btn.onclick = () => {
        this.getValuesHorizontal();           
     }  */
  }
}

customElements.define('task-horizontal', TaskHorizontal);