import { combineReducers } from "redux";

// REDUCERS
import AuthReducer from "./AuthReducer";

const RootReducer = combineReducers({
  AuthReducer
});

export default RootReducer;
