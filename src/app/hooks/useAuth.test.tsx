import { renderHook, act, screen, render } from "@testing-library/react";
import { AuthGuard, AuthProvider, useAuth } from "./useAuth";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("jwt-decode", () => ({
  jwtDecode: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
  },
}));

const mockRouterPush = jest.fn();

describe("useAuth", () => {
  const mockJwtDecode = jwtDecode as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    localStorage.clear();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => <AuthProvider>{children}</AuthProvider>;

  it("should initialize with the user from localStorage if token is valid", () => {
    const token = "mockValidToken";
    localStorage.setItem("jwt", token);
    const dataTime = Date.now() / 1000 + 60 * 60;
    mockJwtDecode.mockReturnValue({ exp: dataTime });

    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.user).toEqual({ exp: dataTime });
  });

  it("should initialize without user if token is expired", () => {
    const token = "mockExpiredToken";
    localStorage.setItem("jwt", token);
    mockJwtDecode.mockReturnValue({ exp: Date.now() / 1000 - 60 });

    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.user).toBeNull();
  });

  it("should login and set user correctly", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    const token = "mockToken";
    const decodedUser = { exp: Date.now() / 1000 + 60 * 60 };
    mockJwtDecode.mockReturnValue(decodedUser);

    act(() => result.current.login(token));

    expect(localStorage.getItem("jwt")).toBe(token);
    expect(result.current.user).toEqual(decodedUser);
    expect(toast.success).toHaveBeenCalledWith("Login Succeeded!");
    expect(mockRouterPush).toHaveBeenCalledWith("/dashboard");
  });

  it("should call register and redirect to /login", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => result.current.register());

    expect(mockRouterPush).toHaveBeenCalledWith("/login");
  });

  it("should logout and clear user data", () => {
    localStorage.setItem("jwt", "mockToken");
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => result.current.logout());

    expect(localStorage.getItem("jwt")).toBeNull();
    expect(result.current.user).toBeNull();
    expect(mockRouterPush).toHaveBeenCalledWith("/login");
  });

  it("should update user with setUser", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    const newUser = { name: "John Doe" };

    act(() => result.current.setUser(newUser));

    expect(result.current.user).toEqual(newUser);
  });
});

describe("AuthGuard", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => <AuthProvider>{children}</AuthProvider>;

  it("should redirect to /login if user is not authenticated", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    act(() => result.current.setUser(null));

    render(
      <AuthProvider>
        <AuthGuard>Protected Content</AuthGuard>
      </AuthProvider>
    );

    expect(mockRouterPush).toHaveBeenCalledWith("/login");
  });

  it("should render children if user is authenticated", () => {
    const token = "mockToken";
    localStorage.setItem("jwt", token);
    const { result } = renderHook(() => useAuth(), { wrapper });
    act(() => result.current.setUser({ name: "John Doe" }));

    render(
      <AuthProvider>
        <AuthGuard>Protected Content</AuthGuard>
      </AuthProvider>
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });
});
