import { render, screen } from "@testing-library/react";
import App from "App";

test("renders learn react link", () => {
  const mockRequestPermission = jest.fn();
  Object.defineProperty(window, "Notification", {
    value: {
      requestPermission: mockRequestPermission
    },
    writable: true
  });
  render(<App />);
  const linkElement = screen.getByText(/Bem vindo ao DropMail generator!!!/i);
  expect(linkElement).toBeInTheDocument();
});
