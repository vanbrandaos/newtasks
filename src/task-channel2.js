import {PolymerElement, html} from '@polymer/polymer';
import {somaReduxMixin} from './store.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-toggle-button/paper-toggle-button.js';


class TaskChannel4497 extends somaReduxMixin(PolymerElement) {
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

    paper-input {
      max-width:100px;
    }

    .margin{
      margin: 10px 20px;
    }

    .sectionTitle{
      height:55px;
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

    h1 {
    margin: 0 0 0 0;
    font-size: 0.90em;
    font-weight: normal;
    }

    .header{
      margin: 10px 0;
      font-size:0.95em;
      color: var(--app-primary-color);      
    }

    h1 legend{
      margin: 10px 0;
      font-size:0.90em;
    }
    </style>

<div class="layout horizontal center-center wrap" slot="content">

  <div id="title" class="appTitleBar center-center wrap" style="width:1200px;">
    <div class="layout horizontal center center-justified secondaryCombination appTitleBar">
      <span>channelList</span>
    </div>
    <div class="layout vertical start wrap">   
      <div class="layout horizontal start wrap">
      <paper-input always-float-label class="item inputPrimary colorInput" value={{deviceName}} label="deviceName"></paper-input>   
      </div>  
      <div class="layout horizontal start wrap">
        <div class="layout vertical start wrap margin">
          <h1 class="header"> daqTaskVoltageChannel</h1>  
          <paper-toggle-button class="inputPrimary colorInput header" checked={{active}}>active</paper-toggle-button>
          <paper-input always-float-label value={{channelName}} class="item inputPrimary colorInput" label="channelName"></paper-input>    
          <paper-input always-float-label value={{physicalChannel}} class="item inputPrimary colorInput" label ="physicalChannel"></paper-input> 
          <paper-toggle-button class="inputPrimary colorInput header" checked={{tedschannel}}>TEDSchannel</paper-toggle-button>            
          <h1 class="header"> hardware</h1>              
          <paper-dropdown-menu class="inputPrimary colorInput" always-float-label label="coupling" no-animations>
          <paper-listbox slot="dropdown-content" attr-for-selected="value" selected={{coupling}}>
          <paper-item value="10045">AC</paper-item>
          <paper-item value="10050">DC</paper-item>
          <paper-item value="10066">GND</paper-item>           
          </paper-listbox>
          </paper-dropdown-menu> 
          <paper-dropdown-menu class="inputPrimary colorInput" always-float-label label="inputTerminalConfiguration " no-animations>
            <paper-listbox slot="dropdown-content" attr-for-selected="value" selected={{inputTerminalConfiguration}} >
              <paper-item value="-1">default</paper-item>
              <paper-item value="10083">RSE</paper-item>
              <paper-item value="10078">NRSE</paper-item>           
              <paper-item value="10106">Differential</paper-item>                         
              <paper-item value="12529">Pseudodifferential</paper-item>                                       
            </paper-listbox>
          </paper-dropdown-menu> 
          <h1 class="header"> iepe</h1> 
          <paper-dropdown-menu class="inputPrimary colorInput" always-float-label label="currentExcitationSource" no-animations>
            <paper-listbox slot="dropdown-content" attr-for-selected="value" selected={{currentExcitationSource}} >
              <paper-item value="10200">Internal</paper-item>
              <paper-item value="10167">External</paper-item>
              <paper-item value="10230">None</paper-item>           
            </paper-listbox>
          </paper-dropdown-menu> 
          <paper-input always-float-label class="item inputPrimary colorInput" value={{currentExcitationValue}} label="currentExcitationValue"></paper-input>                      
        </div>

        <div class="layout vertical start wrap margin">
          <h1 class="header"> scaling</h1>  
          <paper-dropdown-menu class="inputPrimary colorInput" always-float-label label="measurementType" no-animations>
            <paper-listbox slot="dropdown-content" attr-for-selected="value" selected={{measurementType}} >
            <paper-item value="0">Volts</paper-item>
            <paper-item value="1">Acceleration</paper-item>     
            <paper-item value="2">SoundPressure</paper-item>     
            <paper-item value="3">Velocity</paper-item>     
            <paper-item value="4">Force</paper-item>                 
            </paper-listbox>
          </paper-dropdown-menu> 
          <paper-input type="number" always-float-label class="item inputPrimary colorInput" label="customScaleName" value={{customScaleName}}></paper-input>    
          <paper-input type="number" always-float-label class="item inputPrimary colorInput" label="minimumValue" value={{minimumValue}}></paper-input>    
          <paper-input type="number" always-float-label class="item inputPrimary colorInput" label="maximumValue" value={{maximumValue}}></paper-input>  
          <paper-input type="number" always-float-label class="item inputPrimary colorInput" label="sensitivity" value={{sensitivity}}></paper-input>            
          <paper-input type="number" always-float-label class="item inputPrimary colorInput" label="dbReference " value={{dbReference}}></paper-input>              
        </div>

        <div class="layout vertical start wrap">

        <h1 class="header"> units</h1>

        <div class="layout horizontal start wrap margin">    
          <div id="voltage" class="layout vertical start wrap margin">
              <h1 class="header"> Voltage</h1> 
              <paper-dropdown-menu class="inputPrimary colorInput" always-float-label label="units" no-animations>
                <paper-listbox slot="dropdown-content" attr-for-selected="value" selected={{units}}>
                <paper-item value="10348">Volts</paper-item>
                <paper-item value="10065">From Custom Scale</paper-item>                             
                </paper-listbox>
              </paper-dropdown-menu> 
            </div>

            <div id="acceleration" class="layout vertical start wrap margin">
            <h1 class="header"> Acceleration</h1> 
              <paper-dropdown-menu class="inputPrimary colorInput" always-float-label label="units" no-animations>
              <paper-listbox name="units" slot="dropdown-content" attr-for-selected="value" selected={{units}} >
                <paper-item value="10106">g</paper-item>
                <paper-item value="12470">m/s^2</paper-item>                       
                <paper-item value="10065">From Custom Scale</paper-item>                    
              </paper-listbox>
            </paper-dropdown-menu> 
            <paper-dropdown-menu class="inputPrimary colorInput" always-float-label label="sensitivityUnits" no-animations>
            <paper-listbox name="unit" slot="dropdown-content" attr-for-selected="value" selected={{sensitivityUnits}} >
              <paper-item value="12509">mVolts/g</paper-item>
              <paper-item value="12510">Volts/g</paper-item>                             
            </paper-listbox>
          </paper-dropdown-menu> 
          </div>

          <div id="soundPressure" class="layout vertical start wrap margin">
          <h1 class="header"> SoundPressure</h1> 
            <paper-dropdown-menu class="inputPrimary colorInput" always-float-label label="units" no-animations>
            <paper-listbox name="units" slot="dropdown-content" attr-for-selected="value" selected={{units}} >
              <paper-item value="10081">Pascals</paper-item>
              <paper-item value="10065">From Custom Scale</paper-item>                       
            </paper-listbox>
          </paper-dropdown-menu> 
        </div>       
      <div id="velocity" class="layout vertical start wrap margin">
      <h1 class="header"> Velocity</h1> 
        <paper-dropdown-menu class="inputPrimary colorInput" always-float-label label="units" no-animations>
        <paper-listbox name="units" slot="dropdown-content" attr-for-selected="value" selected={{units}} >
          <paper-item value="15960">in/s</paper-item>
          <paper-item value="15959">m/s</paper-item>          
          <paper-item value="10065">From Custom Scale</paper-item>                       
        </paper-listbox>
      </paper-dropdown-menu> 
      <paper-dropdown-menu class="inputPrimary colorInput" always-float-label label="sensitivityUnits" no-animations>
      <paper-listbox name="unit" slot="dropdown-content" attr-for-selected="value" selected={{sensitivityUnits}} >
        <paper-item value="15964">mVolts/in/s</paper-item>
        <paper-item value="15963">mVolts/mm/s</paper-item>                             
      </paper-listbox>
    </paper-dropdown-menu>       
    </div>     
    
    <div id="force" class="layout vertical start wrap margin">
    <h1 class="header"> Force</h1> 
      <paper-dropdown-menu class="inputPrimary colorInput" always-float-label label="units" no-animations>
      <paper-listbox name="units" slot="dropdown-content" attr-for-selected="value" selected={{units}} >
        <paper-item value="15875">Newtons</paper-item>
        <paper-item value="15876">Pounds</paper-item>        
        <paper-item value="10065">From Custom Scale</paper-item>                       
      </paper-listbox>
    </paper-dropdown-menu> 
    <paper-dropdown-menu class="inputPrimary colorInput" always-float-label label="sensitivityUnits" no-animations>
    <paper-listbox name="unit" slot="dropdown-content" attr-for-selected="value" selected={{sensitivityUnits}} >
      <paper-item value="15891">mVolts/N</paper-item>
      <paper-item value="15892">Volts/lb</paper-item>                             
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
     let coupling = this.coupling;
     let inputTerminalConfiguration  = this.inputTerminalConfiguration;
     let currentExcitationSource = this.currentExcitationSource;
     let currentExcitationValue = this.currentExcitationValue;
     let measurementType = this.measurementType;
     let customScaleName = this.customScaleName;
     let minimumValue = this.minimumValue;
     let maximumValue = this.maximumValue;
     let sensitivity = this.sensitivity;
     let dbReference = this.dbReference;
     let unitsVoltage = this.unitsVoltage;
     let unitsAcceleration = this.unitsAcceleration;
     let sensitivityUnitsAcceleration = this.sensitivityUnitsAcceleration;
     let unitsSoundPressure = this.unitsSoundPressure;
     let sensitivityUnitsSoundPressure = this.sensitivityUnitsSoundPressure;
     let unitsVelocity = this.unitsVelocity;
     let sensitivityUnitsVelocity = this.sensitivityUnitsVelocity;     
     let unitsForce = this.unitsForce;
     let sensitivityUnitsForce = this.sensitivityUnitsForce;       
  
    this.dispatch(this.actions.addChannelListPanel4497(deviceName,active,channelName,physicalChannel,tedschannel,
      coupling,inputTerminalConfiguration,currentExcitationSource,currentExcitationValue,measurementType,customScaleName,
      minimumValue,maximumValue,sensitivity,dbReference,unitsVoltage,unitsAcceleration,sensitivityUnitsAcceleration,
      unitsSoundPressure,sensitivityUnitsSoundPressure,unitsVelocity,sensitivityUnitsVelocity,unitsForce,sensitivityUnitsForce));

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
customElements.define('task-channel4497', TaskChannel4497);