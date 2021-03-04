import * as actionTypes from "../actions/actionTypes";
import { v4 as uuidv4 } from "uuid";
import { updateDb } from "../../utils/tasks";

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TASK: {
      // Add new task to the list of tasks
      const newTasks = [
        {
          id: uuidv4(),
          taskName: action.payload.toString(),
          complete: false,
          createdAt: new Date().toISOString(),
        },
        ...state,
      ];
      // update db
      updateDb(newTasks, action.session);
      return newTasks;
    }

    case actionTypes.DELETE_TASK: {
      //Delete the task from the list of tasks
      const newTasks = [
        ...state.filter((task) => task.id != action.payload.id),
      ];
      //update db
      updateDb(newTasks, action.session);
      return newTasks;
    }

    case actionTypes.TASK_STATUS_TOGGLE: {
      //Toggle Task Status
      const currentState = state.filter((task) => task.id == action.payload.id);
      const updatedTasks = [
        ...state.filter((task) => task.id != action.payload.id),
        {
          id: action.payload.id,
          taskName: action.payload.taskName.toString(),
          complete: !currentState[0].complete,
          createdAt: new Date().toISOString(),
        },
      ];
      const msg = `${currentState[0].taskName} ${
        !currentState[0].complete ? "Completed" : "Not Completed"
      }`;
      // eslint-disable-next-line no-undef
      snackbar(msg);
      //updateDB
      updateDb(updatedTasks, action.session);
      return updatedTasks;
    }
    case actionTypes.FETCH_TASKS:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
