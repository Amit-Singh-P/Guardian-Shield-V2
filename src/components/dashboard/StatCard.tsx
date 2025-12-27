import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: "primary" | "destructive" | "success" | "warning";
  className?: string;
}

export const StatCard = ({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "primary",
  className,
}: StatCardProps) => {
  const iconColorClasses = {
    primary: "text-primary bg-primary/10 border-primary/20",
    destructive: "text-destructive bg-destructive/10 border-destructive/20",
    success: "text-success bg-success/10 border-success/20",
    warning: "text-warning bg-warning/10 border-warning/20",
  };

  const changeColorClasses = {
    positive: "text-success",
    negative: "text-destructive",
    neutral: "text-muted-foreground",
  };

  return (
    <div className={cn(
      "glass-card rounded-xl p-5 transition-all duration-300 hover:border-primary/30",
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-2xl font-bold font-mono tracking-tight">{value}</p>
          {change && (
            <p className={cn("text-xs font-medium", changeColorClasses[changeType])}>
              {change}
            </p>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-lg border",
          iconColorClasses[iconColor]
        )}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
