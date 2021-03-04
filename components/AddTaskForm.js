import { useState } from "react";
import { useSession } from "next-auth/client";

const AddTaskForm = ({ addNewItem, AddTaskAction }) => {
  const [newTask, setNewTask] = useState("");
  const [session] = useSession();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!newTask) {
      snackbar("Please Fill in a task");
      return;
    }
    // User Logged IN ?
    if (!session) return;
    //Fire add task action
    AddTaskAction(newTask, session);
    // User friendly message
    snackbar(`${newTask} Added`);
    setNewTask(""); // Clear the form field
  };

  return (
    <form className="text-center my-3" acceptCharset="utf-8">
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="newTaskInput"
          placeholder="Add new task..."
          onChange={(e) => setNewTask(e.target.value)}
          value={newTask}
        />
      </div>
      <button
        type="submit"
        onClick={onSubmitHandler}
        className="btn btn-primary"
      >
        Submit
      </button>
    </form>
  );
};

export default AddTaskForm;
