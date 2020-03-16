import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

import "app-menu-polymer3/app-menu.js";
import "app-menu-polymer3/app-submenu.js";
import "app-menu-polymer3/app-menu-icon-item.js";
import "app-menu-polymer3/app-menu-shared-styles.js";

import "@polymer/app-route/app-location.js";

import "@polymer/iron-icons/iron-icons.js";
import "@polymer/iron-pages/iron-pages.js";
import "@polymer/iron-selector/iron-selector.js";
import "@polymer/paper-item/paper-item.js";
import "@polymer/paper-toast/paper-toast.js";

import "@soma/layout-soma/layout-soma.js";
import "@soma/soma-styles/soma-styles.js";


import "@soma/soma-dynamic-common/views/soma-dynamic-list.js";
import "@soma/soma-dynamic-common/views/soma-dynamic-form-view.js";
import "@soma/soma-dynamic-common/views/filter-selector-view.js";


import { NavigatorStrikesBack } from "@soma/soma-dynamic-common/views/navigator-strikes-back.js";
import { cascadeInsert, getStagedInstance, generateUUID } from "@soma/soma-dynamic-common/utils/entities-utils.js";

import "./task-form-view.js"
import "./task-store.js";

//import "./poc-form-view.js";


import {SomaStoreMixin} from "@soma/soma-utils/soma-redux.js";


/**
 * `LowerCaseDashedName` Description
 *
 * @customElement
 * @polymer
 * @demo
 * 
 */
class TaskApp extends SomaStoreMixin(PolymerElement) {

    static get template() {
        return html`
            <style include="soma-styles demo-pages-shared-styles iron-flex  iron-flex-alignment"></style>
            <style>
                :host {
                    display: block;
                    font-family: 'Roboto', 'Noto', sans-serif;
                    -webkit-font-smoothing: antialiased;
                }
                layout-soma {
                    width: 100%;
                    height: 100%;
                }
                iron-pages#viewStack {
                    width: 100%;
                    height: 100%;
                }
                div#drawerContainer {
                    background: var(--app-secondary-background-color);
                    overflow-y: auto;
                    overflow-x: none;
                }
                app-menu {
                    background-color: var(--app-secondary-background-color);
                    --app-menu-selected-bg-color: var(--app-secondary-background-color);
                    --app-menu-color: white;
                    --primary-color: white;          
                }
                paper-item {
                    font-family: 'Roboto', 'Noto', sans-serif;
                    -webkit-font-smoothing: antialiased;
                }
                .mainMenu {
                    padding: 0;
                    margin-left: 0px;
                }
                .subMenu {
                    font-size: 16px;
                    text-indent: 20px;
                    margin-left: 0;
                    @apply layout-horizontal;
                    @apply start-justified;
                }
                .content {         
                    width: 100%;
                    height: calc(100vh - 64px);
                    @apply --layout-vertical;
                    @apply --layout-center;
                    @apply --layout-center-justified;
                }
                paper-toast {
                    font-family: 'Roboto', 'Noto', sans-serif;
                    font-weight: bold;
                    font-size: 24px;
                    min-width: 0px;
                    @apply --shadow-elevation-4dp;
                }
            </style>    

            <app-location id="location" url-space-regex="^/" route="{{route}}"></app-location>
            
            <paper-toast id="toast" text="Offline" class="primaryCombination" duration="0" opened></paper-toast>
            
            <layout-soma id="layout" app-title="Tasks" profile-icon="person" home-location="" logout-link=""
                logo-image="" profile-image="">


                <div id="drawerContainer" class="primaryCombination" slot="navigation" style="width: 100%; height: 100vh">
                    <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
                        <app-menu style="margin-top: 128px; " class="layout horizontal mainMenu">
                            <app-submenu>
                                <div slot="submenu-trigger" class="layout horizontal ">
                                    <paper-item style="font-size:18px; ">Tarefas</paper-item>
                                    <div style="width:50px;"></div>
                                    <iron-icon icon="arrow-drop-down" style=" height:50px;"></iron-icon>
                                </div>
                                <app-menu slot="submenu-content">
                                    <div>                  
                                        <paper-item class="subMenu" path="/list/Tasks" on-tap="_handleSwitch">Listar Tasks</paper-item>                                                                                                                    
                                    </div>
                                </app-menu>
                            </app-submenu>

                            <app-menu style="margin-top: 10px; " class="layout horizontal mainMenu">
                            <app-submenu>
                                <div slot="submenu-trigger" class="layout horizontal ">
                                    <paper-item style="font-size:18px; ">Módulos</paper-item>
                                    <div style="width:50px;"></div>
                                    <iron-icon icon="arrow-drop-down" style=" height:50px;"></iron-icon>
                                </div>
                                <app-menu slot="submenu-content">
                                    <div>                  
                                        <paper-item class="subMenu" path="/list/Modulos" on-tap="_handleSwitch">Listar Módulos</paper-item>                                                                                                                    
                                    </div>
                                </app-menu>
                            </app-submenu>     
                            
                            <app-menu style="margin-top: 10px; " class="layout horizontal mainMenu">
                            <app-submenu>
                                <div slot="submenu-trigger" class="layout horizontal ">
                                    <paper-item style="font-size:18px; ">Canais</paper-item>
                                    <div style="width:50px;"></div>
                                    <iron-icon icon="arrow-drop-down" style=" height:50px;"></iron-icon>
                                </div>
                                <app-menu slot="submenu-content">
                                    <div>                  
                                        <paper-item class="subMenu" path="/list/ChannelList4357" on-tap="_handleSwitch">Listar Canais 4357</paper-item>                                                                                                                    
                                        <paper-item class="subMenu" path="/list/ChannelList4497" on-tap="_handleSwitch">Listar Canais 4497</paper-item>                                                                                                                                                            
                                    </div>
                                </app-menu>
                            </app-submenu>                              

                
                    </iron-selector>


                </div>
                <iron-pages id="viewStack" slot="content" selected="[[page]]" attr-for-selected="name" fallback-selection="home" 
                    role="main">   
                    <soma-dynamic-list id="list" name="list" form-page-name="form" class="primaryCombination"></soma-dynamic-list>               
                    <task-form-view id="form" name="form" class="inputPrimary primaryCombination primaryTipColor primaryRadioButton"></task-form-view>
               
                    </iron-pages> 
                </layout-soma>

                <soma-request-websocket id="somaWebsocket" reconnect validate-session on-message="handleResponse"></soma-request-websocket>

        `;
    }    

    static get properties() {
        let properties = {
            page: {
                type: String,
                reflectToAttribute: true
            },
            rootPath: String,
            name: {
                type: String
            },
            route: {
                observer: '_routeChanged'
            },
            backFlag: {
                type: Boolean
            },
            navName: {
                type: String,
                notify: true,
                value: "navEntities"
            },
            appPrefix: {
                type: String,
                value: ""
            },
            hostPrefix: {
                type: String,
                value: ""
            }
        };

        return Object.assign({}, super.properties, properties);
    }

    constructor() {
        super();
    }

    ready() {
        //console.log('ready');
        super.ready();

        this.bindToPath('route.page', 'page');       

        window.addEventListener('popstate', (e) => this._goBack(event));

        this.$.list.addEventListener('filter', (e) => this._selectFilterNavigator(e.detail.entityName, e.detail.fieldName));

        this.$.somaWebsocket.addEventListener("open", () => {
            this.$.toast.opened = false;
            this.synchronizeLocalPersistence();
        });

        this.$.somaWebsocket.addEventListener("close", () => {
            this.$.toast.opened = true;
        });

        this.$.somaWebsocket.addEventListener("session-invalid", (e) => {
            document.location.reload();
        });

        this.$.somaWebsocket.host = window.location.host;

        this.$.somaWebsocket.url = "//" + window.location.host + "";
        this.$.somaWebsocket.validationUrl = "//" + window.location.host + "";        
                      
        window.Soma = {};                  
        Soma.container = {};
        Soma.container.websocket = { 
            sendMessage: (e) => {
                console.log(e)
            }
        }

        this.$.form.setTargetFormIdx(Soma.container.targetFormIdx);

        this.mediator = new NavigatorStrikesBack(this.appPrefix, this.$.location);

        let appLocation = this.$.location.path.includes(this.appPrefix);
           
    }

    _goBack(e) {
        //console.log(this.state.route);
        this.dispatch(this.actions.goBack());
    }

    handleResponse(e) {
        let message = JSON.parse(e.detail.message);

        if (message.type == "ACTION") {
            console.log(message);

            let action = this.actions[message.action](message.payload);
            this.dispatch(action);
        }
        if (message.type == 'USER_INFO') {
            let fname = message.fname;
            let lname = message.lname;
            let roles = message.roles;

            this.$.layout.user = { fname: fname, lname: lname };

        }
    }

    _routeChanged(route) {
        let payload = {};
        payload.path = route.path;
        payload.prefix = route.path.includes(this.appPrefix) ? this.appPrefix : this.hostPrefix;
        //payload.prefix = ''; 
        //console.log(payload);
        this.dispatch(this.actions.addPath(payload));
    }    

    _showPage404() {
        this.page = 'my-view404';
    }    

    _handleSwitch(e){
        this.$.location.path = '' + e.target.getAttribute('path');
        //console.log('' + e.target.getAttribute('path'));
    }  

    _selectFilterNavigator(entityName, fieldName) {
        this.$.filterSelector.loadView(entityName, fieldName);
        this.navName = 'navFilter';
    }    

 

}

customElements.define('task-app', TaskApp);