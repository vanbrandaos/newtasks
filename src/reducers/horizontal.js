import {HORIZONTALPANEL} from '../constants/actionTypes';
import store from '../store';

    const initialState = [
      //  {rate: 10}
             ]

    const horizontalPanelReducer = (horizontal = initialState, action) => {
        switch (action.type) {
        case HORIZONTALPANEL:
           action.pathsToNotify = ['horizontal'];
           return [...horizontal, {horizontal: {rate: action.rate, numberOfSamples : action.numberOfSamples ,
            sampleMode: action.sampleMode,fetchTimeout: action.fetchTimeout} }]
        }        
        return horizontal;
        };
        export default horizontalPanelReducer;
