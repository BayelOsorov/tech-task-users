import { combineReducers } from "redux";
import { usersReducer } from "./reducer";

export const rootReducer = combineReducers({
    users: usersReducer
})