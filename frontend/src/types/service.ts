export interface Service {
  name: string;
  namespace: string;
  service_type: string;
  cluster_ip: string;
  ports: string[];
}