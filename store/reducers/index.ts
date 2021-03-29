import { combineReducers } from "redux";
import tasksReducer from "./tasks";

const rootReducer = combineReducers({
  tasks: tasksReducer,
});

export default rootReducer;
