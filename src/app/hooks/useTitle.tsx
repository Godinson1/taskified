import { getTitles } from "@/api/title/api.title";
import { useEffect, useState } from "react";
import { ITitleData, addTitle } from "@/api/title/api.title";
import { toast } from "react-toastify";
import { connectToMetaMask } from "@/services/wallet.service";

export const useTitle = () => {
  const [titles, setTitles] = useState<ITitleData[]>([]);
  const [newTitle, setNewTitle] = useState<string>("");
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    getAllTitles();
  }, []);

  const getAllTitles = async () => {
    const response = await getTitles();
    if (titles) {
      setTitles(response);
    }
  };

  const handleMetaMaskConnect = async () => {
    const data = await connectToMetaMask();
    if (data) setWalletAddress(data.address);
  };

  const addToTitles = async () => {
    if (!walletAddress) return toast.error("Please connect MetaMask");
    const data = await addTitle({ title: newTitle });
    setTitles((prevState: ITitleData[]) => [...prevState, { title: data.title, createdAt: data.createdAt }]);
    setNewTitle("");
  };

  return {
    titles,
    newTitle,
    setNewTitle,
    addToTitles,
    getAllTitles,
    handleMetaMaskConnect,
  };
};
