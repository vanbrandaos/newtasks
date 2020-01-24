import {combineReducers} from 'redux';
import triggerPanelReducer from './trigger';
import horizontalPanelReducer from './horizontal';
import channelPanelReducer from './channel';
 import configurationPanelReducer from './reducer';

const rootReducer = combineReducers({
    // horizontal: horizontalPanelReducer,
    // trigger: triggerPanelReducer,
    // channel: channelPanelReducer,
    parameters: configurationPanelReducer
});

export default rootReducer;


        