import { useEffect, useState } from "react";
import { getClusterHealth } from "../api/health";

export function useClusterHealth() {

    const [health, setHealth] = useState({
        running: 0,
        pending: 0,
        failed: 0,
        restarting: 0,
    });

    useEffect(() => {

        getClusterHealth().then(setHealth);

    }, []);

    return health;
}