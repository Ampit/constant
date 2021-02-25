import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import AccessDenied from "../components/access-denied";
import LoggedIn from "../components/LoggedIn";
import AddTaskForm from "../components/AddTaskForm";
import TaskList from "../components/TaskList";
import { fetchTasks, addNewItemHandler } from "../utils/tasks";

export default function Main() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [session, loading] = useSession();

  useEffect(() => {
    // Fetch old tasks
    fetchTasks(session, setTasks);
  });

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
