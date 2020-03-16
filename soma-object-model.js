export const modelStructure=`{
    "User":{
      "name": "User",
      "title": "Usuário",
      "listTitle": "Usuários",
      "idField": "id",
      "editable": true,
      "removable":true,
      "creatable":false,
      "info":true,
      "defaultSort":{
        "fieldName":"firstName",
        "order":"up"
      },      
      "layoutConfiguration": {
        "layout": "horizontal",
        "size":"medium",
        "groups": {
          "default": {
            "layout": "horizontal", "size": "medium"
          },
          "login":{
            "layout": "horizontal","size" :"medium"
          },
          "horizon":{
            "layout": "horizontal","size" :"medium"
          },
          "passwd":{
            "layout": "horizontal","size" :"medium"
          },
          "roles":{
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
          "editable": false,
          "required": true,
          "hideFromList":true,
          "hideFromForm": true,
          "group": "horizon"
        },        
        {
          "name": "firstName", 
          "title": "Nome",
          "type": "text",         
          "renderer": "dyn-input",
          "editable": true,
          "required": true,
          "group": "horizon",
          "searchable": true
        },
        {
          "name": "lastName",
          "title": "Sobrenome",
          "type": "text",
          "renderer": "dyn-input",
          "editable": true,
          "required": true,
          "group": "name"
        },
        {
          "name": "email",
          "title": "Email",
          "type": "email",
          "renderer": "dyn-input",
          "editable": false,
          "required": true,
          "group": "login"
        },     
        {
          "name": "roles",
          "title": "Grupos",
          "description": "Grupos dos quais esse usuário participa",
          "type": "reference",
          "renderer": "dyn-list-multi-selector",
          "target": "Role",
          "listDisplay":"name",
          "multValue" : true,
          "editable": true,
          "required": true,
          "selectorName":"id",
          "selectorTitle":"title",
          "group": "roles"        
        },
        {
          "name": "status", 
          "title": "Status",
          "description": "Status do usuário",
          "type": "list",
          "renderer": "dyn-list-single-selector", 
          "values": [
              {"name":"ACTIVE", "title": "Ativo"},
              {"name":"PENDING_APPROVAL", "title": "Aguardando aprovação"}, 
              {"name":"INACTIVE", "title": "Inativo"}, 
              {"name":"PENDING_EMAIL", "title":"Aguardando email"}
          ],
          "editable": true,
          "required": true,
          "group": "login"          
        }   
      ]      
    },
    "Role":{
      "name": "Role",
      "title": "Grupo",
      "listTitle": "Perfis de Usuários",
      "idField": "id",
      "editable": true,
      "removable":false,
      "creatable":true,
      "layoutConfiguration": {
        "layout": "horizontal",
        "size":"medium",
        "groups": {
          "default": {
            "layout": "horizontal", "size": "medium"
          },          
          "roles":{
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
          "hideFromForm":true,
          "hideFromList":true,
          "required": true,
          "editable": false
        },
        {
          "name": "name",
          "title": "Nome interno",
          "description": "Nome do grupo interno(único)",
          "type": "text",
          "renderer": "dyn-input",
          "required": true,
          "editable": false 
        },
        {
          "name": "title",
          "title": "Nome",
          "description": "Nome do grupo que será mostrado",
          "type": "text",
          "renderer": "dyn-input",
          "required": true,
          "editable": true
        },
        {
          "name": "description",
          "title": "Descrição",
          "type": "text",
          "renderer": "dyn-input",
          "required": true,
          "editable": true
        }           
      ]
    },
    "Application":{
      "name": "Application",
      "title": "Aplicação",
      "listTitle": "Aplicações",
      "idField": "id",
      "editable": true,
      "removable":true,
      "info":true,
      "dependents":["Feature"],      
      "creatable":true,
      "layoutConfiguration": {
        "layout": "vertical",
        "size":"medium",
        "groups": {
          "default": {
            "layout": "horizontal", "size": "medium"
          },  
          "name": {
            "layout": "horizontal", "size": "medium"
          },        
          "roles":{
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
          "hideFromForm":true,
          "hideFromList":true,
          "required": true,
          "editable": false
        },
        {
          "name": "name",
          "title": "Nome interno",
          "description": "Nome interno da aplicação(único)",
          "type": "text",
          "renderer": "dyn-input",
          "required": true,
          "editable": false          
        },
        {
          "name": "title",
          "title": "Nome",
          "description": "Nome da aplicação que será mostrado",
          "type": "text",
          "renderer": "dyn-input",
          "required": true,
          "editable": true,
          "searchable" : true                
        },
        {
          "name": "description",
          "title": "Descrição",
          "type": "text",
          "renderer": "dyn-input",
          "required": true,
          "editable": true,
          "group": "name" 
        },     
        {
          "name": "roles",
          "title": "Grupos",
          "description": "Grupos que possuem permissão para a aplicação",
          "type": "reference",
          "renderer": "dyn-list-multi-selector",
          "target": "Role",
          "multValue" : true,
          "editable": true,
          "required": false,
          "selectorName":"id",
          "selectorTitle":"title",
          "group": "name"          
        },
        {
          "name": "features",
          "title": "Funcionalidades",
          "description": "Funcionalidades associadas à aplicação",
          "type": "reference",
          "dependent": true,
          "renderer": "dyn-list-multi-selector",
          "target": "Feature",          
          "multValue" : true,
          "editable": true,
          "required": false,
          "selectorName":"id",
          "selectorTitle":"title",
          "group": "name"               
        }         
      ]
    },
    "Feature":{
      "name": "Feature",
      "title": "Funcionalidade",
      "listTitle": "Funcionalidades",     
      "dependsOn": {"entityName": "Application", "fieldName" : "application"},        
      "idField": "id",
      "editable": true,
      "removable":true,
      "creatable":false,
      "layoutConfiguration": {
        "layout": "horizontal",
        "size":"medium",
        "groups": {
          "default": {
            "layout": "horizontal", "size": "medium"
          },          
          "name":{
            "layout": "horizontal","size" :"medium"
          },          
          "roles":{
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
          "hideFromForm":true,
          "hideFromList":true,
          "required": true,
          "editable": false
        },
        {
          "name": "name",
          "title": "Nome interno",
          "description": "Nome interno da funcionalidade(único)",
          "type": "text",
          "renderer": "dyn-input",
          "required": true,
          "editable": false         
        },
        {
          "name": "title",
          "title": "Nome",
          "description": "Nome da funcionalidade que será mostrado",
          "type": "text",
          "renderer": "dyn-input",
          "required": true,
          "editable": true
        },
        {
          "name": "description",
          "title": "Descrição",
          "type": "text",
          "renderer": "dyn-input",
          "required": true,
          "editable": true
        }, 
        {
          "name": "interfaceClass",
          "title": "Classe interface",
          "description": "Nome da classe Java da funcionalidade",
          "type": "text",
          "renderer": "dyn-input",
          "required": true,
          "editable": true
        },  
        {
          "name": "config",
          "title": "Parâmetros de configuração",         
          "type": "text",
          "renderer": "dyn-input",
          "required": true,
          "editable": true
        }, 
        {
          "name": "priority",
          "title": "Prioridade",         
          "type": "number",
          "renderer": "dyn-input",
          "validation":{                  
            "isInteger":true,
            "range":{
              "min":0,
              "max":99
              }            
          },
          "required": true,
          "editable": true
        }, 
        {
          "name": "application",
          "title": "Aplicação",         
          "type": "reference",
          "renderer": "dyn-list-single-selector",
          "target":"Application",            
          "multValue" : false,
          "required": true,          
          "editable": false,
          "readOnly": true,                    
          "group": "roles"                  
        },      
        {
          "name": "roles",
          "title": "Grupos",
          "description": "Grupos que possuem permissão para a funcionalidade",
          "type": "reference",
          "renderer": "dyn-list-multi-selector",
          "target": "Role",
          "multValue" : true,
          "editable": true,
          "required": false,          
          "group": "roles"          
        }             
      ]
    }
  }
  `



