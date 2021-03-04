// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "../../../config/connectDB";
import Tasks from "../../../models/Tasks";
import { getSession } from "next-auth/client";

export default async (req, res) => {
  const session = await getSession({ req });
  // Protect Route
  if (!session) {
    res
      .status(200)
      .json({ success: false, data: "Please Sign in before using this api" });
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
        const response = await Tasks.findOne({ email });
        res.status(200).json({ success: true, tasks: response.tasks });
      } catch (error) {
        console.log(error);
        res
          .status(400)
          .json({ success: false, message: "Didn't find any tasks" });
      }
      break;
    case "POST":
      try {
        await Tasks.deleteOne({ email });
        const tasks = await Tasks.create(req.body);
        res.status(201).json({ success: true, tasks });
      } catch (error) {
        res.status(400).json({ success: false, message: "Couldn't Create" });
      }
      break;
    default:
      res.status(400).json({ success: false });
  }
};
