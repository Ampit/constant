import { useSession } from "next-auth/client";
import ListGroup from "react-bootstrap/ListGroup";
import { TaskStatusToggle, deleteTask } from "../utils/tasklist";
import Svg from "../utils/Svg";

const TaskList = ({ tasks, setTasks }) => {
  // eslint-disable-next-line no-unused-vars
  const [session, loading] = useSession();

  return (
    <div className="my-5">
      <ListGroup id="listGroup">
        {tasks.map((task, i) => (
          <div key={i} className="row taskgroup text-center">
            <ListGroup.Item
              onClick={() => TaskStatusToggle(tasks, task, setTasks, session)}
              action
              {...(task.complete ? { variant: "success" } : {})}
            >
              {task.taskName}
            </ListGroup.Item>
            <button
              type="button"
              className="delete-btn btn btn-outline-danger"
              onClick={() => deleteTask(tasks, task, setTasks, session)}
            >
              <Svg />
            </button>
          </div>
        ))}
      </ListGroup>
    </div>
  );
};

export default TaskList;
