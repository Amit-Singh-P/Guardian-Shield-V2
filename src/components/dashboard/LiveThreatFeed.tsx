import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Activity, Wifi } from "lucide-react";

interface ThreatItem {
  id: string;
  type: string;
  location: string;
  timestamp: string;
}

const generateThreat = (): ThreatItem => {
  const types = [
    "Crypto job scam",
    "Fake HR email",
    "Task scam",
    "Advance fee fraud",
    "Recruiter impersonation",
    "Phishing attempt",
    "Fake internship"
  ];
  const locations = [
    "Mumbai, IN",
    "Delhi, IN",
    "Bangalore, IN",
    "Lagos, NG",
    "London, UK",
    "New York, US",
    "Dubai, UAE",
    "Singapore, SG"
  ];

  return {
    id: Math.random().toString(36).substr(2, 9),
    type: types[Math.floor(Math.random() * types.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    timestamp: "Just now"
  };
};

export const LiveThreatFeed = () => {
  const [threats, setThreats] = useState<ThreatItem[]>([
    { id: "1", type: "Advance fee fraud", location: "Mumbai, IN", timestamp: "2s ago" },
    { id: "2", type: "Crypto job scam", location: "Delhi, IN", timestamp: "5s ago" },
    { id: "3", type: "Fake HR email", location: "Bangalore, IN", timestamp: "8s ago" },
    { id: "4", type: "Task scam", location: "Lagos, NG", timestamp: "12s ago" },
    { id: "5", type: "Recruiter impersonation", location: "London, UK", timestamp: "15s ago" },
  ]);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const newThreat = generateThreat();
      setThreats(prev => [newThreat, ...prev.slice(0, 4)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card rounded-xl p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary animate-pulse" />
          <h3 className="font-semibold">Live Threat Feed</h3>
        </div>
        <div className="flex items-center gap-2">
          <Wifi className={cn(
            "w-4 h-4",
            isConnected ? "text-success" : "text-destructive"
          )} />
          <Badge variant={isConnected ? "safe" : "danger"} className="text-[10px]">
            {isConnected ? "CONNECTED" : "OFFLINE"}
          </Badge>
        </div>
      </div>

      <div className="space-y-2">
        {threats.map((threat, index) => (
          <div
            key={threat.id}
            className={cn(
              "p-3 rounded-lg bg-secondary/30 border border-border/50",
              "transition-all duration-500",
              index === 0 && "animate-slide-in-right border-destructive/30 bg-destructive/5"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  index === 0 ? "bg-destructive animate-pulse" : "bg-warning"
                )} />
                <span className="text-sm font-medium">{threat.type}</span>
              </div>
              <span className="text-[10px] text-muted-foreground font-mono">
                {threat.timestamp}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1 ml-4">
              Detected in {threat.location}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border/50">
        <p className="text-xs text-muted-foreground text-center">
          Monitoring <span className="text-primary font-mono">2,847</span> active threats globally
        </p>
      </div>
    </div>
  );
};
