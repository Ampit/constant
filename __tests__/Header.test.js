// import react-testing methods
import { render, cleanup, screen } from "@testing-library/react";

//import a component to test
// const Header = () => {
//   return <h1>Constant</h1>;
// };
import Header from "../components/Header";

// cleanup
afterEach(cleanup);

describe("Header", () => {
  test("The Header Loads", async () => {
    render(<Header />);
    expect(screen.getByText(/Constant/i)).toBeInTheDocument();
  });
});
