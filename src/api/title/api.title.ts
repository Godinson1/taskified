import api from "../index";

export interface ITitleData {
  createdAt?: string;
  deletedAt?: string;
  title: string;
  updatedAt?: string;
  uuid?: string;
}

export const addTitle = async (titleRequest: { title: string }) => {
  try {
    const response = await api.post("/title", titleRequest);
    console.log("response-data", response);
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getTitles = async (): Promise<ITitleData[] | []> => {
  try {
    const response = await api.get("/title");
    return response.data;
  } catch (error) {
    console.log("error-title", error);
    return [];
  }
};
