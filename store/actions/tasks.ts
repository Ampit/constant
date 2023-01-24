import * as actionTypes from "./actionTypes";
import { Task } from "../types";
import { Dispatch } from "redux";
import { DefaultSession } from 'next-auth';

export const FetchTasks = (session: DefaultSession) => (dispatch: Dispatch) => {
  dispatch({
    type: actionTypes.FETCH_TASKS,
    payload: session,
  });
};
export const AddTask = (newTask: string, session: DefaultSession) => (
  dispatch: Dispatch
) => {
  dispatch({ type: actionTypes.ADD_TASK, payload: newTask, session });
};
export const DeleteTask = (task: Task, session: DefaultSession) => (
  dispatch: Dispatch
) => {
  dispatch({ type: actionTypes.DELETE_TASK, payload: task, session });
};
export const TaskStatusToggle = (task: Task, session: DefaultSession) => (
  dispatch: Dispatch
) => {
  dispatch({ type: actionTypes.TASK_STATUS_TOGGLE, payload: task, session });
};
