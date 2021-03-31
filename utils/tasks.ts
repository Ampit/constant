/* eslint-disable no-undef */
import axios from "axios";
import { Session } from "next-auth/client";
import { Tasks } from "../store/types";

export const fetchTasks = async ({ queryKey }: Session) => {
  const [, session] = queryKey;
  // User Logged In ?
  if (!session) {
    console.log("No Session returning");
    return;
  }
  let config = {
    method: "get",
    url:
      process.env.NEXT_PUBLIC_NEXTAUTH_URL! +
      process.env.NEXT_PUBLIC_TASKS_API_PATH! +
      session.user.email,
  };
  try {
    const response = await axios(config as any);
    return response.data.tasks;
  } catch (error) {
    console.log(`Axios Fetch Error: ${error}`);
  }
};

export const updateDb = async (tasks: Tasks, session: Session) => {
  // Update Db
  let config = {
    method: "post",
    url:
      process.env.NEXT_PUBLIC_NEXTAUTH_URL! +
      process.env.NEXT_PUBLIC_TASKS_API_PATH! +
      session.user.email,
    data: {
      email: session.user.email,
      tasks: tasks,
    },
  };

  try {
    await axios(config as any);
  } catch (error) {
    console.log(error);
  }
};
