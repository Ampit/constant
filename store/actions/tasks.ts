import * as actionTypes from "./actionTypes";
import { Session } from "next-auth/client";
import { Task } from "../types";
import { Dispatch } from "redux";

export const FetchTasks = (session: Session) => (dispatch: Dispatch) => {
  dispatch({
    type: actionTypes.FETCH_TASKS,
    payload: session,
  });
};
export const AddTask = (newTask: string, session: Session) => (
  dispatch: Dispatch
) => {
  dispatch({ type: actionTypes.ADD_TASK, payload: newTask, session });
};
export const DeleteTask = (task: Task, session: Session) => (
  dispatch: Dispatch
) => {
  dispatch({ type: actionTypes.DELETE_TASK, payload: task, session });
};
export const TaskStatusToggle = (task: Task, session: Session) => (
  dispatch: Dispatch
) => {
  dispatch({ type: actionTypes.TASK_STATUS_TOGGLE, payload: task, session });
};
