import mongoose from "mongoose";
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email required"],
    maxlength: [20, "Email cannot be more than 60 characters"],
  },
  tasks: {
    type: Array,
  },
});

mongoose.models = {};

const Tasks = mongoose.model("Tasks", taskSchema);

export default Tasks;
