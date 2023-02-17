import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "components/modal";

describe("tests to component modal", () => {
  it("should be render component modal", () => {
    const mockOnClick = jest.fn();
    const loading = false;

    const { getByText } = render(
      <Modal onClick={mockOnClick} loading={loading} />
    );

    expect(getByText("Bem vindo ao DropMail generator!!!")).toBeInTheDocument();
  });
  it("should be called event click button", () => {
    const mockOnClick = jest.fn();
    const loading = false;

    const { getByText } = render(
      <Modal onClick={mockOnClick} loading={loading} />
    );

    expect(getByText("Bem vindo ao DropMail generator!!!")).toBeInTheDocument();

    userEvent.click(getByText("Começar"));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
  it("should indicate loading", () => {
    const onClick = jest.fn();
    const loading = true;

    const { getByRole } = render(<Modal onClick={onClick} loading={loading} />);

    expect(getByRole("img")).toBeInTheDocument();
  });
});
