import client from "./client";
import type { Deployment } from "../types/deployments";

export async function getDeployments(): Promise<Deployment[]> {
  const response = await client.get("/deployments");
  return response.data;
}