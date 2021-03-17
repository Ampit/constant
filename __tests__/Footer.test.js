import { render, cleanup, screen } from "@testing-library/react";

import Footer from "../components/Footer";

afterEach(cleanup);

describe("Footer", () => {
  test("The Footer Loads", async () => {
    const { getByText } = render(<Footer />);
    // getByText(new Date().getFullYear() + "  Constant");
    expect(screen.getByText(/Constant/i)).toBeInTheDocument();
    expect(screen.getByText(/2021/g)).toBeInTheDocument();
  });
});
