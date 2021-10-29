import { producer, producerOptions, frequencyIdsOptions } from "./producer";
import { route, routeOptions } from "./route";
import { fileMask, fileMaskOptions } from "./fileMask";
// import { userInfo } from "./userInfo";
import { fileData } from "./fileData";
import { combineReducers } from "redux";
import { adminFileData } from "./adminFileData";
import { jobData } from "./jobData"
import { adminRawData } from "./adminRawData";
import { addFile } from "./addFile";

const rootReducer = combineReducers({
  producer,
  producerOptions,
  frequencyIdsOptions,
  fileMask,
  fileMaskOptions,
  // userInfo,
  fileData,
  adminFileData,
  jobData,
  adminRawData,
  addFile,
  route,
  routeOptions
});

export default rootReducer;
