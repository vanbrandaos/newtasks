
import { combineReducers } from "redux";
import {modelHorizontal} from "./task-model.js"  
import { createSomaStore } from "@soma/soma-utils/soma-redux.js";

import { routeActions, routeReducerBuilder } from "@soma/soma-dynamic-common/reducer/route-reducer.js";
import { entityActions, entityReducerBuilder, reducerKey } from "@soma/soma-dynamic-common/reducer/entity-reducer.js";
import { workspaceActions, workspaceReducer, workspaceReducerBuilder } from "@soma/soma-dynamic-common/reducer/workspace-reducer.js";
import { listViewActions, listViewReducer } from "@soma/soma-dynamic-common/reducer/dynamic-list-reducer.js";

const reducerApp = combineReducers({
    [reducerKey]: entityReducerBuilder(modelHorizontal),
    workspace: workspaceReducerBuilder(modelHorizontal),
    route: routeReducerBuilder(''),
    listView: listViewReducer
});

createSomaStore(reducerApp, Object.assign(routeActions, entityActions, workspaceActions, listViewActions));


