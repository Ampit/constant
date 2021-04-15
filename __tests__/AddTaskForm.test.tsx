import { render, cleanup, waitFor, screen } from "@testing-library/react";

import AddTaskForm from "../components/AddTaskForm";

afterEach(cleanup);

describe("AddTaskForm tests", async () => {
  test("Make sure there is an input", async () => {
    render(<AddTaskForm AddTaskAction={jest.fn} />);

    // getByText(new Date().getFullYear() + "  Constant");
    expect(screen.getByText("Add New Task:")).toBeInTheDocument();
  });
});
