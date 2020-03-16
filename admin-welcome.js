import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import "@polymer/iron-flex-layout/iron-flex-layout.js";
import "@polymer/iron-flex-layout/iron-flex-layout-classes.js";


/**
 * `LowerCaseDashedName` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class AdminWelcome extends PolymerElement {
    static get properties() {
        return {

        }
    }

    static get template() {
        return html`
            <style is="custom-style" include="soma-styles iron-flex  iron-flex-alignment iron-flex-factors">                               
                .gen-conf {                    
                    font-family: 'Roboto', 'Noto', sans-serif;
                    -webkit-font-smoothing: antialiased;   
                    color:currentColor;                   
                    @apply --layout-vertical;
                    @apply --layout-center;
                    @apply --layout-center-justified; 
                }         
                                
                #masterContainer{ 
                    background-position: 0 0;
                    background-image: linear-gradient(to bottom, rgba(150, 150, 150, 0.2) 100%, rgba(150, 150, 150, 0.2) 0%), url('/mxml/applications/assets/img/splash.jpg');                                                       
                    background-size: 1920px 1080px;
                    height: 100%;
                }                
                                
                #container{                    
                    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);                                                                       
                    height: 60%;
                    width: 90%;
                }                                
                                
                .mainTitle {
                    text-align: center; 
                    vertical-align: middle;              
                }
                                
                                
                @media screen and (orientation:portrait) and (max-device-width: 500px){
                    #masterContainer {
                        height:100vh; 
                        width: 100%;                                                                             
                    }  
                                        
                    #container {
                        height: 90%;    
                        width: 70%;                                                     
                    }
                    
                    app-toolbar{
                        background: var(--app-primary-background-color);
                        color: var(--app-secondary-background-color);
                    }                 
                } 
                                
            </style>

            <div id="masterContainer" class="gen-conf">
                <div id="container" class="mainTitle secondaryCombination layout vertical center center-justified"> 
                    <span style="font-size:24px;">Bem-vindo ao Módulo de Administração do SOMA</span>        
                </div>
            </div>
        `;
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
}

customElements.define('admin-welcome', AdminWelcome);