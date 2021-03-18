import { useSession, getSession, Session } from "next-auth/client";
//import { useRouter } from "next/router";
import { useEffect } from "react";
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';
import { useQuery } from "react-query";
import { connect } from "react-redux";
import { FetchTasks } from "../store/actions/tasks";
import AccessDenied from "../components/access-denied";
import { fetchTasks } from "../utils/tasks";
import Button from "react-bootstrap/Button";

type Task = {
  id: String,
  taskName: String,
  complete: Boolean,
  createdAt: String,
};

type Tasks = [Task];


interface State {
  tasks: Tasks
};


type Props = {
  FetchTasks: (session: Session) => void;
  tasks: Tasks
};

import { GetServerSideProps } from "next";

const Dashboard = ({ FetchTasks, tasks } : Props) => {
  const [session, loading] = useSession();
  const totalTasks = tasks.length;
  const tasksCompleted = tasks.filter((task) => task.complete != false).length;
  const tasksLeft = tasks.filter((task) => task.complete != true).length;
  //const router = useRouter();

  // Fetch tasks from server
  const { isSuccess, data } = useQuery(["fetchTasks", session], fetchTasks);

  useEffect(() => {
    // if (session && !loading) {
    //   // Redirect to tasks page
    //   router.push("/tasks");
    // }
    if (isSuccess && data) {
      // Fire up an event to update client's state with server's tasks
      FetchTasks(data);
    }
  }, [data]);

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return "Loading";

  // If no session exists, display access denied message
  if (!session) {
    return <AccessDenied />;
  }

  return (
    <div className="text-center">
      <p>
        Total Tasks: <strong>{totalTasks}</strong> | Tasks Completed:{" "}
        <strong>{tasksCompleted}</strong> | Tasks Left:{" "}
        <strong>{tasksLeft}</strong>
      </p>
      <Button variant="primary" size="sm" href="/tasks">
        Go To Tasks
      </Button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async context =>  {
  const session = await getSession(context);
  return {
    props: { session },
  };
}

const mapStateToProps = (state: State) => {
  return { tasks: state.tasks };
};

const mapDispatchToProps = {
  FetchTasks,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
