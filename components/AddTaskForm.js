import { useState } from "react";
import { useSession } from "next-auth/client";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import snackbar from "./snackbar";

const AddTaskForm = ({ AddTaskAction }) => {
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
    <Form className="text-center my-3">
      <Form.Group controlId="addTaskText">
        <Form.Label>Add New Task:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter New Task..."
          onChange={(e) => setNewTask(e.target.value)}
          value={newTask}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={onSubmitHandler}>
        Add
      </Button>
    </Form>
  );
};

export default AddTaskForm;
