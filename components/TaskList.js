import ListGroup from "react-bootstrap/ListGroup";

const TaskList = ({ tasks, setTasks }) => {
  const TaskStatusToggle = (tasks, task, setTasks) => {
    // get current complete state
    const currentCompleteState = tasks.filter(
      (item) => item.taskName == task.taskName
    );

    // update new state , toggling complete
    const updatedTasks = [
      ...tasks.filter((item) => item.taskName != task.taskName),
      {
        taskName: task.taskName.toString(),
        complete: !currentCompleteState[0].complete,
      },
    ];

    // user friendly message
    const msg = `${currentCompleteState[0].taskName} ${
      !currentCompleteState[0].complete ? "Completed" : "Not Completed"
    }`;
    snackbar(msg);

    // update tasks state to new state
    setTasks(updatedTasks);
  };

  const deleteTask = (tasks, task, setTasks) => {
    // update new state , deleting clicked task
    const updatedTasks = [
      ...tasks.filter((item) => item.taskName != task.taskName),
    ];

    // user friendly message
    snackbar(`${task.taskName} Deleted`);

    // update tasks state to new state
    setTasks(updatedTasks);
  };

  return (
    <div className="my-5">
      <ListGroup id="listGroup">
        {tasks.map((task, i) => (
          <div className="row taskgroup">
            <ListGroup.Item
              onClick={() => TaskStatusToggle(tasks, task, setTasks)}
              key={i}
              action
              {...(task.complete ? { variant: "success" } : {})}
            >
              {task.taskName}
            </ListGroup.Item>
            <button
              type="button"
              class="delete-btn btn btn-outline-danger"
              onClick={() => deleteTask(tasks, task, setTasks)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-x-square-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"></path>
              </svg>
            </button>
          </div>
        ))}
      </ListGroup>
    </div>
  );
};

export default TaskList;
