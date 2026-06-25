import client from "./client";

export const getPods = async () => {
  const response = await client.get("/pods");
  return response.data;
};