import { render } from "@testing-library/react";
import Header from "components/header";

describe("Tests to header modal", () => {
  const mockRequestPermission = jest.fn();
  Object.defineProperty(window, "Notification", {
    value: {
      requestPermission: mockRequestPermission,
      permission: "granted"
    },
    writable: true
  });
  it("should render header", () => {
    const mockUseLocalStorage = jest.fn();
    mockUseLocalStorage.mockImplementation((key: string) => {
      let value;
      if (key === "session") {
        value = "logged-in";
      }
      return [value, jest.fn()];
    });
    jest.mock("hooks/useLocalStorage", () => ({
      useLocalStorage: mockUseLocalStorage
    }));
    const { getByAltText } = render(<Header />);
    expect(getByAltText("logo-website")).toBeInTheDocument();
  });
});
