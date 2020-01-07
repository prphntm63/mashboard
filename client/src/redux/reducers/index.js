import { combineReducers } from "redux";
import streamdata from "./streamdata";
import user from "./user";
import clientdata from "./clientdata";
import selectedComponent from "./selectedComponent"
import graphdata from "./graphdata"
import batches from "./batches"

export default combineReducers({ user, streamdata, clientdata, selectedComponent, graphdata, batches });