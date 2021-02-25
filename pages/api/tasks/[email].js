// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "../../../config/connectDB";
import Tasks from "../../../models/Tasks";

export default async (req, res) => {
  const {
    method,
    query: { email },
  } = req;
  await connectDB();
  switch (method) {
    case "GET":
      try {
        const tasks = await Tasks.findOne({ email });
        res.status(200).json({ success: true, data: tasks });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, data: "Didn't find any tasks" });
      }
      break;
    case "POST":
      try {
        await Tasks.deleteOne({ email });
        const tasks = await Tasks.create(req.body);
        res.status(201).json({ success: true, data: tasks });
      } catch (error) {
        res.status(400).json({ success: false, data: "Couldn't Create" });
      }
      break;
    default:
      res.status(400).json({ success: false });
  }
};
