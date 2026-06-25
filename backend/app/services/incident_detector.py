class IncidentDetector:
    IGNORED_NAMESPACES = {
        "kube-system",
        "kube-public",
        "kube-node-lease",
        "local-path-storage",
    }
    
    CRITICAL_STATES = {
        "CrashLoopBackOff",
        "ImagePullBackOff",
        "ErrImagePull",
        "OOMKilled",
        "CreateContainerConfigError",
        "CreateContainerError",
        "RunContainerError",
        "Failed",
    }

    @classmethod
    def is_incident(cls, pod) -> bool:

        if pod.metadata.namespace in cls.IGNORED_NAMESPACES:
            return False

        if not pod.status.container_statuses:
            return False

        for container in pod.status.container_statuses:

            # Waiting state
            if container.state.waiting:

                reason = container.state.waiting.reason

                if reason in cls.CRITICAL_STATES:
                    return True

            # Terminated state
            if container.state.terminated:

                reason = container.state.terminated.reason

                if reason in cls.CRITICAL_STATES:
                    return True

            # Too many restarts
            if container.restart_count >= 3:
                return True

        return False