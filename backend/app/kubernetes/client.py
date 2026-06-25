from kubernetes import client, config
from kubernetes.config.config_exception import ConfigException


class KubernetesClient:
    def __init__(self):
        self.load_config()

        self.core_v1 = client.CoreV1Api()
        self.apps_v1 = client.AppsV1Api()

    def load_config(self):
        """
        Load Kubernetes configuration.

        Local Development:
            ~/.kube/config

        Production:
            In-cluster configuration
        """

        try:
            config.load_kube_config()
            print("Connected using local kubeconfig.")
        except ConfigException:
            config.load_incluster_config()
            print("Connected using in-cluster configuration.")


k8s_client = KubernetesClient()