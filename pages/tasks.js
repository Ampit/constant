import { useEffect } from "react";
import { useSession, getSession } from "next-auth/client";
import { useQuery } from "react-query";
import { connect } from "react-redux";
import AccessDenied from "../components/access-denied";
import AddTaskForm from "../components/AddTaskForm";
import TaskList from "../components/TaskList";
import {
  FetchTasks,
  AddTask,
  DeleteTask,
  TaskStatusToggle,
} from "../store/actions/tasks";
import { fetchTasks } from "../utils/tasks";

const TasksPage = ({
  FetchTasks,
  AddTask,
  DeleteTask,
  TaskStatusToggle,
  tasks,
}) => {
  const [session, loading] = useSession();

  // Fetch tasks from server
  const { isSuccess, data } = useQuery(["fetchTasks", session], fetchTasks);

  useEffect(() => {
    if (isSuccess && data) {
      FetchTasks(data);
    }
  }, [data]);

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  // If no session exists, display access denied message
  if (!session) {
    return <AccessDenied />;
  }

  return (
    <>
      <AddTaskForm AddTaskAction={AddTask} />
      <TaskList
        tasks={tasks}
        TaskStatusToggle={TaskStatusToggle}
        DeleteTask={DeleteTask}
      />
      <div id="snackbar"></div>
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}

const mapStateToProps = (state) => {
  return { tasks: state.tasks };
};

const mapDispatchToProps = {
  FetchTasks,
  AddTask,
  DeleteTask,
  TaskStatusToggle,
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksPage);
