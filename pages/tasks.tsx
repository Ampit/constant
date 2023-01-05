import { useEffect } from "react";
import { useSession, getSession, Session } from "next-auth/react";
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
import { GlobalState, Tasks } from "../store/types";
import { GetServerSideProps } from "next";

type Props = {
  FetchTasks: typeof FetchTasks;
  AddTask: typeof AddTask;
  DeleteTask: typeof DeleteTask;
  TaskStatusToggle: typeof TaskStatusToggle;
  tasks: Tasks;
};

const TasksPage = ({
  FetchTasks,
  AddTask,
  DeleteTask,
  TaskStatusToggle,
  tasks,
}: Props) => {
  const [session, loading] = useSession();

  // Fetch tasks from server
  const { isSuccess, data } = useQuery(
    ["fetchTasks", session],
    fetchTasks as any
  );

  useEffect(() => {
    if (isSuccess && data) {
      FetchTasks(data as Session);
    }
  }, [data]);

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading && !isSuccess) return null;

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
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: { session },
  };
};

const mapStateToProps = (state: GlobalState) => {
  return { tasks: state.tasks };
};

const mapDispatchToProps = {
  FetchTasks,
  AddTask,
  DeleteTask,
  TaskStatusToggle,
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksPage as any);
