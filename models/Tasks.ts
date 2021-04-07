import mongoose from "mongoose";
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email required"],
    maxlength: [20, "Email cannot be more than 20 characters"],
  },
  tasks: {
    type: Array,
  },
});

const TasksModel = mongoose.model("Tasks", taskSchema);

export default TasksModel;
