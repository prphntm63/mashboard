import { combineReducers } from "redux";
import streamdata from "./streamdata";
import user from "./user";
import clientdata from "./clientdata";
import selectedComponent from "./selectedComponent"

export default combineReducers({ user, streamdata, clientdata, selectedComponent });