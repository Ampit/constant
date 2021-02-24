import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import AccessDenied from "../components/access-denied";
import AddTaskForm from "../components/AddTaskForm";
import TaskList from "../components/TaskList";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const [session, loading] = useSession();

  const addNewItem = (e) => {
    e.preventDefault();

    // error check
    if (!newTask) {
      snackbar("Please Fill in a task");
      return;
    }

    // Add new ItemList
    const newTasks = [{ taskName: newTask, complete: false }, ...tasks];
    setTasks(newTasks);
    snackbar(`${newTask} Added`);

    // Clear the form field
    setNewTask("");
  };

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  // If no session exists, display access denied message
  if (!session) {
    return <AccessDenied />;
  }

  return (
    <>
      Signed in as {session.user.email} <br />
      <button onClick={() => signOut()}>Sign out</button>
      <div id="snackbar"></div>
      <div className="row">
        <div className="col-sm-6 mx-auto">
          <AddTaskForm
            setNewTask={setNewTask}
            newTask={newTask}
            addNewItem={addNewItem}
          />
        </div>
      </div>
      <TaskList tasks={tasks} setTasks={setTasks} />
    </>
  );
}
