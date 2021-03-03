import * as actionTypes from "./actionTypes";

export const fetchTasks = (session) => ({
  type: actionTypes.FETCH_TASKS,
  content: session,
});
export const AddTask = (newTask) => ({
  type: actionTypes.ADD_TASK,
  content: newTask,
});
export const DeleteTask = (task) => ({
  type: actionTypes.DELETE_TASK,
  content: task,
});
export const taskComplete = (task) => ({
  type: actionTypes.TASK_COMPLETE,
  content: task,
});
export const taskNotComplete = (task) => ({
  type: actionTypes.TASK_NOT_COMPLETE,
  content: task,
});
