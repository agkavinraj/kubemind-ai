import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Pods from "./pages/Pods";
import Deployments from "./pages/Deployments";
import Services from "./pages/Services";
import Incidents from "./pages/Incidents";
import PodDetails from "./pages/PodDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="pods" element={<Pods />} />
        <Route path="deployments" element={<Deployments />} />
        <Route path="services" element={<Services />} />
        <Route path="incidents" element={<Incidents />} />
        <Route path="pods/:namespace/:podName" element={<PodDetails />} />
      </Route>
    </Routes>
  );
}