import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { registerUser } from "@/api/authentication/api.auth";
import { useAuth } from "@/app/hooks/useAuth";
import SignUp from "./Signup";

jest.mock("../../../api/authentication/api.auth");
jest.mock("../../hooks/useAuth");

const mockedRegisterUser = registerUser as jest.Mock;
const mockedUseAuth = useAuth as jest.Mock;

describe("Register Component", () => {
  beforeEach(() => {
    mockedUseAuth.mockReturnValue({
      register: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the register form with username, email and password fields", () => {
    render(<SignUp />);

    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Register/i })).toBeInTheDocument();
  });

  test("submits the form with the correct data", async () => {
    const registerMock = jest.fn();
    mockedUseAuth.mockReturnValue({
      register: registerMock,
    });

    render(<SignUp />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: "testing" } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "password123" } });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Register/i }));

    // Wait for async actions to complete
    await waitFor(() => {
      expect(mockedRegisterUser).toHaveBeenCalledWith({ email: "test@example.com", password: "password123", username: "testing" });
    });
    expect(registerMock).toHaveBeenCalled();
  });

  test("renders a link to the registration page", () => {
    render(<SignUp />);
    const registerLink = screen.getByRole("link", { name: /Sign in/i });
    expect(registerLink).toHaveAttribute("href", "/login");
  });
});
