import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "./Login";
import { loginUser } from "@/api/authentication/api.auth";
import { useAuth } from "@/app/hooks/useAuth";

jest.mock("../../../api/authentication/api.auth");
jest.mock("../../hooks/useAuth");

const mockedLoginUser = loginUser as jest.Mock;
const mockedUseAuth = useAuth as jest.Mock;

describe("Login Component", () => {
  beforeEach(() => {
    mockedUseAuth.mockReturnValue({
      login: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the login form with email and password fields", () => {
    render(<Login />);

    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  test("submits the form with the correct data", async () => {
    const loginData = { token: "fake-token" };
    mockedLoginUser.mockResolvedValueOnce(loginData);
    const loginMock = jest.fn();
    mockedUseAuth.mockReturnValue({
      login: loginMock,
    });

    render(<Login />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "password123" } });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    // Wait for async actions to complete
    await waitFor(() => {
      expect(mockedLoginUser).toHaveBeenCalledWith({ email: "test@example.com", password: "password123" });
    });
    expect(loginMock).toHaveBeenCalledWith(loginData);
  });

  test("renders a link to the registration page", () => {
    render(<Login />);
    const registerLink = screen.getByRole("link", { name: /Sign Up/i });
    expect(registerLink).toHaveAttribute("href", "/register");
  });
});
