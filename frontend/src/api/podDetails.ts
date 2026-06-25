import client from "./client";

export async function getPodDetails(
  namespace: string,
  podName: string
) {
  const response = await client.get(
    `/pod-details/${namespace}/${podName}`
  );

  return response.data;
}