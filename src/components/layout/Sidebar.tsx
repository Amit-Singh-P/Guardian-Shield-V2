import { cn } from "@/lib/utils";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  FileSearch,
  Bell,
  Shield,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  Brain,
  Menu
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { 
    icon: LayoutDashboard, 
    label: "Dashboard", 
    to: "/",
    badge: null
  },
  { 
    icon: MessageSquare, 
    label: "Message Analysis", 
    to: "/messages",
    badge: null
  },
  { 
    icon: Users, 
    label: "Recruiter Intel", 
    to: "/recruiters",
    badge: "3"
  },
  { 
    icon: FileSearch, 
    label: "Document Forensics", 
    to: "/documents",
    badge: null
  },
  { 
    icon: Bell, 
    label: "Alerts", 
    to: "/alerts",
    badge: "12"
  },
  { 
    icon: Brain, 
    label: "AI Simulator", 
    to: "/simulator",
    badge: "NEW"
  },
];

const bottomItems = [
  { icon: Shield, label: "Security", to: "/security" },
  { icon: Settings, label: "Settings", to: "/settings" },
];

const SidebarContent = ({ collapsed, onToggle, onNavClick }: { collapsed: boolean; onToggle: () => void; onNavClick?: () => void }) => (
  <>
    {/* Logo */}
    <div className={cn(
      "h-16 flex items-center border-b border-border/50",
      collapsed ? "px-4 justify-center" : "px-5"
    )}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center glow-primary">
          <Zap className="w-5 h-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div>
            <h1 className="font-bold text-lg tracking-tight">ScamShield</h1>
            <p className="text-[10px] text-muted-foreground font-mono">v2.0 BETA</p>
          </div>
        )}
      </div>
    </div>

    {/* Navigation */}
    <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-cyber">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg",
            "text-muted-foreground hover:text-foreground",
            "hover:bg-secondary/50 transition-all duration-200",
            collapsed && "justify-center"
          )}
          activeClassName="bg-primary/10 text-primary border border-primary/20"
          end={item.to === "/"}
          onClick={onNavClick}
        >
          <item.icon className="w-5 h-5 flex-shrink-0" />
          {!collapsed && (
            <>
              <span className="flex-1 font-medium text-sm">{item.label}</span>
              {item.badge && (
                <Badge 
                  variant={item.badge === "NEW" ? "cyber" : "danger"} 
                  className="text-[10px] px-1.5"
                >
                  {item.badge}
                </Badge>
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>

    {/* Bottom items */}
    <div className="p-3 space-y-1 border-t border-border/50">
      {bottomItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg",
            "text-muted-foreground hover:text-foreground",
            "hover:bg-secondary/50 transition-all duration-200",
            collapsed && "justify-center"
          )}
          activeClassName="bg-primary/10 text-primary"
          onClick={onNavClick}
        >
          <item.icon className="w-5 h-5 flex-shrink-0" />
          {!collapsed && (
            <span className="font-medium text-sm">{item.label}</span>
          )}
        </NavLink>
      ))}
    </div>

    {/* Toggle button - only show on desktop */}
    {!onNavClick && (
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border shadow-lg hidden lg:flex"
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3" />
        ) : (
          <ChevronLeft className="w-3 h-3" />
        )}
      </Button>
    )}
  </>
);

export const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const isMobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Mobile sidebar using Sheet
  if (isMobile) {
    return (
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed left-4 top-4 z-50 lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-[260px] bg-card/95 backdrop-blur-xl">
          <div className="h-full flex flex-col">
            <SidebarContent 
              collapsed={false} 
              onToggle={onToggle} 
              onNavClick={() => setMobileOpen(false)} 
            />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop sidebar
  return (
    <aside className={cn(
      "fixed left-0 top-0 z-40 h-screen flex-col hidden lg:flex",
      "bg-card/50 backdrop-blur-xl border-r border-border/50",
      "transition-all duration-300 ease-in-out",
      collapsed ? "w-[72px]" : "w-[260px]"
    )}>
      <SidebarContent collapsed={collapsed} onToggle={onToggle} />
    </aside>
  );
};