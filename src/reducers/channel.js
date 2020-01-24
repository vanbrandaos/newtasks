import {CHANNELPANEL} from '../constants/actionTypes';
import store from '../store';

    const initialState = [
      //  {rate: 10}
             ]

    const channelPanelReducer = (channel = initialState, action) => {
        switch (action.type) {
        case CHANNELPANEL:
           action.pathsToNotify = ['channel'];
           return [...channel, {channelList: {devicename:action.devicename, 
            "rtdChannel":{active: action.active,channelName: action.channelName,
                physicalChannel:action.physicalChannel,TEDSchannel:action.TEDSchannel,
            "hardware":{resistanceConfiguration:action.resistanceConfiguration,
            "iepe":{currentExcitationSource:action.currentExcitationSource,currentExcitationValue:
                action.currentExcitationValue}},
            "scaling":{measurementType:action.measurementType,customScaleName:action.customScaleName,
                minimumValue:action.minimumValue,maximumValue:action.maximumValue,
            "units":{"Temperature":{rtdType:action.rtdType,ro:action.ro,unit:action.unit,
            "customRTD":{a:action.a,b:action.b,c:action.c}},
            "Resistance":{units:action.units}}}}}}]
        }        
        return channel;
        };
        export default channelPanelReducer;




