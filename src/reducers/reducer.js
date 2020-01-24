import {HORIZONTALPANEL} from '../constants/actionTypes';
import {TRIGGERPANEL} from '../constants/actionTypes';
import {CHANNELPANEL} from '../constants/actionTypes';
import {CHANNELPANEL4497} from '../constants/actionTypes';
import store from '../store';

const initialState = {
      /* { "horizontal":{"rate":1,
                        "numberOfSamples":10,
                        "sampleMode":10178,
                        "fetchTimeout(s)":10 },
          "niDaqStartTriggerSettings":{  },
          "channelList":[ {  } ] }*/

          channelList: [] 
}

const configurationPanelReducer = (parameters = initialState, action) => {
  
    switch (action.type) {
    case HORIZONTALPANEL:
        action.pathsToNotify = ['parameters'];
        return {...parameters,horizontal:{rate:action.rate,numberOfSamples:action.numberOfSamples,
        sampleMode:action.sampleMode,fetchTimeout:action.fetchTimeout}}
    case TRIGGERPANEL:
        action.pathsToNotify = ['parameters'];
        return {...parameters, 
          niDaqStartTriggerSettings:{
            triggerType:action.triggerType,source:action.source,
            startAnalogEdgeTriggerSettings:{level:action.level,slope:action.slope},
            startAnalogWindowTriggerSettings:{when:action.when,windowTop:action.windowTop,windowBottom:action.windowBottom},
            startDigitalEdgeTriggerSettings:{edge:action.edge},
            startDigitalPatternTriggerSettings:{pattern:action.pattern,triggerWhen:action.triggerWhen}
          }
        }               
    case CHANNELPANEL:
      action.pathsToNotify = ['parameters'];
      const channelList = parameters.channelList.slice();
      channelList.push({devicename:action.devicename,rtdChannel:{active: action.active,channelName: action.channelName,
        physicalChannel:action.physicalChannel,TEDSchannel:action.TEDSchannel,
        hardware:{resistanceConfiguration:action.resistanceConfiguration,
        iepe:{currentExcitationSource:action.currentExcitationSource,currentExcitationValue:
        action.currentExcitationValue}},
        scaling:{measurementType:action.measurementType,customScaleName:action.customScaleName,
        minimumValue:action.minimumValue,maximumValue:action.maximumValue,
        units:{Temperature:{rtdType:action.rtdType,ro:action.ro,unit:action.unit,
        customRTD:{a:action.a,b:action.b,c:action.c}},
        Resistance:{units:action.units}}}}});
       
      return {...parameters, channelList} 
      
     case CHANNELPANEL4497:
      action.pathsToNotify = ['parameters'];
      channelList = parameters.channelList.slice();
      channelList.push({deviceName:action.deviceName,daqTaskVoltageChannel:{active:action.active,channelName:action.channelName,
      physicalChannel:action.physicalChannel,TEDsChannel:action.TEDsChannel,hardware:{coupling:action.coupling,
      inputTerminalConfiguration:action.inputTerminalConfiguration,iepe:{currentExcitationSource:action.currentExcitationSource,currentExcitationValue:action.currentExcitationValue}},
      scaling:{measurementType:action.measurementType,customScaleName:action.customScaleName,minimumValue:action.minimumValue,maximumValue:action.maximumValue,
      sensitivity:action.sensitivity,dbReference:action.dbReference,units:{Voltage:{units:action.unitsVoltage},Acceleration:{units:action.unitsAcceleration,    
      sensitivityUnits:action.sensitivityUnitsAcceleration},SoundPressure:{units:action.unitsSoundPressure},Velocity:{units:action.unitsVelocity,
      sensitivityUnits:action.sensitivityUnitsVelocity},Force:{units:action.unitsForce,sensitivityUnits:action.sensitivityUnitsForce}}}}});
       
       return {...parameters, channelList}
      
    }     
    return parameters;
    };
    export default configurationPanelReducer;
