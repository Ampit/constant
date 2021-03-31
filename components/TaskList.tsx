import { useSession } from "next-auth/client";
import ListGroup from "react-bootstrap/ListGroup";
import Svg from "../utils/Svg";
import snackbar from "./snackbar";
import { TaskStatusToggle, DeleteTask } from "../store/actions/tasks";
import { Tasks } from "../store/types";

type Props = {
  tasks: Tasks;
  TaskStatusToggle: typeof TaskStatusToggle;
  DeleteTask: typeof DeleteTask;
};

const TaskList = ({ tasks, TaskStatusToggle, DeleteTask }: Props) => {
  const [session] = useSession();
  const totalTasks = tasks.length;
  const tasksCompleted = tasks.filter((task) => task.complete != false).length;
  const tasksLeft = tasks.filter((task) => task.complete != true).length;
  return (
    <div className="my-5 text-center">
      <p>
        Total Tasks: <strong>{totalTasks}</strong> | Tasks Completed:{" "}
        <strong>{tasksCompleted}</strong> | Tasks Left:{" "}
        <strong>{tasksLeft}</strong>
      </p>
      <ListGroup id="listGroup">
        {tasks.map((task, i) => (
          <div key={i} className="row taskgroup text-center">
            <ListGroup.Item
              onClick={() => TaskStatusToggle(task, session!)}
              action
              {...(task.complete ? { variant: "success" } : {})}
            >
              {task.taskName}
            </ListGroup.Item>
            <button
              type="button"
              className="delete-btn btn btn-outline-danger"
              onClick={() => {
                DeleteTask(task, session!);
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
