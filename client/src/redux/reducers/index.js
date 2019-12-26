import { combineReducers } from "redux";
import streamdata from "./streamdata";
import user from "./user";

export default combineReducers({ user, streamdata });