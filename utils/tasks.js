/* eslint-disable no-undef */
import axios from "axios";

export const fetchTasks = async (session) => {
  // User Logged In ?
  if (!session) {
    console.log("No Session returning");
    return;
  }
  let config = {
    method: "get",
    url:
      process.env.NEXT_PUBLIC_NEXTAUTH_URL +
      process.env.NEXT_PUBLIC_TASKS_API_PATH +
      session.user.email,
  };
  try {
    const response = await axios(config);
    return response.data.data.tasks;
  } catch (error) {
    console.log(`Axios Fetch Error: ${error}`);
  }
};

export const addNewItemHandler = async (
  e,
  newTask,
  tasks,
  setTasks,
  session,
  setNewTask
) => {
  e.preventDefault();
  if (!newTask) {
    snackbar("Please Fill in a task");
    return;
  }
  // User Logged IN ?
  if (!session) return;
  const newTasks = [
    { taskName: newTask, complete: false, createdAt: Date() },
    ...tasks,
  ]; // Add new ItemList
  //update local state
  setTasks(newTasks);
  snackbar(`${newTask} Added`);
  //update db
  updateDb(newTasks, session);
  setNewTask(""); // Clear the form field
};

export const updateDb = async (tasks, session) => {
  // Update Db
  let config = {
    method: "post",
    url:
      process.env.NEXT_PUBLIC_NEXTAUTH_URL +
      process.env.NEXT_PUBLIC_TASKS_API_PATH +
      session.user.email,
    data: {
      email: session.user.email,
      tasks: tasks,
    },
  };

  try {
    await axios(config);
  } catch (error) {
    console.log(error);
  }
};
