import { useState } from "react";
import { useSession } from "next-auth/client";
import AccessDenied from "../components/access-denied";
import LoggedIn from "../components/LoggedIn";
import AddTaskForm from "../components/AddTaskForm";
import TaskList from "../components/TaskList";
import axios from "axios";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [session, loading] = useSession();

  const fetchedTasks = async () => {
    if (session) {
      let config = {
        method: "get",
        url: `http://localhost:3000/api/tasks/${session.user.email}`,
        headers: {},
      };
      try {
        const response = await axios(config);
        setTasks(response.data.data.tasks);
      } catch (error) {
        console.log(error);
      }
    }
  };

  fetchedTasks();

  const addNewItem = async (e) => {
    e.preventDefault();
    if (!newTask) {
      // error check
      snackbar("Please Fill in a task");
      return;
    }
    const newTasks = [
      { taskName: newTask, complete: false, createdAt: Date() },
      ...tasks,
    ]; // Add new ItemList
    setTasks(newTasks);
    await axios.post(`http://localhost:3000/api/tasks/${session.user.email}`, {
      email: session.user.email,
      tasks: newTasks,
    });
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
