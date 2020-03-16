import {PolymerElement, html} from '@polymer/polymer';
import {somaReduxMixin} from './store.js';
import * as model from "./task-model";
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/paper-input/paper-input.js';
import '@soma/soma-styles/soma-styles';
import '@soma/soma-dynamic-form/soma-dynamic-form.js'; 
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';


class SomaDynamicFormView extends somaReduxMixin(PolymerElement) {
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

    .margin{
      margin: 10px 20px;
    }

    .margin2{
      margin: 0px 30px 20px;
    }

    .titleBar{
      height:64px;
      font-size:24px;
    }

    .colorInput{
      width:100px;
      --primary-text-color: var(--app-primary-color);
    }
    
    .hiddenDiv {
      display: none;
    }

    .showDiv {
      display:block;
    }

    .item {
    /* O flex: 1; é necessário para que cada item se expanda ocupando o tamanho máximo do container. */      
      margin: 30px;
      text-align: left;
      font-size: 2em;
  }

    .szCustom {
      width: 150px;
    }

  .itemdyn {
    /* O flex: 1; é necessário para que cada item se expanda ocupando o tamanho máximo do container. */      
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
        font-size:0.85em;
        color: var(--app-primary-color);      
      }
    </style>

    <!--horizontal -->
    
  <div class="layout horizontal center-center wrap" slot="content">
    <div id="windowInfo" class="appTitleBar" style="width:1200px;">
      <div class="layout horizontal center center-justified secondaryCombination appTitleBar titleBar">
        <span>horizontal</span>
      </div>
      <div class="layout horizontal margin wrap">
        <soma-dynamic-form id="horizontal" class="itemdyn" hide-button></soma-dynamic-form>
      </div>            
    </div>

    <!--niDaqStartTriggerSettings--> 
    <div id="windowInfo" class="appTitleBar" style="width:1200px;">
      <div class="title layout horizontal center center-justified secondaryCombination appTitleBar titleBar">
        <span>niDaqStartTriggerSettings</span>
      </div>
      <div class="layout horizontal wrap">
        <paper-dropdown-menu id="triggerType" class="szCustom item inputPrimary colorInput" always-float-label label="triggerType" no-animations>
          <paper-listbox class="item" on-click="showOptionstriggerType" slot="dropdown-content" attr-for-selected="value" selected="{{triggerType}}">
            <paper-item value="0">Imediate</paper-item>
            <paper-item value="1">Analog Edge</paper-item>
            <paper-item value="2">Analog Window</paper-item>
            <paper-item value="3">Digital Edge</paper-item>
            <paper-item value="4">Digital Pattern</paper-item>
          </paper-listbox>
        </paper-dropdown-menu>
        <div id="sourceDiv" class="hiddenDiv">
          <paper-input class="item colorInput inputPrimary szCustom" name="source" id="source" type="text" always-float-label label="source"></paper-input>
        </div>
      </div>
      <div id="triggerDiv" class="layout vertical wrap">      
        <h1 id="triggerheader" class="layout horizontal center center-justified"></h1>
        <soma-dynamic-form id="trigger" class="itemdyn" hide-button></soma-dynamic-form> 
      </div>
    </div>
    
    <!--channelList4357 -->
    <div id="windowInfo" class="appTitleBar" style="width:1200px;">
      <div class="title layout horizontal center center-justified titleBar secondaryCombination appTitleBar">
        <span>channelList</span>
      </div>
      <div class="layout vertical start wrap ">
        <paper-input always-float-label class="item inputPrimary colorInput szCustom" value="{{deviceName}}" label="deviceName"></paper-input>
        <div class="layout horizontal start wrap margin2">
          <div class="layout vertical wrap">
            <h1 class="header ">rtdChannel</h1>
            <soma-dynamic-form id="channel" hide-button></soma-dynamic-form>
            <h1 class="header">hardware</h1>
            <soma-dynamic-form id="channelhardware" hide-button></soma-dynamic-form>
            <h1 class="header">iepe</h1>
            <soma-dynamic-form id="channeliepe"  hide-button></soma-dynamic-form>
          </div>
          <div class="layout vertical start wrap margin2">
            <h1 class="header">scaling</h1>
            <paper-dropdown-menu id="measurementType" class="item inputPrimary colorInput" always-float-label label="measurementType" no-animations>
              <paper-listbox class="item" on-click="showOptionsmeasurementType" slot="dropdown-content" attr-for-selected="value" selected="{{measurementType}}">
                <paper-item value="0">Temperature</paper-item>
                <paper-item value="1">Resistence</paper-item>
              </paper-listbox>
            </paper-dropdown-menu>
            <soma-dynamic-form id="channelscaling" class="margin2" hide-button></soma-dynamic-form>
          </div>
          <div class="layout vertical start wrap">
            <h1 class="header" id="titleUnits"></h1>
             <div id="channelvalueDiv" class="margin2">
              <h1 class="header" id="channelheader"></h1>
              <soma-dynamic-form id="channelform" hide-button></soma-dynamic-form>              
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

  showOptionstriggerType(){
    
    let listValuesTrigger = {
      analogedge:{
        slope:[
          {"name":"10280", "title": "Rising"},
          {"name":"10171", "title": "Falling"} 
        ]
      },
      analogwindow:{
        when:[
          {"name":"10163", "title": "Entering Window"},
          {"name":"10208", "title": "Leaving Window"}    
        ]
      },
      digitalEdge:{
        edge:[
          {"name":"10280", "title": "Rising"},
          {"name":"10171", "title": "Falling"}  
        ]
      },
      digitalPattern:{
        triggerWhen:[
          {"name":"10254", "title": "Pattern Matches"},
          {"name":"10253", "title": "Pattern Does Not Match"}   
        ]
      }      
    }
        
    let triggerType = this.triggerType;
    let entity = '';
    let field ='';
    let list = '';
    let model2 = '';

    switch (triggerType){
      case "0":
        model2 = JSON.parse(model.modelAnalogEdge);
        this.$.triggerDiv.setAttribute("class","hiddenDiv");  
        this.$.sourceDiv.setAttribute("class","hiddenDiv");                 
        break;
      case "1":
        model2 = JSON.parse(model.modelAnalogEdge);
        entity = "analogEdge"  
        field = "slope"
        list = listValuesTrigger.analogedge.slope           
        this.$.triggerDiv.setAttribute("class","showDiv");         
        this.$.sourceDiv.setAttribute("class","showDiv");      
        break;
      case "2":     
        model2 = JSON.parse(model.modelAnalogWindow);
        entity = "analogWindow"    
        field = "when"   
        list = listValuesTrigger.analogwindow.when
        this.$.triggerDiv.setAttribute("class","showDiv");    
        this.$.sourceDiv.setAttribute("class","showDiv");         
        break; 
      case "3":
        model2 = JSON.parse(model.modelDigitalEdge);
        entity = "digitalEdge"  
        field = "edge"  
        list = listValuesTrigger.digitalEdge.edge
        this.$.triggerDiv.setAttribute("class","showDiv");          
        this.$.sourceDiv.setAttribute("class","showDiv");          
        break;           
      case "4":
        model2 = JSON.parse(model.modelDigitalPattern);
        entity = "digitalPattern"  
        field = "triggerWhen"   
        list = listValuesTrigger.digitalPattern.triggerWhen
        this.$.triggerDiv.setAttribute("class","showDiv");   
        this.$.sourceDiv.setAttribute("class","showDiv");           
        break;            
    }    
    this.$.trigger.loadForm(model2);
    this.$.trigger.setItemList(field,list,entity);              
  }

  showOptionsmeasurementType(){

    let listValuesChannel = {
      channeltemperature4357:{
        rtdType:[
          {"name":"12481", "title": "Pt3750"},
          {"name":"10071", "title": "Pt3851"}, 
          {"name":"12482", "title": "Pt3911"},
          {"name":"10069", "title": "Pt3916"}, 
          {"name":"10053", "title": "Pt3920"}, 
          {"name":"12483", "title": "Pt3928"},
          {"name":"10137", "title": "Custom"} 
        ],
        unit:[
          {"name":"10143", "title": "deg C"},
          {"name":"10144", "title": "deg F"}, 
          {"name":"10325", "title": "Kelvins"},
          {"name":"10145", "title": "deg R"}, 
          {"name":"10065", "title": "From Custom Scale"} 
        ]
      },
      channelresistence4357:{
        units:[
          {"name":"10384", "title": "Ohms"},
          {"name":"10065", "title": "From Custom Scale"}   
        ]
      }     
    }
        
    let measurementType = this.measurementType;
    let channelModel = "";
    let entity = "";
    let field ='';
    let field2= '';
    let list = '';
    let list2 = '';

    switch (measurementType){
      case "0":        
        this.$.channelheader.innerHTML = "Temperature"
        this.$.channelvalueDiv.setAttribute("class","showDiv");  
        channelModel = JSON.parse(model.modelChannelListTemperature4357); 
        entity = "channeltemperature4357"
        field ='rtdType';
        field2 = 'unit';
        list = listValuesChannel.channeltemperature4357.rtdType;
        list2 = listValuesChannel.channeltemperature4357.unit;
        break;
      case "1":        
        this.$.channelheader.innerHTML = "Resistence"
        this.$.channelvalueDiv.setAttribute("class","showDiv");  
        channelModel = JSON.parse(model.modelChannelListResistence4357); 
        entity = "channelresistence4357"    
        field ='units';
        list = listValuesChannel.channelresistence4357.units;      
        break;  
    }
    
    this.$.titleUnits.innerHTML = "units"
    this.$.channelform.loadForm(channelModel);
    this.$.channelform.setItemList(field,list,entity);              
    this.$.channelform.setItemList(field2,list2,entity); 
  }
  constructor() {
    super();
  }

  ready() {
    super.ready();          
    this.fetchTimeout = 10;     
    let horizontalModel = JSON.parse(model.modelHorizontal);
    let modeltrigger = JSON.parse(model.modelAnalogEdge);
    let channelrtdChannelModel = JSON.parse(model.modelChannelListrtdChannel);
    let channelHardwareModel4357 = JSON.parse(model.modelChannelListHardware4357);
    let channeliepeModel4357 = JSON.parse(model.modelChannelListiepe4357);
    let channelscalingModel4357 = JSON.parse(model.modelChannelListScaling4357);
    let channelmeasurementTypeTemperature4357 = JSON.parse(model.modelChannelListTemperature4357); 
    let channelmeasurementTypeResistence4357 = JSON.parse(model.modelChannelListResistence4357); 

    let listValues = {
      horizontal:{
        sampleMode: [
          {"name":"10178", "title": "Finite Samples"},
          {"name":"10123", "title": "Continuous Samples"}, 
          {"name":"12522", "title": "Hardware Timed Single Point"} 
        ]
      },
      channelhardware4357:{
        resistanceConfiguration:[
          {"name":"2", "title": "2-Wire"},
          {"name":"3", "title": "3-Wire"}, 
          {"name":"4", "title": "4-Wire"}   
        ]
      },
      channeliepe4357:{
        currentExcitationSource:[
          {"name":"10200", "title": "Internal"},
          {"name":"10167", "title": "External"}, 
          {"name":"10230", "title": "None"}   
        ]
      },
      channeltemperature4357:{
        rtdType:[
          {"name":"12481", "title": "Pt3750"},
          {"name":"10071", "title": "Pt3851"}, 
          {"name":"12482", "title": "Pt3911"},
          {"name":"10069", "title": "Pt3916"}, 
          {"name":"10053", "title": "Pt3920"}, 
          {"name":"12483", "title": "Pt3928"},
          {"name":"10137", "title": "Custom"} 
        ],
        unit:[
          {"name":"10143", "title": "deg C"},
          {"name":"10144", "title": "deg F"}, 
          {"name":"10325", "title": "Kelvins"},
          {"name":"10145", "title": "deg R"}, 
          {"name":"10065", "title": "From Custom Scale"} 
        ]
      },
      channelresistence4357:{
        units:[
          {"name":"10384", "title": "Ohms"},
          {"name":"10065", "title": "From Custom Scale"}   
        ]
      }           
    };


    /*Painel Horizontal*/
    this.$.horizontal.loadForm(horizontalModel);
    this.$.horizontal.setMode('new'); 
    this.$.horizontal.setItemList('sampleMode', listValues.horizontal.sampleMode, 'horizontal');
    this.$.horizontal.clearStatusBar();
    this.$.horizontal.loadInstanceValues(undefined);

    /*Painel TriggerSettings*/
    this.$.trigger.loadForm(modeltrigger);
    this.$.trigger.setMode('new');             
    this.$.trigger.clearStatusBar();  
    this.$.trigger.loadInstanceValues(undefined);  
    this.$.triggerDiv.setAttribute("class","hiddenDiv");  

    /*Painel Channel*/
    this.$.channel.loadForm(channelrtdChannelModel);
    this.$.channel.setMode('new'); 
    this.$.channel.clearStatusBar();
    this.$.channel.loadInstanceValues(undefined);
    this.$.channelhardware.loadForm(channelHardwareModel4357);
    this.$.channelhardware.setMode('new'); 
    this.$.channelhardware.setItemList('resistanceConfiguration', listValues.channelhardware4357.resistanceConfiguration, 'channelhardware4357');
    this.$.channelhardware.clearStatusBar();
    this.$.channelhardware.loadInstanceValues(undefined);
    this.$.channeliepe.loadForm(channeliepeModel4357);
    this.$.channeliepe.setMode('new'); 
    this.$.channeliepe.setItemList('currentExcitationSource', listValues.channeliepe4357.currentExcitationSource, 'channeliepe4357');
    this.$.channeliepe.clearStatusBar();
    this.$.channeliepe.loadInstanceValues(undefined);
    this.$.channelscaling.loadForm(channelscalingModel4357);
    this.$.channelscaling.setMode('new'); 
    this.$.channelscaling.setItemList('currentExcitationSource', listValues.channeliepe4357.currentExcitationSource, 'channeliepe4357');
    this.$.channelscaling.clearStatusBar();
    this.$.channelscaling.loadInstanceValues(undefined);  
    
    /*Painel Channel combo measurementType opção Temperature*/
    this.$.channelform.loadForm(channelmeasurementTypeTemperature4357);
    this.$.channelform.setMode('new');             
    this.$.channelform.setItemList('rtdType', listValues.channeltemperature4357.rtdType, 'channeltemperature4357');
    this.$.channelform.setItemList('unit', listValues.channeltemperature4357.unit, 'channeltemperature4357');
    this.$.channelform.clearStatusBar();    
    this.$.channelvalueDiv.setAttribute("class","hiddenDiv");  

    /*Painel Channel combo measurementType opção Resistence*/
    this.$.channelform.loadForm(channelmeasurementTypeResistence4357);
    this.$.channelform.setMode('new');             
    this.$.channelform.setItemList('units', listValues.channelresistence4357.units, 'channelresistence4357');
    this.$.channelform.clearStatusBar();  
    this.$.channelvalueDiv.setAttribute("class","hiddenDiv");  
  }
}

customElements.define('soma-dynamic-form-view', SomaDynamicFormView);