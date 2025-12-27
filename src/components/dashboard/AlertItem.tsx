import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, Clock, ChevronRight } from "lucide-react";

export interface Alert {
  id: string;
  type: "critical" | "warning" | "info";
  title: string;
  description: string;
  timestamp: string;
  source: string;
}

interface AlertItemProps {
  alert: Alert;
  onClick?: () => void;
}

export const AlertItem = ({ alert, onClick }: AlertItemProps) => {
  const typeConfig = {
    critical: {
      icon: AlertTriangle,
      badge: "danger" as const,
      iconClass: "text-destructive",
      borderClass: "border-l-destructive",
    },
    warning: {
      icon: AlertTriangle,
      badge: "warning" as const,
      iconClass: "text-warning",
      borderClass: "border-l-warning",
    },
    info: {
      icon: Shield,
      badge: "cyber" as const,
      iconClass: "text-primary",
      borderClass: "border-l-primary",
    },
  };

  const config = typeConfig[alert.type];
  const Icon = config.icon;

  return (
    <div
      onClick={onClick}
      className={cn(
        "glass-card rounded-lg p-4 border-l-4 cursor-pointer transition-all duration-200",
        "hover:bg-secondary/50 hover:border-primary/30",
        config.borderClass
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn("p-2 rounded-lg bg-secondary/50", config.iconClass)}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-sm truncate">{alert.title}</h4>
            <Badge variant={config.badge} className="text-[10px] px-1.5 py-0">
              {alert.type.toUpperCase()}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
            {alert.description}
          </p>
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {alert.timestamp}
            </span>
            <span className="font-mono">{alert.source}</span>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      </div>
    </div>
  );
};
