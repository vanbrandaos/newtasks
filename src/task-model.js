export const modelHorizontal = `{
  "Horizontal":{
    "name": "Horizontal",
    "title": "horizontal",
    "listTitle": "Painel horizontal",
    "idField": "id",
    "editable": true,
    "removable": true,
    "creatable": true,
    "info":true,
    "defaultSort":{
      "fieldName":"rate",
      "order":"up"
    },     
    "layoutConfiguration": {
      "layout": "horizontal",
      "size": "large",
     
      "groups": {
        "default": {
          "layout": "horizontal", "size": "small"
        },
        "horizontal":{
          "layout": "horizontal","size" :"medium"
        }
      } 
    },
    "fields": [     
      {
        "name": "id",
        "title": "Id",
        "type": "text",
        "renderer": "dyn-input",
        "hideFromForm": true,
        "hideFromList": true,
        "required": true,
        "editable": false,
        "group": "horizontal"
      },
      {
        "name": "rate",
        "title": "rate",
        "description": "rate",
        "type": "text",
        "renderer": "dyn-input",
        "required": false,
        "editable": true,
        "group": "horizontal"
      },      
      {
        "name": "numberOfSamples",
        "title": "numberOfSamples",
        "description":"numberOfSamples",
        "type": "number",        
        "renderer": "dyn-input",
        "required": false,
        "editable": true,
        "group": "horizontal"
      },
      {
        "name": "sampleMode", 
        "title": "sampleMode",
        "description": "sampleMode",
        "type": "list",
        "renderer": "dyn-list-single-selector", 
        "values": [
            {"name":"10178", "title": "Finite Samples"},
            {"name":"10123", "title": "Continuous Samples"}, 
            {"name":"12522", "title": "Hardware Timed Single Point"}               
        ],
        "editable": true,
        "required": true,
        "group": "horizontal"        
      },      
      {
        "name": "fetchTimeout",
        "title": "fetchTimeout(s)",
        "description":"fetchTimeout(s)",
        "type": "number",
        "renderer": "dyn-input",
        "required": false,
        "editable": true,
        "group": "horizontal"      
      }
    ]
  },"Modelos":{
 "name": "Modelos",
    "title": "Modelos",
    "listTitle": "Lista de Modelos",
    "idField": "id",
    "editable": true,
    "removable": true,
    "creatable": true,
    "parent": true,
    
    "layoutConfiguration": {
      "layout": "vertical",
      "size": "large",
     
      "groups": {
        "default": {
          "layout": "vertical", "size": "large"
        }
      } 
    },
    "fields": [     
      {
        "name": "id",
        "title": "Id",
        "type": "text",
        "renderer": "dyn-input",
        "hideFromForm": true,
        "hideFromList": true,
        "required": true,
        "editable": false
      },    
      {
        "name": "name",
        "title": "name",
        "description": "name",
        "type": "text",
        "renderer": "dyn-input",
        "required": true,
        "editable": false
      }
    ]
  },"AnalogEdge":{    
    "name": "AnalogEdge",
    "title": "1",
    "listTitle": "Opções Analog Edge",
    "idField": "id",
    "editable": true,
    "removable": true,
    "creatable": true,
    "parent": "TriggerType",
    
    "layoutConfiguration": {
      "layout": "horizontal",
      "size": "medium",
     
      "groups": {
        "default": {
          "layout": "vertical", "size": "medium"
        }
      } 
    },
    "fields": [     
      {
        "name": "id",
        "title": "Id",
        "type": "text",
        "renderer": "dyn-input",
        "hideFromForm": true,
        "hideFromList": true,
        "required": true,
        "editable": false
      },
      {
        "name": "source",
        "title": "source",
        "description": "source",
        "type": "text",
        "renderer": "dyn-input",
        "required": true,
        "editable": false
      },
      {
        "name": "level",
        "title": "level",
        "description": "level",
        "type": "number",
        "validation":{
          "isInteger":true,
          "range":{
          "min":"0",
          "max":"99"
          }
        },
        "renderer": "dyn-input",
        "required": false,
        "editable": true
      },      
      {
        "name": "slope", 
        "title": "slope",
        "description": "slope",
        "type": "list",
        "renderer": "dyn-list-single-selector", 
        "values": [
            {"name":"10280", "title": "Rising"},
            {"name":"10171", "title": "Falling"}           
        ],
        "editable": true,
        "required": true        
      }
    ]
  },"TriggerType":{    
    "name": "TriggerType",
    "title": "TriggerType",
    "listTitle": "Opções Trigger Type",
    "idField": "id",
    "editable": true,
    "removable": true,
    "creatable": true,
    "parent": true,
    
    "layoutConfiguration": {
      "layout": "vertical",
      "size": "large",
     
      "groups": {
        "default": {
          "layout": "vertical", "size": "large"
        }
      } 
    },
    "fields": [     
      {
        "name": "id",
        "title": "Id",
        "type": "text",
        "renderer": "dyn-input",
        "hideFromForm": true,
        "hideFromList": true,
        "required": true,
        "editable": false
      },    
      {
        "name": "TriggerType", 
        "title": "TriggerType",
        "description": "TriggerType",
        "type": "list",
        "renderer": "dyn-list-single-selector", 
        "values": [
            {"name":"0", "title": "Imediate", "nameForm":"Imediate"},
            {"name":"1", "title": "AnalogEdge", "nameForm":"AnalogEdge"},           
            {"name":"2", "title": "AnalogWindow", "nameForm":"AnalogWindow"},
            {"name":"3", "title": "DigitalEdge", "nameForm":"DigitalEdge"},
            {"name":"4", "title": "DigitalPattern", "nameForm":"DigitalPattern"}
        ],
        "editable": true,
        "required": true        
      }
    ]
  },"AnalogEdge":{    
    "name": "AnalogEdge",
    "title": "1",
    "listTitle": "Opções Analog Edge",
    "idField": "id",
    "editable": true,
    "removable": true,
    "creatable": true,
    "parent": "TriggerType",
    
    "layoutConfiguration": {
      "layout": "horizontal",
      "size": "medium",
     
      "groups": {
        "default": {
          "layout": "vertical", "size": "medium"
        }
      } 
    },
    "fields": [     
      {
        "name": "id",
        "title": "Id",
        "type": "text",
        "renderer": "dyn-input",
        "hideFromForm": true,
        "hideFromList": true,
        "required": true,
        "editable": false
      },
      {
        "name": "source",
        "title": "source",
        "description": "source",
        "type": "text",
        "renderer": "dyn-input",
        "required": true,
        "editable": false
      },
      {
        "name": "level",
        "title": "level",
        "description": "level",
        "type": "number",
        "validation":{
          "isInteger":true,
          "range":{
          "min":"0",
          "max":"99"
          }
        },
        "renderer": "dyn-input",
        "required": false,
        "editable": true
      },      
      {
        "name": "slope", 
        "title": "slope",
        "description": "slope",
        "type": "list",
        "renderer": "dyn-list-single-selector", 
        "values": [
            {"name":"10280", "title": "Rising"},
            {"name":"10171", "title": "Falling"}           
        ],
        "editable": true,
        "required": true        
      }
    ]
  },"AnalogWindow":{    
    "name": "AnalogWindow",
    "title": "2",
    "listTitle": "Opções Analog Window",
    "idField": "id",
    "editable": true,
    "removable": true,
    "creatable": true,
    "parent": "TriggerType",
    
    "layoutConfiguration": {
      "layout": "vertical",
      "size": "medium",
     
      "groups": {
        "default": {
          "layout": "vertical", "size": "medium"
        }
      } 
    },
    "fields": [     
      {
        "name": "id",
        "title": "Id",
        "type": "text",
        "renderer": "dyn-input",
        "hideFromForm": true,
        "hideFromList": true,
        "required": true,
        "editable": false
      }, 
      {
        "name": "source",
        "title": "source",
        "description": "source",
        "type": "text",
        "renderer": "dyn-input",
        "required": true,
        "editable": false
      }, 
      {
        "name": "when", 
        "title": "when",
        "description": "when",
        "type": "list",
        "renderer": "dyn-list-single-selector", 
        "values": [
            {"name":"10163", "title": "Entering Window"},
            {"name":"10208", "title": "Leaving Window"}           
        ],
        "editable": true,
        "required": true        
      },
      {
        "name": "windowTop",
        "title": "windowTop",
        "description": "windowTop",
        "type": "number",
        "validation":{
          "isInteger":true,
          "range":{
          "min":"0",
          "max":"99"
          }
        },
        "renderer": "dyn-input",
        "required": false,
        "editable": true
      },
      {
        "name": "windowBottom",
        "title": "windowBottom",
        "description": "windowBottom",
        "type": "number",
        "validation":{
          "isInteger":true,
          "range":{
          "min":"0",
          "max":"99"
          }
        },
        "renderer": "dyn-input",
        "required": false,
        "editable": true
      }  
    ]
  },"DigitalEdge":{
    "name": "DigitalEdge",
    "title": "3",
    "listTitle": "Opções Digital Edge",
    "idField": "id",
    "editable": true,
    "removable": true,
    "creatable": true,
    "parent": "TriggerType",
    
    "layoutConfiguration": {
      "layout": "vertical",
      "size": "medium",
     
      "groups": {
        "default": {
          "layout": "vertical", "size": "medium"
        }
      } 
    },
    "fields": [     
      {
        "name": "id",
        "title": "Id",
        "type": "text",
        "renderer": "dyn-input",
        "hideFromForm": true,
        "hideFromList": true,
        "required": true,
        "editable": false
      },
      {
        "name": "source",
        "title": "source",
        "description": "source",
        "type": "text",
        "renderer": "dyn-input",
        "required": true,
        "editable": false
      },
      {
        "name": "edge", 
        "title": "edge",
        "description": "edge",
        "type": "list",
        "renderer": "dyn-list-single-selector", 
        "values": [
            {"name":"10280", "title": "Rising"},
            {"name":"10171", "title": "Falling"}           
        ],
        "editable": true,
        "required": true        
      }
    ]
  },"DigitalPattern":{
    "name": "DigitalPattern",
    "title": "4",
    "listTitle": "Opções Digital Pattern",
    "idField": "id",
    "editable": true,
    "removable": true,
    "creatable": true,
    "parent": "TriggerType",
    
    "layoutConfiguration": {
      "layout": "vertical",
      "size": "medium",
     
      "groups": {
        "default": {
          "layout": "vertical", "size": "medium"
        }
      } 
    },
    "fields": [     
      {
        "name": "id",
        "title": "Id",
        "type": "text",
        "renderer": "dyn-input",
        "hideFromForm": true,
        "hideFromList": true,
        "required": true,
        "editable": false
      },
      {
        "name": "source",
        "title": "source",
        "description": "source",
        "type": "text",
        "renderer": "dyn-input",
        "required": true,
        "editable": false
      },
      {
        "name": "pattern",
        "title": "pattern",
        "description": "pattern",
        "type": "text",
        "renderer": "dyn-input",
        "required": true,
        "editable": false
      },
      {
        "name": "triggerWhen", 
        "title": "triggerWhen",
        "description": "triggerWhen",
        "type": "list",
        "renderer": "dyn-list-single-selector", 
        "values": [
            {"name":"10254", "title": "Pattern Matches"},
            {"name":"10253", "title": "Pattern Does Not Match"}           
        ],
        "editable": true,
        "required": true        
      }
    ]  
  },"Temperature":{
    "name": "Temperature",
    "title": "Temperature",
    "listTitle": "Temperature",
    "idField": "id",
    "editable": true,
    "removable": true,
    "creatable": true,
    "parent": "measurementType",
    
    "layoutConfiguration": {
      "layout": "horizontal",
      "size": "large",
     
      "groups": {
        "default": {
          "layout": "vertical", "size": "large"
        },
        "temperature": {
          "layout": "vertical", "size": "large"
        }        
      } 
    },
    "fields": [
      {
        "name": "rtdType", 
        "title": "rtdType",
        "description": "rtdType",
        "type": "list",
        "renderer": "dyn-list-single-selector", 
        "values": [
            {"name":"12481", "title": "Pt3750"},
            {"name":"10071", "title": "Pt3851"}, 
            {"name":"12482", "title": "Pt3911"},
            {"name":"10069", "title": "Pt3916"}, 
            {"name":"10053", "title": "Pt3920"}, 
            {"name":"12483", "title": "Pt3928"},
            {"name":"10137", "title": "Custom"}                 
        ],
        "editable": true,
        "required": true,
        "group":"temperature"       
      },
      {
        "name": "ro",
        "title": "ro",
        "description": "ro",
        "type": "text",
        "renderer": "dyn-input",
        "required": true,
        "editable": false,
        "group":"temperature"               
      },
      {
        "name": "unit", 
        "title": "unit",
        "description": "unit",
        "type": "list",
        "renderer": "dyn-list-single-selector", 
        "values": [
            {"name":"10143", "title": "deg C"},
            {"name":"10144", "title": "deg F"}, 
            {"name":"10325", "title": "Kelvins"},
            {"name":"10145", "title": "deg R"}, 
            {"name":"10065", "title": "From Custom Scale"}              
        ],
        "editable": true,
        "required": true,
        "group":"temperature"                       
      },
      {
        "name": "a",
        "title": "a",
        "description": "a",
        "type": "text",
        "renderer": "dyn-input",
        "required": true,
        "editable": false
      },
      {
        "name": "b",
        "title": "b",
        "description": "b",
        "type": "text",
        "renderer": "dyn-input",
        "required": true,
        "editable": false 
      },
      {
        "name": "c",
        "title": "c",
        "description": "c",
        "type": "text",
        "renderer": "dyn-input",
        "required": true,
        "editable": false 
      }
    ]
  },"Resistence":{
  "name": "Resistence",
  "title": "Resistence",
  "listTitle": "Painel ChannelList Resistence",
  "idField": "id",
  "editable": true,
  "removable": true,
  "creatable": true,
  
  "layoutConfiguration": {
    "layout": "vertical",
    "size": "medium",
   
    "groups": {
      "default": {
        "layout": "vertical", "size": "medium"
      },
      "resistence":{
        "layout":"vertical","size":"small"
      }
    } 
  },
  "fields": [     
    {
      "name": "id",
      "title": "Id",
      "type": "text",
      "renderer": "dyn-input",
      "hideFromForm": true,
      "hideFromList": true,
      "required": true,
      "editable": false
    },
    {
      "name": "units", 
      "title": "units",
      "description": "units",
      "type": "list",
      "renderer": "dyn-list-single-selector", 
      "values": [
          {"name":"10384", "title": "Ohms"},
          {"name":"10065", "title": "From Custom Scale"}            
      ],
      "editable": true,
      "required": true,
      "group":"temperature"        
    }
  ]
},"ChannelList":{
    "name": "ChannelList",
    "title": "ChannelList",
    "listTitle": "Channel List",
    "idField": "id",
    "editable": true,
    "removable": true,
    "creatable": true,
    "defaultSort":{
      "fieldName":"deviceName",
      "order":"up"
    }, 
    
    "layoutConfiguration": {
      "layout": "vertical",
      "size": "large",
     
      "groups": {
        "deviceName":{
          "layout": "horizontal", "size": "large"
        },
        "active": {
          "layout": "vertical", "size": "small"
        },          
        "rtdChannel": {
          "layout": "vertical", "size": "small"
        },
        "hardware": {
          "layout": "horizontal", "size": "large"
        },        
        "tedSchannel": {
          "layout": "vertical", "size": "large"
        },                  
        "iepe": {
          "layout": "vertical", "size": "small"
        },
        "scaling": {
          "layout": "horizontal", "size": "large"
        },
        "scaling2": {
          "layout": "vertical", "size": "small"
        },
        "default": {
          "layout": "horizontal", "size": "small"
        }                       
      } 
    },
    "fields": [     
      {
        "name": "id",
        "title": "Id",
        "type": "text",
        "renderer": "dyn-input",
        "hideFromForm": true,
        "hideFromList": true,
        "required": true,
        "editable": false
      },
      {
        "name": "deviceName",
        "title": "deviceName",
        "description": "deviceName",
        "type": "text",
        "renderer": "dyn-input",
        "required": true,
        "editable": false,
        "group" : "deviceName"
      },
      {
        "name": "active",
        "title": "active",
        "description": "active",        
        "type": "toggle",
        "renderer": "dyn-toggle-button",
        "required": true,
        "editable": true,
        "group" : "active"
      },          
      {
        "name": "channelName",
        "title": "channelName",
        "description": "channelName",
        "type": "text",
        "renderer": "dyn-input",
        "required": true,
        "editable": false,
        "group":"rtdChannel"
      },      
      {
        "name": "physicalChannel",
        "title": "physicalChannel",
        "description": "physicalChannel",
        "type": "text",
        "renderer": "dyn-input",
        "required": true,
        "editable": false,
        "group":"rtdChannel"
      },
      {
        "name": "TEDSchannel",
        "title": "TEDSchannel",
        "type": "toggle",
        "renderer": "dyn-toggle-button",
        "required": true,
        "editable": true,
        "group":"tedSchannel"
      },
      {
        "name": "resistanceConfiguration", 
        "title": "resistanceConfiguration",
        "description": "resistanceConfiguration",
        "type": "list",
        "renderer": "dyn-list-single-selector", 
        "values": [
            {"name":"2", "title": "2-Wire"},
            {"name":"3", "title": "3-Wire"}, 
            {"name":"4", "title": "4-Wire"}               
        ],
        "editable": true,
        "required": true,
        "group":"hardware"        
      },
      {
        "name": "currentExcitationSource", 
        "title": "currentExcitationSource",
        "description": "currentExcitationSource",
        "type": "list",
        "renderer": "dyn-list-single-selector", 
        "values": [
            {"name":"10200", "title": "Internal"},
            {"name":"10167", "title": "External"}, 
            {"name":"10230", "title": "None"}               
        ],
        "editable": true,
        "required": true,
        "group":"iepe"        
      },
      {
        "name": "currentExcitationValue",
        "title": "currentExcitationValue",
        "description": "currentExcitationValue",
        "type": "text",
        "renderer": "dyn-input",
        "required": true,
        "editable": false,
        "group":"iepe"
      },      
      {
        "name": "measurementType", 
        "title": "measurementType",
        "description": "measurementType",
        "type": "list",
        "renderer": "dyn-list-single-selector", 
        "values": [
            {"name":"0", "title": "Temperature", "nameForm":"Temperature"},
            {"name":"1", "title": "Resistence", "nameForm":"Resistence"}                      
        ],
        "editable": true,
        "required": true ,
        "group":"scaling"        
      },
      {
        "name": "customScaleName",
        "title": "customScaleName",
        "description": "customScaleName",
        "type": "number",
        "validation":{
          "isInteger":true,
          "range":{
          "min":"0",
          "max":"99"
          }
        },
        "renderer": "dyn-input",
        "required": false,
        "editable": true,
        "group":"scaling2"
      },
      {
        "name": "mininumValue",
        "title": "mininumValue",
        "description": "mininumValue",
        "type": "number",
        "validation":{
          "isInteger":true,
          "range":{
          "min":"0",
          "max":"99"
          }
        },
        "renderer": "dyn-input",
        "required": false,
        "editable": true,
        "group":"scaling2"
      },
      {
        "name": "maximumValue",
        "title": "maximumValue",
        "description": "maximumValue",
        "type": "number",
        "validation":{
          "isInteger":true,
          "range":{
          "min":"0",
          "max":"99"
          }
        },
        "renderer": "dyn-input",
        "required": false,
        "editable": true,
        "group":"scaling2"
      }
    ]    
  }
}`;

/*,
      {
        "name": "rtdType", 
        "title": "rtdType",
        "description": "rtdType",
        "type": "list",
        "renderer": "dyn-list-single-selector", 
        "values": [
            {"name":"12481", "title": "Pt3750"},
            {"name":"10071", "title": "Pt3851"}, 
            {"name":"12482", "title": "Pt3911"},
            {"name":"10069", "title": "Pt3916"}, 
            {"name":"10053", "title": "Pt3920"}, 
            {"name":"12483", "title": "Pt3928"},
            {"name":"10137", "title": "Custom"}                 
        ],
        "editable": true,
        "required": true,
        "group":"temperature"        
      },
      {
        "name": "ro",
        "title": "ro",
        "description": "ro",
        "type": "text",
        "renderer": "dyn-input",
        "required": true,
        "editable": false,
        "group":"temperature" 
      },
      {
        "name": "unit", 
        "title": "unit",
        "description": "unit",
        "type": "list",
        "renderer": "dyn-list-single-selector", 
        "values": [
            {"name":"10143", "title": "deg C"},
            {"name":"10144", "title": "deg F"}, 
            {"name":"10325", "title": "Kelvins"},
            {"name":"10145", "title": "deg R"}, 
            {"name":"10065", "title": "From Custom Scale"}              
        ],
        "editable": true,
        "required": true,
        "group":"temperature"        
      },
      {
        "name": "a",
        "title": "a",
        "description": "a",
        "type": "text",
        "renderer": "dyn-input",
        "required": true,
        "editable": false,
        "group":"channelcustomRTD" 
      },
      {
        "name": "b",
        "title": "b",
        "description": "b",
        "type": "text",
        "renderer": "dyn-input",
        "required": true,
        "editable": false,
        "group":"channelcustomRTD" 
      },
      {
        "name": "c",
        "title": "c",
        "description": "c",
        "type": "text",
        "renderer": "dyn-input",
        "required": true,
        "editable": false,
        "group":"channelcustomRTD" 
      },
      {
        "name": "units", 
        "title": "units",
        "description": "units",
        "type": "list",
        "renderer": "dyn-list-single-selector", 
        "values": [
            {"name":"10384", "title": "Ohms"},
            {"name":"10065", "title": "From Custom Scale"}            
        ],
        "editable": true,
        "required": true,
        "group":"resistence"        
      }    */ 

/*
export const modelChannelListResistence4357 =  `{
  "name": "channelresistence4357",
  "title": "channelresistence",
  "listTitle": "Painel ChannelList Resistence",
  "idField": "id",
  "editable": true,
  "removable": true,
  "creatable": true,
  
  "layoutConfiguration": {
    "layout": "vertical",
    "size": "medium",
   
    "groups": {
      "default": {
        "layout": "vertical", "size": "medium"
      },
      "resistence":{
        "layout":"vertical","size":"small"
      }
    } 
  },
  "fields": [     
    {
      "name": "id",
      "title": "Id",
      "type": "text",
      "renderer": "dyn-input",
      "hideFromForm": true,
      "hideFromList": true,
      "required": true,
      "editable": false
    },
    {
      "name": "units", 
      "title": "units",
      "description": "units",
      "type": "list",
      "renderer": "dyn-list-single-selector", 
      "values": [
          {"name":"10384", "title": "Ohms"},
          {"name":"10065", "title": "From Custom Scale"}            
      ],
      "editable": true,
      "required": true,
      "group":"temperature"        
    }
  ]
}`;*/

 /* export const modelAnalogWindow = `{
    "name": "2",
    "title": "analogWindow",
    "listTitle": "Opções Analog Window",
    "idField": "id",
    "editable": true,
    "removable": true,
    "creatable": true,
    
    "layoutConfiguration": {
      "layout": "vertical",
      "size": "small",
     
      "groups": {
        "default": {
          "layout": "vertical", "size": "small"
        }
      } 
    },
    "fields": [     
      {
        "name": "id",
        "title": "Id",
        "type": "text",
        "renderer": "dyn-input",
        "hideFromForm": true,
        "hideFromList": true,
        "required": true,
        "editable": false
      },  
      {
        "name": "when", 
        "title": "when",
        "description": "when",
        "type": "list",
        "renderer": "dyn-list-single-selector", 
        "values": [
            {"name":"10163", "title": "Entering Window"},
            {"name":"10208", "title": "Leaving Window"}           
        ],
        "editable": true,
        "required": true        
      },
      {
        "name": "windowTop",
        "title": "windowTop",
        "description": "windowTop",
        "type": "number",
        "validation":{
          "isInteger":true,
          "range":{
          "min":"0",
          "max":"99"
          }
        },
        "renderer": "dyn-input",
        "required": false,
        "editable": true
      },
      {
        "name": "windowBottom",
        "title": "windowBottom",
        "description": "windowBottom",
        "type": "number",
        "validation":{
          "isInteger":true,
          "range":{
          "min":"0",
          "max":"99"
          }
        },
        "renderer": "dyn-input",
        "required": false,
        "editable": true
      }  
    ]
  }`;
*/