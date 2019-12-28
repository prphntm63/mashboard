import { combineReducers } from "redux";
import streamdata from "./streamdata";
import user from "./user";
import clientdata from "./clientdata";

export default combineReducers({ user, streamdata, clientdata });