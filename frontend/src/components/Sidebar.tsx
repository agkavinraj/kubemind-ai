import { Link, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  Boxes,
  Server,
  Network,
  TriangleAlert,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Pods",
      path: "/pods",
      icon: Boxes,
    },
    {
      name: "Deployments",
      path: "/deployments",
      icon: Server,
    },
    {
      name: "Services",
      path: "/services",
      icon: Network,
    },
    {
      name: "AI Incidents",
      path: "/incidents",
      icon: TriangleAlert,
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen">

      <div className="p-6 text-2xl font-bold border-b border-slate-700">
        KubeMind
      </div>

      <nav className="mt-4">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-6 py-3 transition ${
                location.pathname === item.path
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`}
            >
              <Icon size={18} />

              {item.name}
            </Link>
          );
        })}

      </nav>

    </aside>
  );
}