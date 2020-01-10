// TYPES
import { GET_USERS, GET_HOSPITALS, GET_GROUPS } from "../types/ResourcesTypes";

const initialState = {
  users: [],
  hospitals: [],
  groups: []
};

const ResourcesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload.users
      };
    case GET_HOSPITALS:
      return {
        ...state,
        hospitals: action.payload.hospitals
      };
    case GET_GROUPS:
      return {
        ...state,
        groups: action.payload.groups
      };
    default:
      return state;
  }
};

export default ResourcesReducer;
