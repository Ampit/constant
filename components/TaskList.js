import { useSession } from "next-auth/client";
import ListGroup from "react-bootstrap/ListGroup";
import Svg from "../utils/Svg";

const TaskList = ({ tasks, TaskStatusToggle, DeleteTask }) => {
  const [session] = useSession();
  return (
    <div className="my-5">
      <ListGroup id="listGroup">
        {tasks.map((task, i) => (
          <div key={i} className="row taskgroup text-center">
            <ListGroup.Item
              onClick={() => TaskStatusToggle(task, session)}
              action
              {...(task.complete ? { variant: "success" } : {})}
            >
              {task.taskName}
            </ListGroup.Item>
            <button
              type="button"
              className="delete-btn btn btn-outline-danger"
              onClick={() => {
                DeleteTask(task, session);
                snackbar(`${task.taskName} Deleted`);
              }}
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
