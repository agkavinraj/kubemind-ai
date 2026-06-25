import client from "./client";
import type { Pod } from "../types/pod";

export async function getClusterHealth() {
  const response = await client.get<Pod[]>("/pods");

  const pods = response.data;

  const health = {
    running: 0,
    pending: 0,
    failed: 0,
    restarting: 0,
  };

  pods.forEach((pod) => {
    switch (pod.status) {
      case "Running":
        health.running++;
        break;

      case "Pending":
        health.pending++;
        break;

      case "Failed":
        health.failed++;
        break;
    }
  });

  return health;
}