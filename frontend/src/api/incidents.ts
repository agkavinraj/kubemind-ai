import client from "./client";

export async function getIncidentHistory() {
    const response = await client.get("/incident-history");
    return response.data;
}