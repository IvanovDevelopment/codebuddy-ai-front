import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export interface ChatResponse {
  reply: string;
}

export const sendMessage = async (message: string): Promise<ChatResponse> => {
  const response = await axios.post(`${API_URL}/chat`, { message });
  return response.data;
};
