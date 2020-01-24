import {TRIGGERPANEL} from '../constants/actionTypes';
import store from '../store';

    const initialState = [
      //  {rate: 10}
             ]

    const triggerPanelReducer = (trigger = initialState, action) => {
        switch (action.type) {
        case TRIGGERPANEL:
           action.pathsToNotify = ['trigger'];
           return [...trigger,  {triggertype: action.triggertype, source : action.source ,
            level: action.level,slope: action.slope, when:action.when, windowTop : action.windowTop, 
            windowBottom : action.windowBottom, edge: action.edge, pattern: action.pattern,
            triggerWhen: action.triggerWhen}]
        }        
        return trigger;
        };
        export default triggerPanelReducer;
