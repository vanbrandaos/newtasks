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

import "./task-form-view.js"
import "./task-store.js";

import {SomaStoreMixin} from "@soma/soma-utils/soma-redux.js";
import {ListFormMediator} from "@soma/soma-dynamic-common/views/list-form-mediator.js";


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
                    margin-left: 30px;
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
                                    <paper-item style="font-size:18px; ">Módulo NI 4357</paper-item>
                                    <div style="width:50px;"></div>
                                    <iron-icon icon="arrow-drop-down" style=" height:50px;"></iron-icon>
                                </div>
                                <app-menu slot="submenu-content">
                                    <div>                  
                                        <paper-item class="subMenu" path="/list/Modelos" on-tap="_handleSwitch">Listar Módulos</paper-item>                                                                            
                                        <paper-item class="subMenu" path="/form/Horizontal/new/4397/" on-tap="_handleSwitch">Horizontal</paper-item>                                        
                                        <paper-item class="subMenu" path="/form/TriggerType/new/4397/" on-tap="_handleSwitch">Trigger Settings</paper-item>                                        
                                        <paper-item class="subMenu" path="/list/ChannelList/" on-tap="_handleSwitch">Channel List</paper-item>
                                    </div>
                                </app-menu>
                            </app-submenu>

                            <app-menu style="margin-top: 10px; " class="layout horizontal mainMenu">
                            <app-submenu>
                                <div slot="submenu-trigger" class="layout horizontal ">
                                    <paper-item style="font-size:18px; ">Módulo NI 4497</paper-item>
                                    <div style="width:50px;"></div>
                                    <iron-icon icon="arrow-drop-down" style=" height:50px;"></iron-icon>
                                </div>
                                <app-menu slot="submenu-content">
                                    <div>                  
                                        <paper-item class="subMenu" path="/form/Horizontal/new/4397/" on-tap="_handleSwitch">Horizontal</paper-item>                                        
                                        <paper-item class="subMenu" path="/form/TriggerType/new/4397" on-tap="_handleSwitch">TriggerType</paper-item>                                        
                                    </div>
                                </app-menu>
                            </app-submenu>                            
                        </app-menu>

                        <app-menu style="margin-top: 10px; " class="layout horizontal mainMenu">
                        <app-submenu>
                            <div slot="submenu-trigger" class="layout horizontal ">
                                <paper-item style="font-size:18px; "  path="/list/Horizontal/" on-tap="_handleSwitch">Tarefas</paper-item>
                                <div style="width:50px;"></div>                                
                            </div>                           
                        </app-submenu>                            
                    </app-menu>                        
                    </iron-selector>
                </div>
                <iron-pages id="viewStack" slot="content" selected="[[page]]" attr-for-selected="name" fallback-selection="home" 
                    role="main">   
                    <soma-dynamic-list id="list" name="list"></soma-dynamic-list>                 
                    <task-form-view id="form" name="form"></task-form-view>
                </iron-pages> 
                </layout-soma>
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
        
        this.mediator = new ListFormMediator(this.$.list,this.$.form,this.$.location,'');

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
        payload.prefix = '';    
        this.dispatch(this.actions.addPath(payload));        
    }

    _handleSwitch(e){
        this.$.location.path = '' + e.target.getAttribute('path');
    }

}

customElements.define('task-app', TaskApp);