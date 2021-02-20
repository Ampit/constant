const AddTaskForm = ({ setNewTask, newTask, addNewItem }) => {
  return (
    <form className="text-center my-3">
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          id="newTaskInput"
          placeholder="Add new task..."
          onChange={(e) => setNewTask(e.target.value)}
          value={newTask}
        />
      </div>
      <button type="submit" onClick={addNewItem} className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default AddTaskForm;
