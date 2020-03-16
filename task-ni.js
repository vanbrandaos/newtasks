import {PolymerElement, html} from '@polymer/polymer';
import {somaReduxMixin} from './store.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@soma/soma-styles/soma-styles';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-card/paper-card.js';

class TaskNI extends somaReduxMixin(PolymerElement) {
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


    <div class="layout horizontal center-center" slot="content">
      
      <div id="title" class="appTitleBar" style="width:1200px;">
        <div class="layout horizontal center center-justified titleBar secondaryCombination appTitleBar">
          <span>niDaqStartTriggerSettings</span>
        </div>

        <div class="layout vertical start wrap">     
          
          <div class="layout horizontal start wrap">
            <paper-dropdown-menu id="triggerType" class="item inputPrimary colorInput" always-float-label label="triggerType" no-animations>
              <paper-listbox class="item" on-click="showOptions" slot="dropdown-content" attr-for-selected="value" selected={{triggerType}} >
                <paper-item value="0">Imediate</paper-item>
                <paper-item value="1">Analog Edge</paper-item>
                <paper-item value="2">Analog Window</paper-item>      
                <paper-item value="3">Digital Edge</paper-item>      
                <paper-item value="4">Digital Pattern</paper-item>      
              </paper-listbox>
            </paper-dropdown-menu>      
            <paper-input always-float-label class="item colorInput inputPrimary" label="source" value={{source}}></paper-input> 
          </div>   
                  
          <div class="layout horizontal start wrap">
            
          <div id="options" class="hiddenDiv">
            <h1 class="header padding">startAnalogEdgeTriggerSettings</h1> 
            <paper-input type="number" always-float-label class="item inputPrimary colorInput" label="level" value={{level}}></paper-input>
              <paper-dropdown-menu always-float-label label="slope" class="item inputPrimary colorInput" no-animations>
                <paper-listbox name="slope" slot="dropdown-content" attr-for-selected="value" selected={{slope}} >
                  <paper-item value="10280">Rising</paper-item>
                  <paper-item value="10171">Fallin</paper-item>     
                </paper-listbox>
              </paper-dropdown-menu>  
            </div>

            <div id="options" class="hiddenDiv">
            <h1 class="header padding"> startAnalogWindowTriggerSettings</h1>  
              <paper-dropdown-menu always-float-label label="when" class="item inputPrimary colorInput" no-animations>
                <paper-listbox name="when" slot="dropdown-content" attr-for-selected="value" selected={{when}} >
                  <paper-item value="10163">Entering Window</paper-item>
                  <paper-item value="10208">Leaving Window</paper-item>     
                </paper-listbox>
              </paper-dropdown-menu> 
            <paper-input type="number" always-float-label class="item inputPrimary colorInput" label= "windowTop" value={{windowTop}}></paper-input>    
            <paper-input type="number" always-float-label class="item inputPrimary colorInput" label= "windowBottom" value={{windowBottom}}></paper-input>    
            </div>

            <div id="options" class="hiddenDiv">
            <h1 class="header padding"> startDigitalEdgeTriggerSettings</h1>  
              <paper-dropdown-menu always-float-label label="edge" class="item inputPrimary colorInput" no-animations>
                <paper-listbox name="edge" slot="dropdown-content" attr-for-selected="value" selected={{edge}} >
                  <paper-item value="10280">Rising</paper-item>
                  <paper-item value="10171">Fallin</paper-item>     
                </paper-listbox>
              </paper-dropdown-menu>  
            </div>

            <div id="options" class="hiddenDiv">
            <h1 class="header padding"> startDigitalPatternTriggerSettings</h1>  
              <paper-input always-float-label class="item inputPrimary colorInput" label="pattern" value={{pattern}} ></paper-input>
              <paper-dropdown-menu always-float-label label="triggerWhen" class="item inputPrimary colorInput" no-animations>
                <paper-listbox slot="dropdown-content" attr-for-selected="value" selected={{triggerWhen}} >
                  <paper-item value="10254">Pattern Matches</paper-item>
                  <paper-item value="10253">Pattern Does Not Match</paper-item>     
                </paper-listbox>
              </paper-dropdown-menu>  
            </div>          
          
          </div>
          </div>                 
        </div>
      </div>  
  
    `;

  }
    static get properties() { 
      return{
      // triggerType: Number,
      // source: String,
      // level: Number,
      // slope: Number,
      // when: Number,
      // windowTop: String,
      // windowBottom: String,
      // edge: Number,
      // pattern: String,
      // triggerWhen:Number
      }
  }
  
  showOptions(){
    this.level ='';
    this.slope ='';
    this.when ='';
    this.windowTop ='';
    this.windowBottom ='';
    this.edge ='';
    this.pattern ='';
    this.triggerWhen ='';
    let triggerType = this.triggerType;
    let divs = this.shadowRoot.querySelectorAll('#options');
    for (var i = 0; i < divs.length; i++) {
      if (i == triggerType-1){
        divs[i].removeAttribute("class","hiddenDiv");
        divs[i].setAttribute("class","open");
        divs[i].classList.toggle("margin");
      }
      else
        divs[i].setAttribute("class","hiddenDiv");
    }

    

/*   let triggerType = this.triggerType;
    this.shadowRoot.querySelector('#op1').setAttribute("class","hiddenDiv");
    this.shadowRoot.querySelector('#op2').setAttribute("class","hiddenDiv");
    this.shadowRoot.querySelector('#op3').setAttribute("class","hiddenDiv");
    this.shadowRoot.querySelector('#op4').setAttribute("class","hiddenDiv");

    if (triggerType == 1){
      var element = this.shadowRoot.querySelector('#op1');    
    } 
    else
    if (triggerType == 2){
      var element = this.shadowRoot.querySelector('#op2');    
    } 
    else
    if (triggerType == 3){
      var element = this.shadowRoot.querySelector('#op3');    
    } 
    else
    if (triggerType == 4){
      var element = this.shadowRoot.querySelector('#op4');    
    } 
    if (triggerType!=0){
    element.classList.toggle("open")
    element.classList.toggle("margin");
    }*/

    //element.remove("hiddenDiv");
    //alert(element)
  }

  getValuesNI(){

    let triggerType = this.triggerType;
    let source = this.source;
    let level = this.level;
    let slope = this.slope;
    let when = this.when;
    let windowTop = this.windowTop;
    let windowBottom = this.windowBottom;
    let edge = this.edge;
    let pattern = this.pattern;
    let triggerWhen = this.triggerWhen;
    
    this.dispatch(this.actions.addTriggerSettingsPanel(triggerType,source,level,slope,when,windowTop,windowBottom,
      edge,pattern,triggerWhen));    

    this.bindToHandler('parameters',(parameters) =>{
      //console.log(parameters);         
  })    
  }

  constructor() {
    super();
  }

  ready() {
    super.ready();
    // this.$.btn.onclick = () => {
    //   this.getValuesNI();                  
    // }   
      //this.shadowRoot.querySelector('#rate').innerHTML='teste';
      
   //})  
  }
}
customElements.define('task-ni', TaskNI);