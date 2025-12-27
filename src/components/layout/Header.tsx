import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  Search, 
  User,
  ChevronDown,
  Settings,
  Shield,
  LogOut,
  HelpCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  sidebarCollapsed: boolean;
}

const notifications = [
  { id: 1, title: "Critical threat detected", description: "Advance fee fraud attempt blocked", time: "2 mins ago", type: "critical" },
  { id: 2, title: "New recruiter flagged", description: "sarah.j@quickhire.com marked suspicious", time: "15 mins ago", type: "warning" },
  { id: 3, title: "Document scan complete", description: "offer_letter.pdf analysis ready", time: "1 hour ago", type: "info" },
];

export const Header = ({ sidebarCollapsed }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className={cn(
      "fixed top-0 right-0 z-30 h-16",
      "bg-background/80 backdrop-blur-xl border-b border-border/50",
      "transition-all duration-300 ease-in-out",
      "left-0 lg:left-[260px]",
      sidebarCollapsed && "lg:left-[72px]"
    )}>
      <div className="h-full px-4 md:px-6 flex items-center justify-between">
        {/* Spacer for mobile menu button */}
        <div className="w-10 lg:hidden" />
        
        {/* Search */}
        <div className="relative flex-1 max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className={cn(
              "w-full h-9 md:h-10 pl-9 md:pl-10 pr-3 md:pr-12 rounded-lg",
              "bg-secondary/50 border border-border/50",
              "text-sm placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50",
              "transition-all duration-200"
            )}
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground font-mono bg-secondary px-1.5 py-0.5 rounded hidden md:block">
            ⌘K
          </kbd>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Status - hidden on small screens */}
          <div className="hidden sm:flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-lg bg-success/10 border border-success/20">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs text-success font-medium hidden md:inline">Protection Active</span>
          </div>

          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-[10px] font-bold flex items-center justify-center animate-pulse">
                  3
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-3 border-b border-border">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm">Notifications</h4>
                  <Button variant="ghost" size="sm" className="text-xs text-primary h-auto p-0">
                    Mark all read
                  </Button>
                </div>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-3 hover:bg-secondary/50 cursor-pointer border-b border-border/50 last:border-0"
                    onClick={() => navigate("/alerts")}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full mt-2",
                        notification.type === "critical" && "bg-danger",
                        notification.type === "warning" && "bg-warning",
                        notification.type === "info" && "bg-primary"
                      )} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{notification.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{notification.description}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t border-border">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full text-primary"
                  onClick={() => navigate("/alerts")}
                >
                  View all notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 pl-4 border-l border-border/50 hover:opacity-80 transition-opacity cursor-pointer">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-[10px] text-muted-foreground">Premium User</p>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>John Doe</span>
                  <span className="text-xs font-normal text-muted-foreground">john.doe@example.com</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/security")}>
                <Shield className="w-4 h-4 mr-2" />
                Security
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="w-4 h-4 mr-2" />
                Help & Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-danger focus:text-danger">
                <LogOut className="w-4 h-4 mr-2" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
