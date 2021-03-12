import { useSession, getSession } from "next-auth/client";
//import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { connect } from "react-redux";
import { FetchTasks } from "../store/actions/tasks";
import { fetchTasks } from "../utils/tasks";
import Button from "react-bootstrap/Button";

const Dashboard = ({ FetchTasks, tasks }) => {
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
      FetchTasks(data);
    }
  }, [data]);

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return "Loading";

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
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
