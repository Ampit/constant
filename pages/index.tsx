import { useSession, getSession } from "next-auth/react";
//import { useRouter } from "next/router";
import { useEffect } from "react";
// import { ActionCreatorsMapObject, bindActionCreators, Dispatch } from "redux";
import { useQuery } from "react-query";
import { connect } from "react-redux";
import { FetchTasks } from "../store/actions/tasks";
import AccessDenied from "../components/access-denied";
import { fetchTasks } from "../utils/tasks";
import Button from "react-bootstrap/Button";
import { Tasks, GlobalState } from "../store/types";
import { GetServerSideProps } from "next";
import { Session } from "next-auth";

type Props = {
  FetchTasks: (session: Session) => void; // eslint-disable-line
  tasks: Tasks;
};

const Dashboard = ({ FetchTasks, tasks }: Props) => {
  const { data: session, status } = useSession();
  const totalTasks = tasks.length;
  const tasksCompleted = tasks.filter((task) => task.complete != false).length;
  const tasksLeft = tasks.filter((task) => task.complete != true).length;
  //const router = useRouter();

  // Fetch tasks from server
  const { isSuccess, data } = useQuery(
    ["fetchTasks", session],
    fetchTasks as any
  );

  useEffect(() => {
    // if (session && !loading) {
    //   // Redirect to tasks page
    //   router.push("/tasks");
    // }
    if (isSuccess && data) {
      // Fire up an event to update client's state with server's tasks
      FetchTasks(data as Session);
    }
  }, [data]);

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && status === "loading") return null;

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
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard as any);
