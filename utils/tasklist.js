import { updateDb } from "../utils/tasks";

export const TaskStatusToggle = async (tasks, task, setTasks, session) => {
  const currentState = tasks.filter((item) => item.taskName == task.taskName);
  const updatedTasks = [
    ...tasks.filter((item) => item.taskName != task.taskName),
    {
      taskName: task.taskName.toString(),
      complete: !currentState[0].complete,
      createdAt: Date(),
    },
  ];
  const msg = `${currentState[0].taskName} ${
    !currentState[0].complete ? "Completed" : "Not Completed"
  }`;
  snackbar(msg);
  setTasks(updatedTasks);
  updateDb(updatedTasks, session);
};

export const deleteTask = async (tasks, task, setTasks, session) => {
  const updatedTasks = [
    ...tasks.filter((item) => item.taskName != task.taskName),
  ];
  snackbar(`${task.taskName} Deleted`);
  setTasks(updatedTasks);
  updateDb(updatedTasks, session);
};
