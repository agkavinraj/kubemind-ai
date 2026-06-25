import client from "./client";
import type { Service } from "../types/service";

export async function getServices(): Promise<Service[]> {
  const response = await client.get("/services");
  return response.data;
}