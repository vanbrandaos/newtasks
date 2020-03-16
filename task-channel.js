import {PolymerElement, html} from '@polymer/polymer';
import {somaReduxMixin} from './store.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-toggle-button/paper-toggle-button.js';


class TaskChannel4357 extends somaReduxMixin(PolymerElement) {
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
      margin: 10px 40px;
    }

    .titleBar{
      height:64px;
      font-size:24px;
    }
    .colorInput{
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
  
    div.hiddenDiv {
      display: none;
    }

    div.open {
      display:block;
    }

    h1 {
    margin: 0 0 0 0;
    font-size:0.95em;
    font-weight: normal;
    }

    .header{
      margin: 10px 0;
      font-size:0.85em;
      color: var(--app-primary-color);      
    }

    h1 legend{
      margin: 10px 0;
      font-size:0.90em;
    }
    </style>

<div class="layout horizontal center-center wrap" slot="content">
  <div id="title" class="appTitleBar center-center wrap" style="width:1200px;">
    <div class="layout horizontal center center-justified titleBar secondaryCombination appTitleBar">
      <span>channelList</span>
    </div>
    <div class="layout vertical justified wrap">   
      <div class="layout horizontal wrap">
      <paper-input always-float-label class="item inputPrimary szLarge colorInput" value={{deviceName}} label="deviceName"></paper-input>   
      </div>  
      <div class="layout horizontal  wrap">
        <div class="layout vertical justified wrap margin">
          <h1 class="header"> rtdChannel</h1>  
          <paper-toggle-button class="inputPrimary colorInput header" checked={{active}}>active</paper-toggle-button>
          <paper-input always-float-label value={{channelName}} class="item inputPrimary szMedium colorInput" label="channelName"></paper-input>    
          <paper-input always-float-label value={{physicalChannel}} class="item inputPrimary szMedium colorInput" label ="physicalChannel"></paper-input> 
          <paper-toggle-button class="inputPrimary colorInput header" checked={{tedschannel}}>TEDSchannel</paper-toggle-button>            
          <h1 class="header"> hardware</h1>               
          <paper-dropdown-menu class="inputPrimary szMedium colorInput" always-float-label label="resistanceConfiguration" no-animations>
          <paper-listbox slot="dropdown-content" attr-for-selected="value" selected={{resistanceConfiguration}}>
          <paper-item value="2">2-Wire</paper-item>
          <paper-item value="3">3-Wire</paper-item>
          <paper-item value="4">4-Wire</paper-item>           
          </paper-listbox>
          </paper-dropdown-menu> 
          <h1 class="header"> iepe</h1> 
          <paper-dropdown-menu class="inputPrimary szMedium colorInput" always-float-label label="currentExcitationSource" no-animations>
            <paper-listbox slot="dropdown-content" attr-for-selected="value" selected={{currentExcitationSource}} >
              <paper-item value="10200">Internal</paper-item>
              <paper-item value="10167">External</paper-item>
              <paper-item value="10230">None</paper-item>           
            </paper-listbox>
          </paper-dropdown-menu> 
          <paper-input always-float-label class="item inputPrimary szMedium colorInput" value={{currentExcitationValue}} label="currentExcitationValue"></paper-input>                      
        </div>
        <div class="layout vertical  wrap margin">
          <h1 class="header"> scaling</h1>  
          <paper-dropdown-menu class="inputPrimary szMedium colorInput" always-float-label label="measurementType" no-animations>
            <paper-listbox slot="dropdown-content" on-click="showOptions" attr-for-selected="value" selected={{measurementType}} >
            <paper-item value="0">Temperature</paper-item>
            <paper-item value="1">Resistence</paper-item>     
            </paper-listbox>
          </paper-dropdown-menu> 
          <paper-input type="number" always-float-label class="item inputPrimary szMedium colorInput" label="customScaleName" value={{customScaleName}}></paper-input>    
          <paper-input type="number" always-float-label class="item inputPrimary szMedium colorInput" label="minimumValue" value={{minimumValue}}></paper-input>    
          <paper-input type="number" always-float-label class="item inputPrimary szMedium colorInput" label="maximumValue" value={{maximumValue}}></paper-input>  
        </div>

        <div class="layout vertical wrap"> 
                
        <div id="options" class="hiddenDiv"> 
        <h1 class="header"> units</h1>
        <div class="layout horizontal wrap">
        <div class="layout vertical wrap margin">

        <h1 class="header"> Temperature</h1> 
        <paper-dropdown-menu class="inputPrimary szMedium colorInput" always-float-label label="rtdType" no-animations>
          <paper-listbox slot="dropdown-content" attr-for-selected="value" selected={{rtdType}}>
            <paper-item value="12481">Pt3750</paper-item>
            <paper-item value="10071">Pt3851</paper-item>     
            <paper-item value="12482">Pt3911</paper-item>     
            <paper-item value="10069">Pt3916</paper-item>           
            <paper-item value="10053">Pt3920</paper-item>                 
            <paper-item value="12483">Pt3928</paper-item>                       
            <paper-item value="10137">Custom</paper-item>                             
          </paper-listbox>
        </paper-dropdown-menu> 
        <paper-input type="number" always-float-label class="item inputPrimary szMedium colorInput" label="ro" value={{ro}}></paper-input>    
        <paper-dropdown-menu class="inputPrimary szMedium colorInput" always-float-label label="unit" no-animations>
          <paper-listbox name="unit" slot="dropdown-content" attr-for-selected="value" selected={{unit}} >
            <paper-item value="10143">deg C</paper-item>
            <paper-item value="10144">deg F</paper-item>     
            <paper-item value="10325">Kelvins</paper-item>     
            <paper-item value="10145">deg R</paper-item>           
            <paper-item value="10065">From Custom Scale</paper-item>                           
          </paper-listbox>
        </paper-dropdown-menu> 
        </div>
        <div class="layout vertical wrap">
        <h1 class="header"> customRTD</h1>
        <paper-input type="number" always-float-label class="item inputPrimary szSmall colorInput" label ="a" value={{a}}></paper-input> 
        <paper-input type="number" always-float-label class="item inputPrimary szSmall colorInput" label ="b" value={{b}}></paper-input> 
        <paper-input type="number" always-float-label class="item inputPrimary szSmall colorInput" label ="c" value={{c}}></paper-input> 
        </div>
      </div>
      </div>
           <div id="options" class="hiddenDiv ">           
           <h1 class="header"> units</h1>
              <h1 class="header"> Resistence</h1>
              <paper-dropdown-menu class="inputPrimary szMedium colorInput" always-float-label label="units" no-animations>
                <paper-listbox name="units" slot="dropdown-content" attr-for-selected="value" selected={{units}} >
                  <paper-item value="10384">Ohms</paper-item>
                  <paper-item value="10065">From Custom Scale</paper-item>                       
                </paper-listbox>
              </paper-dropdown-menu> 
            </div>
          </div>        
      </div>
    </div>
  </div>
</div>
      
    `;

  }
    static get properties() { 
      
  }

  showOptions(){
    let measurementType = this.measurementType;
    let divs = this.shadowRoot.querySelectorAll('#options');
    for (var i = 0; i < divs.length; i++) {
      if (i == measurementType){
        divs[i].removeAttribute("class","hiddenDiv");
        divs[i].setAttribute("class","open");
        divs[i].classList.toggle("margin");
      }
      else
        divs[i].setAttribute("class","hiddenDiv");
    }
  }

  getValuesChannel(){

    //console.log(this.$.rate.value);
    //console.log(this.$.numberOfSamples.value);
    //console.log(`${this.sampleMode}`)
    //console.log(this.$.fetchTimeout.value);

     let deviceName = this.deviceName;
     let active = this.active; 
     let channelName = this.channelName;
     let physicalChannel = this.physicalChannel;
     let tedschannel = this.tedschannel;
     let resistanceConfiguration = this.resistanceConfiguration;
     let currentExcitationSource = this.currentExcitationSource;
     let currentExcitationValue = this.currentExcitationValue;
     let measurementType = this.measurementType;
     let customScaleName = this.customScaleName;
     let minimumValue = this.minimumValue;
     let maximumValue = this.maximumValue;
     let rtdType = this.rtdType;
     let ro = this.ro;
     let unit = this.unit;
     let a = this.a;
     let b = this.b;
     let c = this.c;
     let units = this.units;
  
    this.dispatch(this.actions.addChannelListPanel(deviceName,active,channelName,physicalChannel,tedschannel,
      resistanceConfiguration,currentExcitationSource,currentExcitationValue,measurementType,customScaleName,
      minimumValue,maximumValue,rtdType,ro,unit,a,b,c,units));

    this.bindToHandler('parameters',(parameters) =>{
        //console.log(parameters);         
    })
  }

  constructor() {
    super();
  }

  ready() {
    super.ready();
    //let btn = this.$.btn;
  //   this.$.btn.onclick = () => {
  //     this.getValuesChannel();            
  //  }  
  }

}
customElements.define('task-channel4357', TaskChannel4357);