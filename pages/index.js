import { useState } from "react";
import AddTaskForm from "../components/AddTaskForm";
import TaskList from "../components/TaskList";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

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

  return (
    <>
      <div id="snackbar"></div>

      <div className="row">
        <div className="col-sm-6 mx-auto">
          <AddTaskForm
            setNewTask={setNewTask}
            newTask={newTask}
            addNewItem={addNewItem}
          />

          <TaskList tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
    </>
  );
}
