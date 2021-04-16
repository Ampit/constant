import { render, cleanup, screen, act } from "@testing-library/react";

import AddTaskForm from "../components/AddTaskForm";

afterEach(cleanup);

describe("AddTaskForm tests", () => {
  const addTaskMock = jest.fn();
  test("Make sure there is an input", async () => {
    act(() => {
      /* fire events that update state */
      render(<AddTaskForm AddTaskAction={addTaskMock} />);
    });

    expect(screen.getByPlaceholderText("Add New Task:")).toBeInTheDocument();
  });
});
