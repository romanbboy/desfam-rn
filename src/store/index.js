import {createStore, combineReducers, applyMiddleware} from "redux";
import {authReducer} from "./reducers/authReducer";
import {mainReducer} from "./reducers/mainReducer";
import {datebookReducer} from "./reducers/datebookReducer";

import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  auth: authReducer,
  main: mainReducer,
  datebook: datebookReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
