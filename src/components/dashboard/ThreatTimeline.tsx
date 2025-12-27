import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  AlertTriangle, 
  Mail, 
  FileText, 
  MessageSquare,
  Clock
} from "lucide-react";

interface TimelineEvent {
  id: string;
  type: "message" | "document" | "email" | "alert";
  title: string;
  description: string;
  timestamp: string;
  threatLevel: "low" | "medium" | "high";
}

const mockEvents: TimelineEvent[] = [
  {
    id: "1",
    type: "email",
    title: "Initial Contact",
    description: "Received unsolicited job offer from unknown sender",
    timestamp: "2 hours ago",
    threatLevel: "medium"
  },
  {
    id: "2",
    type: "message",
    title: "WhatsApp Message",
    description: "Recruiter moved conversation to personal messaging",
    timestamp: "1 hour ago",
    threatLevel: "high"
  },
  {
    id: "3",
    type: "document",
    title: "Offer Letter Received",
    description: "PDF document with suspicious metadata detected",
    timestamp: "45 mins ago",
    threatLevel: "high"
  },
  {
    id: "4",
    type: "alert",
    title: "Payment Request",
    description: "Request for 'processing fee' detected in message",
    timestamp: "30 mins ago",
    threatLevel: "high"
  }
];

export const ThreatTimeline = () => {
  const getIcon = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "email": return Mail;
      case "message": return MessageSquare;
      case "document": return FileText;
      case "alert": return AlertTriangle;
    }
  };

  const getColors = (level: TimelineEvent["threatLevel"]) => {
    switch (level) {
      case "low": return { dot: "bg-success", line: "bg-success/30", badge: "safe" as const };
      case "medium": return { dot: "bg-warning", line: "bg-warning/30", badge: "warning" as const };
      case "high": return { dot: "bg-destructive", line: "bg-destructive/30", badge: "danger" as const };
    }
  };

  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Threat Timeline</h3>
        </div>
        <Badge variant="cyber">Live Updates</Badge>
      </div>

      <div className="relative space-y-0">
        {mockEvents.map((event, index) => {
          const Icon = getIcon(event.type);
          const colors = getColors(event.threatLevel);
          const isLast = index === mockEvents.length - 1;

          return (
            <div key={event.id} className="relative flex gap-4 pb-6">
              {/* Timeline line */}
              {!isLast && (
                <div 
                  className={cn(
                    "absolute left-[19px] top-10 w-0.5 h-[calc(100%-16px)]",
                    colors.line
                  )} 
                />
              )}

              {/* Dot */}
              <div className={cn(
                "relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                "border-2 border-background",
                colors.dot
              )}>
                <Icon className="w-4 h-4 text-background" />
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-sm">{event.title}</h4>
                  <Badge variant={colors.badge} className="text-[10px]">
                    {event.threatLevel.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-1">
                  {event.description}
                </p>
                <p className="text-[10px] text-muted-foreground/60 font-mono">
                  {event.timestamp}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
