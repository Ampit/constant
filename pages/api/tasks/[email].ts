import connectDB from "../../../config/connectDB";
import TasksModel from "../../../models/Tasks";
import { getSession } from "next-auth/client";

import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  // Protect Route
  if (!session) {
    res.status(200).json({
      message: "Please Sign in before using this API.",
    });
    return;
  }

  // a User is signed in
  const {
    method,
    query: { email },
  } = req;

  await connectDB();

  switch (method) {
    case "GET":
      try {
        const response = await TasksModel.findOne({ email });
        // show tasks if there are any
        response
          ? res.status(200).json(response)
          : res.status(200).json({ message: "No tasks found" }); // no tasks found
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error occured." + error.message });
      }
      break;

    // Improve the deletion and updation to one record at a time
    case "POST":
      try {
        await TasksModel.deleteOne({ email });
        const tasks = await TasksModel.create(req.body);
        // send response with tasks if updated correctly
        tasks
          ? res.status(201).json(tasks)
          : // if not send error message
            res
              .status(400)
              .json({ message: "Error Occured. Couldn't Update Tasks." });
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Error occured." + error.message });
      }
      break;
    default:
      res.status(400).json({ message: "Bad Request." });
  }
};
