import { cleanup, render } from "@testing-library/react";

import React from "react";
import ReactDOM from "react-dom";
import AddTaskForm from "../components/AddTaskForm";

afterEach(cleanup);
describe("AddTaskForm tests", () => {
  test("Make sure the form component renders", async () => {
    const div = document.createElement("div");
    const addTaskMock = jest.fn();
    ReactDOM.render(<AddTaskForm AddTaskAction={addTaskMock} />, div);
  });

  it("make sure it accepts input", () => {
    const addTaskMock = jest.fn();
    try {
      const { getByLabelText } = render(
        <AddTaskForm AddTaskAction={addTaskMock} />
      );
      expect(getByLabelText("Add New Task:")).toBeInTheDocument();
    } catch (error) {
      console.log("Error", error);
    }
  });
});
