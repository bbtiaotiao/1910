import {combineReducers} from "redux-immutable";
import { user } from "./user";

export const reducers = combineReducers({
    user:user
});