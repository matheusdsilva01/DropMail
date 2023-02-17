import { render } from "@testing-library/react";
import Email from "components/email";

const email = {
  headerSubject: "Test email",
  text: "This is a test email",
  fromAddr: "test@example.com",
  selectEmail: jest.fn()
};

describe("tests to email component", () => {
  it("should render email component", () => {
    const { getByText } = render(<Email {...email} />);
    expect(getByText("Test email")).toBeInTheDocument();
  });
});
