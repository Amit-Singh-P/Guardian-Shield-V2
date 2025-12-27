import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <Header sidebarCollapsed={sidebarCollapsed} />
      <main className={cn(
        "pt-16 min-h-screen transition-all duration-300 ease-in-out",
        isMobile ? "pl-0" : (sidebarCollapsed ? "pl-[72px]" : "pl-[260px]")
      )}>
        <div className="p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  );
};
