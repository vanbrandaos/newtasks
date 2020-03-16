//import {SomaRedux} from '@soma/soma-utils/soma-redux.js';
import {createStore} from 'redux';
import rootReducer from './reducers/root';
import {addHorizontalPanel} from './actions/horizontal';
import {addTriggerSettingsPanel} from './actions/trigger';
import {addChannelListPanel} from './actions/channel';
// import {addChannelListPanel4497} from './actions/channel2';

const actions = {addHorizontalPanel,addTriggerSettingsPanel,addChannelListPanel};
//console.log(actions)


export const somaReduxMixin = SomaRedux(rootReducer, actions);