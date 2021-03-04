import * as actionTypes from "./actionTypes";

export const FetchTasks = (session) => (dispatch) => {
  dispatch({
    type: actionTypes.FETCH_TASKS,
    payload: session,
  });
};
export const AddTask = (newTask, session) => (dispatch) => {
  dispatch({ type: actionTypes.ADD_TASK, payload: newTask, session });
};
export const DeleteTask = (task, session) => (dispatch) => {
  dispatch({ type: actionTypes.DELETE_TASK, payload: task, session });
};
export const TaskStatusToggle = (task, session) => (dispatch) => {
  dispatch({ type: actionTypes.TASK_STATUS_TOGGLE, payload: task, session });
};
