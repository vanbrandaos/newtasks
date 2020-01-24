export const addConfigurationPanel = (rate,numberOfSamples,sampleMode,fetchTimeout,triggerType,source,level,slope,when,
    windowTop,    windowBottom,edge,pattern,triggerWhen,devicename,active,channelName,physicalChannel,TEDSchannel,
    resistanceConfiguration,currentExcitationSource,currentExcitationValue,measurementType,customScaleName,
    minimumValue,maximumValue,rtdType,ro,unit,a,b,c,units) => ({
    type: 'CONFIGURATIONPARAMETERS', rate,numberOfSamples,sampleMode,fetchTimeout,triggerType,source,level,slope,when,
    windowTop,windowBottom,edge,pattern,triggerWhen,devicename,active,channelName,physicalChannel,TEDSchannel,
    resistanceConfiguration,currentExcitationSource,currentExcitationValue,measurementType,customScaleName,
    minimumValue,maximumValue,rtdType,ro,unit,a,b,c,units
    });
    
