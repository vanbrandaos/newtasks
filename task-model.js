export const modelHorizontal =JSON.stringify({
"Tasks":{
    "name": "Tasks",
       "title": "Tasks",
       "listTitle": "Lista de Tasks",
       "idField": "uuid",
       
       "uniques":[],
       "dependents":["TriggerConf"],
       "editable": false,
       "removable": false,
       "creatable": true,
       "searchHidden":false,
       "configurable": true,
       "info":false,            
       "layoutConfiguration": {
         "layout": "vertical",
         "size": "large",
        
         "groups": {
           "default": {
             "layout": "horizontal", "size": "large"
           },
           "task": {
            "layout": "horizontal", "size": "small"
          },
          "trigger": {
            "layout": "horizontal", "size": "small"
          }
         } 
       },
       "views":{
        "default": {
          "groups": ["default","task","trigger"],
          "next":{
            "action":"submitall",
            "destination": "url-remove"
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
           "group":"task"
         },
         {
           "name": "uuid",
           "title": "Uuid",               
           "type": "text",
           "renderer": "dyn-input",
           "hideFromForm":true,
           "hideFromList":true,
           "required": true,
           "editable": false,
           "group":"task"
         },
         {
          "name": "name",
          "title": "name",
          "description": "name",
          "type": "text",
          "hideFromForm":true,
          "hideFromList":true,
          "renderer": "dyn-input",
          "required": true,
          "editable": false,
          "group":"task"
        },
        {
          "name": "title",
          "title": "Título",
          "description": "Título",
          "type": "text",
          "hideFromForm":false,
          "hideFromList":false,
          "renderer": "dyn-input",
          "required": true,
          "editable": false,          
          "group":"task"            
        },
        {
          "name": "description",
          "title": "Descrição",
          "description": "description",
          "type": "text",
          "hideFromForm":false,
          "hideFromList":false,
          "renderer": "dyn-input",          
          "required": true,
          "editable": false,
          "group":"task" 
        },
        {
          "name": "rate",
          "title": "rate",
          "description": "rate",
          "type": "text",
          "hideFromForm":false,
          "hideFromList":false,
          "renderer": "dyn-input",
          "required": false,
          "editable": true,
          "group":"task" 
        }, 
        {
          "name": "numberOfSamples",
          "title": "numberOfSamples",
          "description":"numberOfSamples",
          "type": "number",     
          "hideFromForm":false,
          "hideFromList":false,             
          "renderer": "dyn-input",
          "required": false,
          "editable": true,
          "group":"task" 
        },
        {
          "name": "sampleMode",
          "title": "sampleMode",
          "type": "list",
          "hideFromForm":false,
          "hideFromList":false,             
          "renderer": "dyn-list-single-selector",
          "multValue" : false,
          "editable": true,
          "required": true,
          "values":[
            {"name":"10178","title":"Finite Samples"},
            {"name":"10123","title":"Continuous Samples"},
            {"name":"12522","title":"Hardware Timed Single Point"}
          ],
          "group":"task" 
        },          
        {
          "name": "fetchTimeout",
          "title": "fetchTimeout(s)",
          "description":"fetchTimeout(s)",
          "type": "number",
          "hideFromForm":false,
          "hideFromList":false,          
          "renderer": "dyn-input",
          "required": false,
          "editable": true   ,
          "group":"task"   
        },               
        /*{
        "name": "triggerType",
        "title": "triggerType",
        "type": "reference",
        "renderer": "dyn-list-multi-selector",
        "target": "TriggerConf",
        "targetField":"trigger",        
        "multValue" : false,
        "editable": false,
        "required": false,
        "hideFromList":false,
        "selectorName":"uuid",
        "selectorTitle":"title",
        "group":"task"
        },*/     
        {
          "name": "triggerType",
          "title": "triggerType",
          "description": "Opções de configuração de trigger",
          "type": "reference",
          "renderer": "dyn-reference-list-multi-selector2",
          "target": "TriggerConf",
          "targetField": "trigger",
          "listDisplay":"title",
          "multValue" : true,
          "editable": true,
          "required": false,
          "hideFromList":false,
          "hideFromForm": false,
          "selectorName":"uuid",
          "selectorTitle":"title",
          "groups": ["task"]
        }           
      ],       
     },    
    "TriggerConf":{
    "name": "TriggerConf",
    "title": "TriggerConf",
    "listTitle": "TriggerConf",
    "entityType":"associationEntity",
    "associationMembers":['trigger'],
    "dependsOn": {"entityName": "Tasks", "fieldName" : "tasksuuid"},    
    "associationMembers":['tasks'],
    "uniques":['tasks'],
    "idField": "uuid",
    "editable": true,
    "removable": true,
    "creatable": true,
    "info":true,   
    "layoutConfiguration": {
    "layout": "horizontal",
    "size": "medium",    
    "groups": {
        "default": {
          "layout": "horizontal", "size": "medium"
        },
        "trigger":{
          "layout":"horizontal","size":"medium"
        }
      } 
    },
    "views":{
      "default": {
        "groups": ["default","trigger"],
        "next":{
          "action":"back",
          "destination": "url-remove"
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
        "name": "uuid",
        "title": "Uuid",               
        "type": "text",
        "renderer": "dyn-input",
        "hideFromForm":true,
        "hideFromList":true,
        "required": true,
        "editable": false
      },  
      {
        "name": "trigger",
        "title": "trigger",
        "description":"trigger",
        "type": "object",        
        "settings": { 
          "entityList" : [
          {"name":"Imediate", "title": "Imediate"},
          {"name": "AnalogEdge", "title": "AnalogEdge"},
          {"name":"AnalogWindow", "title": "AnalogWindow"},
          {"name":"DigitalEdge", "title": "DigitalEdge"},
          {"name":"DigitalPattern", "title": "DigitalPattern"}      
          ]
        },        
        "renderer": "dyn-renderer",
        "required": true,
        "editable": true,
        "group":"trigger"
      },
      {
        "name": "title",
        "title": "title",
        "description": "title",
        "type": "computed",
        "formationRules":[
          {"fieldName":"trigger", "displayValue":"title"}          
        ],
        "renderer": "dyn-input",
        "hideFromForm":true,        
        "required": true,
        "editable": false,
        "group":"trigger"
      },
      {
        "name": "tasksuuid",
        "title": "Tasks",
        "type": "associationMaster",
        "renderer": "dyn-input",
        "target": "Tasks",
        "hideFromList":false,          
        "hideFromForm":false,           
        "multValue" : false,
        "editable": false,
        "required": true,
        "readOnly":true,
        "hideFromList":false,
        "selectorName":"uuid",
        "selectorTitle":"title",                  
        "groups": ["trigger"] 
      }, 
    ]
  },"AnalogEdge":{    
    "name": "AnalogEdge",
    "title": "AnalogEdge",
    "listTitle": "Opções Analog Edge",
    "dependsOn": {"entityName": "TriggerConf", "fieldName" : "uuidkey"},    
    "idField": "uuid",
    "editable": true,
    "removable": true,
    "creatable": true,        
    "layoutConfiguration": {
      "layout": "horizontal",
      "size": "medium",
     
      "groups": {
        "default": {
          "layout": "vertical", "size": "medium"
        }
      } 
    },
    "views":{
      "default": {
        "groups": ["default"],
        "next":{
          "action":"back",
          "destination": "url-remove"
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
        "name": "uuid",
        "title": "Uuid",               
        "type": "text",
        "renderer": "dyn-input",
        "hideFromForm":true,
        "hideFromList":true,
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
        "editable": true
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
      },
      {
        "name": "uuidkey",
        "title": "uuidkey",         
        "type": "text",
        "renderer": "dyn-input",
        "target":"TriggerConf",  
        "hideFromList":false,          
        "hideFromForm":false,          
        "multValue" : false,
        "required": true,          
        "editable": false,
        "readOnly": true,  
        "selectorName":"uuid",
        "selectorTitle":"title"               
      }
    ]
  },"AnalogWindow":{    
    "name": "AnalogWindow",
    "title": "AnalogWindow",
    "listTitle": "Opções Analog Window",
    "dependsOn": {"entityName": "TriggerConf", "fieldName" : "uuidkey"},   
    "idField": "uuid",
    "editable": true,
    "removable": true,
    "creatable": true,
    
    "layoutConfiguration": {
      "layout": "vertical",
      "size": "medium",
     
      "groups": {
        "default": {
          "layout": "vertical", "size": "medium"
        }
      } 
    },
    "views":{
      "default": {
        "groups": ["default"],
        "next":{
          "action":"back",
          "destination": "url-remove"
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
        "name": "uuid",
        "title": "Uuid",               
        "type": "text",
        "renderer": "dyn-input",
        "hideFromForm":true,
        "hideFromList":true,
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
        "editable": true
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
      },
      {
        "name": "uuidkey",
        "title": "uuidkey",         
        "type": "text",
        "renderer": "dyn-input",
        "target":"TriggerConf",  
        "hideFromList":false,          
        "hideFromForm":false,          
        "multValue" : false,
        "required": true,          
        "editable": false,
        "readOnly": true,  
        "selectorName":"uuid",
        "selectorTitle":"title"               
      }  
    ]
  },"DigitalEdge":{
    "name": "DigitalEdge",
    "title": "DigitalEdge",
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
    "views":{
      "default": {
        "groups": ["default"],
        "next":{
          "action":"back",
          "destination": "url-remove"
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
        "name": "uuid",
        "title": "Uuid",               
        "type": "text",
        "renderer": "dyn-input",
        "hideFromForm":true,
        "hideFromList":true,
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
    "title": "DigitalPattern",
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
    "views":{
      "default": {
        "groups": ["default"],
        "next":{
          "action":"back",
          "destination": "url-remove"
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
        "name": "uuid",
        "title": "Uuid",               
        "type": "text",
        "renderer": "dyn-input",
        "hideFromForm":true,
        "hideFromList":true,
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
  },
  "Modulos":{
 "name": "Modulos",
    "title": "Modulos",
    "listTitle": "Lista de Módulos",
    "idField": "uuid",
    "uniques":[],
    "editable": false,
    "removable": false,
    "creatable": true,
    "searchHidden":false,
    "configurable": true,
    "info":false,     
    
    "layoutConfiguration": {
      "layout": "vertical",
      "size": "large",
     
      "groups": {
        "default": {
          "layout": "vertical", "size": "large"
        }
      } 
    },
    "views":{
      "default": {
        "groups": ["default"],
        "next":{
          "action":"submit",
          "destination": "url-remove"
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
        "name": "uuid",
        "title": "Uuid",
        "type": "text",
        "renderer": "dyn-input",
        "hideFromForm": true,
        "hideFromList": true,
        "required": true,
        "editable": false
      },         
      {
        "name": "name",
        "title": "Nome",
        "description": "name",
        "type": "text",
        "renderer": "dyn-input",    
        "hideFromForm": false,
        "hideFromList": false,    
        "required": true,
        "editable": false
      },    
      {
        "name": "type",
        "title": "Tipo",
        "description": "type",
        "type": "text",
        "renderer": "dyn-input", 
        "hideFromForm": false,
        "hideFromList": false,      
        "required": true,
        "editable": false
      },    
      {
        "name": "slot",
        "title": "Slot",
        "description": "slot",
        "type": "text",
        "renderer": "dyn-input",   
        "hideFromForm": false,
        "hideFromList": false,     
        "required": true,
        "editable": false
      }
    ]
  },
  "ChannelList4357":{   
    "name": "ChannelList4357",
    "title": "ChannelList",
    "listTitle": "Channel List",
    "idField": "uuid",
    "uniques":[],
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
    "views":{
      "default": {
        "groups": ["default"],
        "next":{
          "action":"submit",
          "destination": "url-remove"
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
        "name": "uuid",
        "title": "Uuid",
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
        "hideFromForm": false,
        "hideFromList": false,   
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
        "hideFromForm": false,
        "hideFromList": false,   
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
        "hideFromForm": false,
        "hideFromList": false,   
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
        "hideFromForm": false,
        "hideFromList": false,   
        "required": true,
        "editable": false,
        "group":"rtdChannel"
      },
      {
        "name": "TEDSchannel",
        "title": "TEDSchannel",
        "type": "toggle",
        "renderer": "dyn-toggle-button",
        "hideFromForm": false,
        "hideFromList": false,   
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
        "hideFromForm": false,
        "hideFromList": true,   
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
        "hideFromForm": false,
        "hideFromList": true,         
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
        "hideFromForm": false,
        "hideFromList": true,         
        "required": true,
        "editable": false,
        "group":"iepe"
      },      
      {
        "name": "measurementType",
        "title": "measurementType",
        "type": "reference",
        "renderer": "dyn-list-multi-selector",
        "target": "measurementTypeConfig4357",
        "multValue" : false,
        "editable": false,
        "required": true,
        "hideFromList":false,
        "selectorName":"uuid",
        "selectorTitle":"title",
        "group":"scaling"
      }
    ]    
  },"measurementTypeConfig4357":{
    "name": "measurementTypeConfig4357",
    "title": "measurementTypeConfig",
    "listTitle": "measurementTypeConfig",
    "idField": "uuid",
    "uniques":[],
    "editable": true,
    "removable": true,
    "creatable": true,
    "info":true,   
    "layoutConfiguration": {
    "layout": "horizontal",
    "size": "medium",    
    "groups": {
        "default": {
          "layout": "horizontal", "size": "medium"
        },
        "measurementType":{
          "layout":"horizontal","size":"medium"
        }
      } 
    },
    "views":{
      "default": {
        "groups": ["default"],
        "next":{
          "action":"submit",
          "destination": "url-remove"
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
        "name": "uuid",
        "title": "Uuid",               
        "type": "text",
        "renderer": "dyn-input",
        "hideFromForm":true,
        "hideFromList":true,
        "required": true,
        "editable": false
      },  
      {
        "name": "measurementType",
        "title": "measurementType",
        "description":"measurementType",
        "type": "object",        
        "settings": { 
          "entityList" : [
          {"name":"Temperature", "title": "Temperature", "nameForm":"Temperature"},
          {"name":"Resistence", "title": "Resistence", "nameForm":"Resistence"}            
          ]
        },        
        "renderer": "dyn-renderer",
        "required": true,
        "editable": true,
        "group":"measurementType"
      },
      {
        "name": "title",
        "title": "title",
        "description": "title",
        "type": "computed",
        "formationRules":[
          {"fieldName":"measurementType", "displayValue":"title"}          
        ],
        "renderer": "dyn-input",
        "hideFromForm":true,        
        "required": true,
        "editable": false,
        "group":"measurementType"
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
        "hideFromForm": false,
        "hideFromList": true,         
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
        "hideFromForm": false,
        "hideFromList": true,         
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
        "hideFromForm": false,
        "hideFromList": true,         
        "required": false,
        "editable": true,
        "group":"scaling2"
      }
    ]
  },
  "Temperature":{
    "name": "Temperature",
    "title": "Temperature",
    "listTitle": "Temperature",
    "idField": "uuid",
    "uniques":[],
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
    "views":{
      "default": {
        "groups": ["default"],
        "next":{
          "action":"submit",
          "destination": "url-remove"
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
        "name": "uuid",
        "title": "uuId",
        "type": "text",
        "renderer": "dyn-input",
        "hideFromForm": true,
        "hideFromList": true,
        "required": true,
        "editable": false
      },
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
  "idField": "uuid",
  "uniques":[],
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
  "views":{
    "default": {
      "groups": ["default"],
      "next":{
        "action":"submit",
        "destination": "url-remove"
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
      "name": "uuid",
      "title": "uuId",
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
},"ChannelList4497":{   
  "name": "ChannelList4497",
  "title": "ChannelList",
  "listTitle": "Channel List",
  "idField": "uuid",
  "uniques":[],
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
  "views":{
    "default": {
      "groups": ["default"],
      "next":{
        "action":"submit",
        "destination": "url-remove"
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
      "name": "uuid",
      "title": "Uuid",
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
      "hideFromForm": false,
      "hideFromList": false,   
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
      "hideFromForm": false,
      "hideFromList": false,   
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
      "hideFromForm": false,
      "hideFromList": false,   
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
      "hideFromForm": false,
      "hideFromList": false,   
      "required": true,
      "editable": false,
      "group":"rtdChannel"
    },
    {
      "name": "TEDSchannel",
      "title": "TEDSchannel",
      "type": "toggle",
      "renderer": "dyn-toggle-button",
      "hideFromForm": false,
      "hideFromList": false,   
      "required": true,
      "editable": true,
      "group":"tedSchannel"
    },
    {
      "name": "coupling", 
      "title": "coupling",
      "description": "coupling",
      "type": "list",
      "renderer": "dyn-list-single-selector", 
      "hideFromForm": false,
      "hideFromList": true,   
      "values": [
          {"name":"10045", "title": "AC"},
          {"name":"10050", "title": "DC"}, 
          {"name":"10066", "title": "GND"}               
      ],
      "editable": true,
      "required": true,
      "group":"hardware"        
    },
    {
      "name": "inputTerminalConfiguration", 
      "title": "inputTerminalConfiguration",
      "description": "inputTerminalConfiguration",
      "type": "list",
      "renderer": "dyn-list-single-selector", 
      "hideFromForm": false,
      "hideFromList": true,   
      "values": [
          {"name":"-1", "title": "default"},
          {"name":"10083", "title": "RSE"},
          {"name":"10078", "title": "NRSE"}, 
          {"name":"10106", "title": "Differential"},
          {"name":"12529", "title": "Pseudodifferential"}                              
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
      "hideFromForm": false,
      "hideFromList": true,         
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
      "hideFromForm": false,
      "hideFromList": true,         
      "required": true,
      "editable": false,
      "group":"iepe"
    },      
    {
      "name": "measurementType",
      "title": "measurementType",
      "type": "reference",
      "renderer": "dyn-list-multi-selector",
      "target": "measurementTypeConfig4497",
      "multValue" : false,
      "editable": false,
      "required": true,
      "hideFromList":false,
      "selectorName":"uuid",
      "selectorTitle":"title",
      "group":"scaling"
    }
  ]    
},
"measurementTypeConfig4497":{
  "name": "measurementTypeConfig4497",
  "title": "measurementTypeConfig",
  "listTitle": "measurementTypeConfig",
  "idField": "uuid",
  "uniques":[],
  "editable": true,
  "removable": true,
  "creatable": true,
  "info":true,   
  "layoutConfiguration": {
  "layout": "horizontal",
  "size": "medium",    
  "groups": {
      "default": {
        "layout": "horizontal", "size": "medium"
      },
      "measurementType":{
        "layout":"horizontal","size":"medium"
      }
    } 
  },
  "views":{
    "default": {
      "groups": ["default"],
      "next":{
        "action":"submit",
        "destination": "url-remove"
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
      "name": "uuid",
      "title": "Uuid",               
      "type": "text",
      "renderer": "dyn-input",
      "hideFromForm":true,
      "hideFromList":true,
      "required": true,
      "editable": false
    },  
    {
      "name": "measurementType",
      "title": "measurementType",
      "description":"measurementType",
      "type": "object",        
      "settings": { 
        "entityList" : [
        {"name":"Volts", "title": "Volts"},
        {"name":"Acceleration", "title": "Acceleration"},            
        {"name":"SoundPressure", "title": "SoundPressure"},        
        {"name":"Velocity", "title": "Velocity"},
        {"name":"Force", "title": "Force"}        
      ]
      },        
      "renderer": "dyn-renderer",
      "required": true,
      "editable": true,
      "group":"measurementType"
    },
    {
      "name": "title",
      "title": "title",
      "description": "title",
      "type": "computed",
      "formationRules":[
        {"fieldName":"measurementType", "displayValue":"title"}          
      ],
      "renderer": "dyn-input",
      "hideFromForm":true,        
      "required": true,
      "editable": false,
      "group":"measurementType"
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
      "hideFromForm": false,
      "hideFromList": true,         
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
      "hideFromForm": false,
      "hideFromList": true,         
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
      "hideFromForm": false,
      "hideFromList": true,         
      "required": false,
      "editable": true,
      "group":"scaling2"
    },
    {
      "name": "sensitivity",
      "title": "sensitivity",
      "description": "sensitivity",
      "type": "number",
      "validation":{
        "isInteger":true,
        "range":{
        "min":"0",
        "max":"99"
        }
      },
      "renderer": "dyn-input",
      "hideFromForm": false,
      "hideFromList": true,         
      "required": false,
      "editable": true,
      "group":"scaling2"
    },
    {
      "name": "dbReference",
      "title": "dbReference",
      "description": "dbReference",
      "type": "number",
      "validation":{
        "isInteger":true,
        "range":{
        "min":"0",
        "max":"99"
        }
      },
      "renderer": "dyn-input",
      "hideFromForm": false,
      "hideFromList": true,         
      "required": false,
      "editable": true,
      "group":"scaling2"
    }
  ]
},
"Volts":{
  "name": "Volts",
  "title": "Volts",
  "listTitle": "Volts",
  "idField": "uuid",
  "uniques":[],
  "editable": true,
  "removable": true,
  "creatable": true,
  
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
  "views":{
    "default": {
      "groups": ["default"],
      "next":{
        "action":"submit",
        "destination": "url-remove"
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
      "name": "uuid",
      "title": "uuId",
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
          {"name":"10348", "title": "Volts"},
          {"name":"10065", "title": "From Custom Scale"}            
      ],
      "editable": true,
      "required": true     
    }
  ]
},
"Acceleration":{
  "name": "Acceleration",
  "title": "Acceleration",
  "listTitle": "Acceleration",
  "idField": "uuid",
  "uniques":[],
  "editable": true,
  "removable": true,
  "creatable": true,
  
  "layoutConfiguration": {
    "layout": "horizontal",
    "size": "large",
   
    "groups": {
      "default": {
        "layout": "vertical", "size": "large"
      },
      "acceleration": {
        "layout": "vertical", "size": "large"
      }        
    } 
  },
  "views":{
    "default": {
      "groups": ["default"],
      "next":{
        "action":"submit",
        "destination": "url-remove"
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
      "name": "uuid",
      "title": "uuId",
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
          {"name":"10186", "title": "g"},
          {"name":"12470", "title": "m/s^2"},          
          {"name":"10065", "title": "From Custom Scale"}            
      ],
      "editable": true,
      "required": true     
    },
    {
      "name": "sensitivityUnits", 
      "title": "sensitivityUnits",
      "description": "sensitivityUnits",
      "type": "list",
      "renderer": "dyn-list-single-selector", 
      "values": [
          {"name":"12509", "title": "mVolts/g"},
          {"name":"12510", "title": "Volts/g"}          
      ],
      "editable": true,
      "required": true     
    }
  ]
},
"SoundPressure":{
  "name": "SoundPressure",
  "title": "SoundPressure",
  "listTitle": "SoundPressure",
  "idField": "uuid",
  "uniques":[],
  "editable": true,
  "removable": true,
  "creatable": true,
  
  "layoutConfiguration": {
    "layout": "horizontal",
    "size": "large",
   
    "groups": {
      "default": {
        "layout": "vertical", "size": "large"
      },
      "acceleration": {
        "layout": "vertical", "size": "large"
      }        
    } 
  },
  "views":{
    "default": {
      "groups": ["default"],
      "next":{
        "action":"submit",
        "destination": "url-remove"
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
      "name": "uuid",
      "title": "uuId",
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
          {"name":"10081", "title": "Pascals"},         
          {"name":"10065", "title": "From Custom Scale"}            
      ],
      "editable": true,
      "required": true     
    }
  ]
},
"Velocity":{
  "name": "Velocity",
  "title": "Velocity",
  "listTitle": "Velocity",
  "idField": "uuid",
  "uniques":[],
  "editable": true,
  "removable": true,
  "creatable": true,
  
  "layoutConfiguration": {
    "layout": "horizontal",
    "size": "large",
   
    "groups": {
      "default": {
        "layout": "vertical", "size": "large"
      },
      "acceleration": {
        "layout": "vertical", "size": "large"
      }        
    } 
  },
  "views":{
    "default": {
      "groups": ["default"],
      "next":{
        "action":"submit",
        "destination": "url-remove"
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
      "name": "uuid",
      "title": "uuId",
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
          {"name":"15960", "title": "in/s"},         
          {"name":"15959", "title": "rn/s"},                   
          {"name":"10065", "title": "From Custom Scale"}            
      ],
      "editable": true,
      "required": true     
    },
    {
      "name": "sensitivityUnits", 
      "title": "sensitivityUnits",
      "description": "sensitivityUnits",
      "type": "list",
      "renderer": "dyn-list-single-selector", 
      "values": [
          {"name":"15964", "title": "mVolts/in/s"},         
          {"name":"15963", "title": "mVolts/mm/s"}                 
      ],
      "editable": true,
      "required": true     
    }
  ]
},
"Force":{
  "name": "Force",
  "title": "Force",
  "listTitle": "Force",
  "idField": "uuid",
  "uniques":[],
  "editable": true,
  "removable": true,
  "creatable": true,
  
  "layoutConfiguration": {
    "layout": "horizontal",
    "size": "large",
   
    "groups": {
      "default": {
        "layout": "vertical", "size": "large"
      },
      "acceleration": {
        "layout": "vertical", "size": "large"
      }        
    } 
  },
  "views":{
    "default": {
      "groups": ["default"],
      "next":{
        "action":"submit",
        "destination": "url-remove"
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
      "name": "uuid",
      "title": "uuId",
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
          {"name":"15875", "title": "Newtons"},         
          {"name":"15876", "title": "Pounds"},                   
          {"name":"10065", "title": "From Custom Scale"}            
      ],
      "editable": true,
      "required": true     
    },
    {
      "name": "sensitivityUnits", 
      "title": "sensitivityUnits",
      "description": "sensitivityUnits",
      "type": "list",
      "renderer": "dyn-list-single-selector", 
      "values": [
          {"name":"15891", "title": "mVolts/n"},         
          {"name":"15892", "title": "mVolts/lb"}                 
      ],
      "editable": true,
      "required": true     
    }
  ]
}})