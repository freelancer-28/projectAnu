import { producer, producerOptions } from "./producer";
import { route, routeOptions } from "./route";
import { fileMask, fileMaskOptions } from "./fileMask";
// import { userInfo } from "./userInfo";
import { fileData } from "./fileData";
import { combineReducers } from "redux";
import { adminFileData } from "./adminFileData";
import { adminRawData } from "./adminRawData";
import { addFile } from "./addFile";

const rootReducer = combineReducers({
  producer,
  producerOptions,
  fileMask,
  fileMaskOptions,
  // userInfo,
  fileData,
  adminFileData,
  adminRawData,
  addFile,
  route,
  routeOptions
});

export default rootReducer;
