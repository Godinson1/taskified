import { renderHook, act, waitFor } from "@testing-library/react";
import { useTitle } from "./useTitle";
import { getTitles, addTitle } from "@/api/title/api.title";
import { connectToMetaMask } from "@/services/wallet.service";
import { toast } from "react-toastify";

// Mock the API calls and toast notifications
jest.mock("../../api/title/api.title");
jest.mock("../../services/wallet.service");
jest.mock("react-toastify");

const mockedGetTitles = getTitles as jest.Mock;
const mockedAddTitle = addTitle as jest.Mock;
const mockedConnectToMetaMask = connectToMetaMask as jest.Mock;
const mockedToastError = toast.error as jest.Mock;

describe("useTitle Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should fetch and set titles on mount", async () => {
    const mockTitles = [{ title: "Sample Title", createdAt: new Date().toISOString() }];
    mockedGetTitles.mockResolvedValueOnce(mockTitles);

    const { result } = renderHook(() => useTitle());

    await waitFor(() => {
      expect(mockedGetTitles).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(result.current.titles).toEqual(mockTitles);
    });
  });

  test("should connect to MetaMask and set wallet address", async () => {
    const mockAddress = "0x123456789abcdef";
    mockedConnectToMetaMask.mockResolvedValueOnce({ address: mockAddress });

    const { result } = renderHook(() => useTitle());

    await act(async () => {
      await result.current.handleMetaMaskConnect();
    });

    await waitFor(() => {
      expect(mockedConnectToMetaMask).toHaveBeenCalled();
    });

    expect(result.current.walletAddress).toBe(mockAddress);
  });

  test("should show error if trying to add title without MetaMask connected", async () => {
    const { result } = renderHook(() => useTitle());

    await act(async () => {
      await result.current.addToTitles();
    });

    expect(mockedToastError).toHaveBeenCalledWith("Please connect MetaMask");
  });

  test("should add a new title when MetaMask is connected", async () => {
    const mockAddress = "0x123456789abcdef";
    const newTitle = "New Sample Title";
    const mockCreatedAt = new Date().toISOString();

    mockedConnectToMetaMask.mockResolvedValueOnce({ address: mockAddress });
    mockedAddTitle.mockResolvedValueOnce({ title: newTitle, createdAt: mockCreatedAt });

    const { result } = renderHook(() => useTitle());

    // Connect MetaMask
    await act(async () => {
      await result.current.handleMetaMaskConnect();
    });

    // Set new title and add it
    act(() => {
      result.current.setNewTitle(newTitle);
    });

    await act(async () => {
      await result.current.addToTitles();
    });

    expect(mockedAddTitle).toHaveBeenCalledWith({ title: newTitle });
    expect(result.current.titles).toContainEqual({ title: newTitle, createdAt: mockCreatedAt });
    expect(result.current.newTitle).toBe("");
  });
});
