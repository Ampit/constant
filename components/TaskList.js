import ListGroup from "react-bootstrap/ListGroup";

const TaskList = ({ tasks, setTasks }) => {
  const clickHandler = (tasks, task, setTasks) => {
    // get current complete state
    const currentCompleteState = tasks.filter(
      (item) => item.taskName == task.taskName
    )[0].complete;

    // update new state , toggling complete
    const updatedTasks = [
      ...tasks.filter((item) => item.taskName != task.taskName),
      {
        taskName: task.taskName.toString(),
        complete: !currentCompleteState,
      },
    ];

    // update tasks state to new state

    setTasks(updatedTasks);
  };

  return (
    <div className="my-5">
      <ListGroup id="listGroup">
        {tasks.map((task, i) => (
          <ListGroup.Item
            onClick={() => clickHandler(tasks, task, setTasks)}
            key={i}
            action
            {...(task.complete ? { variant: "success" } : {})}
          >
            {task.taskName}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default TaskList;
