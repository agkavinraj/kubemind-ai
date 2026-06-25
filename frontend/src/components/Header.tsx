import { Bot } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">

      <div className="flex items-center gap-3">
        <Bot className="text-blue-600" size={28} />

        <div>
          <h1 className="text-xl font-bold">
            KubeMind AI
          </h1>

          <p className="text-sm text-gray-500">
            Kubernetes AI Platform
          </p>
        </div>
      </div>

    </header>
  );
}