import { useState } from "react";
import { useSession } from "next-auth/client";
import AccessDenied from "../components/access-denied";
import LoggedIn from "../components/LoggedIn";
import AddTaskForm from "../components/AddTaskForm";
import TaskList from "../components/TaskList";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [session, loading] = useSession();

  const addNewItem = (e) => {
    e.preventDefault();
    if (!newTask) {
      // error check
      snackbar("Please Fill in a task");
      return;
    }
    const newTasks = [{ taskName: newTask, complete: false }, ...tasks]; // Add new ItemList
    setTasks(newTasks);
    snackbar(`${newTask} Added`);
    setNewTask(""); // Clear the form field
  };
  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;
  // If no session exists, display access denied message
  if (!session) {
    return <AccessDenied />;
  }
  return (
    <>
      <LoggedIn session={session} />
      <AddTaskForm
        setNewTask={setNewTask}
        newTask={newTask}
        addNewItem={addNewItem}
      />
      <TaskList tasks={tasks} setTasks={setTasks} />
      <div id="snackbar"></div>
    </>
  );
}
