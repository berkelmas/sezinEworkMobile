import { combineReducers } from "redux";

// REDUCERS
import AuthReducer from "./AuthReducer";
import ResourcesReducer from "./ResourcesReducer";

const RootReducer = combineReducers({
  AuthReducer,
  ResourcesReducer
});

export default RootReducer;
