import { cleanup, render, waitFor } from "@testing-library/react";

import React from "react";
import ReactDOM from "react-dom";
import AddTaskForm from "../components/AddTaskForm";

afterEach(cleanup);
beforeEach(() => {
  // @ts-expect-error:
  fetch.resetMocks();
});

describe("AddTaskForm tests", () => {
  test("the form component renders", async () => {
    const div = document.createElement("div");
    const addTaskMock = jest.fn();
    ReactDOM.render(<AddTaskForm AddTaskAction={addTaskMock} />, div);
  });

  it("has an input", async () => {
    // @ts-expect-error:
    fetch.mockResponseOnce(
      JSON.stringify({ user: { email: "ampit.xd@gmail.com" } })
    );
    const addTaskMock = jest.fn();
    const { getByLabelText } = render(
      <AddTaskForm AddTaskAction={addTaskMock} />
    );
    const label = await waitFor(() => getByLabelText("Add New Task:"));
    expect(label).toBeInTheDocument();
  });
});
