import { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/client";
import AccessDenied from "../components/access-denied";
import LoggedIn from "../components/LoggedIn";
import AddTaskForm from "../components/AddTaskForm";
import TaskList from "../components/TaskList";
import { addNewItemHandler } from "../utils/tasks";
import TasksModel from "../models/Tasks";
import connectDB from "../config/connectDB";

export default function Main({ storedTasks }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [session, loading] = useSession();

  useEffect(() => {
    setTasks(storedTasks);
  }, []);

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;
  // If no session exists, display access denied message
  if (!session) {
    return <AccessDenied />;
  }

  return (
    <>
      <LoggedIn />
      <AddTaskForm
        setNewTask={setNewTask}
        newTask={newTask}
        addNewItem={(e) => {
          addNewItemHandler(e, newTask, tasks, setTasks, session, setNewTask);
        }}
      />
      <TaskList tasks={tasks} setTasks={setTasks} />
      <div id="snackbar"></div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  // Fetch data from db with session.user.email
  await connectDB();
  const response = await TasksModel.findOne({
    email: session.user.email,
  }).exec();
  return {
    props: { storedTasks: response.tasks },
  };
}
