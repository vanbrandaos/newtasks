export const addChannelListPanel = (devicename,active,channelName,physicalChannel,TEDSchannel,
    resistanceConfiguration,currentExcitationSource,currentExcitationValue,measurementType,customScaleName,
    minimumValue,maximumValue,rtdType,ro,unit,a,b,c,units) => ({
    type: 'CHANNELPANEL', devicename,active,channelName,physicalChannel,TEDSchannel,resistanceConfiguration,
    currentExcitationSource,currentExcitationValue,measurementType,customScaleName,minimumValue,
    maximumValue,rtdType,ro,unit,a,b,c,units
    });