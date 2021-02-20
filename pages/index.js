import { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";

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
    const newTasks = [newTask, ...tasks];
    setTasks(newTasks);
    // Clear the form field
    setNewTask("");
  };

  return (
    <>
      <div id="snackbar"></div>
      <div className="row">
        <div className="col-sm-6 mx-auto">
          <form className="text-center my-3">
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
              onClick={addNewItem}
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
          <div className="my-5">
            <ListGroup id="listGroup">
              {tasks.map((task, i) => (
                <ListGroup.Item
                  //onClick={tick}
                  key={i}
                  action
                >
                  {task}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </div>
      </div>
    </>
  );
}
