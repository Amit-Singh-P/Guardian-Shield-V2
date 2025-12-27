import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AlertItem, Alert } from "@/components/dashboard/AlertItem";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Bell, 
  Filter,
  CheckCheck,
  AlertTriangle,
  Info,
  Shield
} from "lucide-react";

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "critical",
    title: "Advance Fee Fraud Detected",
    description: "A recruiter is requesting payment for 'processing fees' before job placement. This is a common scam pattern. The request came from an unverified email domain.",
    timestamp: "5 mins ago",
    source: "WhatsApp Monitor"
  },
  {
    id: "2",
    type: "critical",
    title: "Cryptocurrency Payment Request",
    description: "Detected request for cryptocurrency payment in job communication. This is a major red flag for employment scams.",
    timestamp: "15 mins ago",
    source: "Email Scanner"
  },
  {
    id: "3",
    type: "warning",
    title: "Suspicious Domain Age",
    description: "The recruiter's company domain was registered only 2 weeks ago. New domains are commonly used in scam operations.",
    timestamp: "23 mins ago",
    source: "Domain Analysis"
  },
  {
    id: "4",
    type: "warning",
    title: "Urgency Tactics Detected",
    description: "Multiple messages containing urgency language detected. Pressure tactics are common in job scams.",
    timestamp: "45 mins ago",
    source: "NLP Engine"
  },
  {
    id: "5",
    type: "info",
    title: "New Recruiter Contact",
    description: "First contact from recruiter@techcorp.io. Background check in progress.",
    timestamp: "1 hour ago",
    source: "Email Scanner"
  },
  {
    id: "6",
    type: "info",
    title: "Document Scan Complete",
    description: "Offer letter analysis complete. No immediate threats detected but some anomalies flagged for review.",
    timestamp: "2 hours ago",
    source: "Document Forensics"
  },
  {
    id: "7",
    type: "critical",
    title: "SSN Request Detected",
    description: "Request for Social Security Number detected in early stage of recruitment process. Legitimate employers don't ask for SSN before hiring.",
    timestamp: "3 hours ago",
    source: "Message Analyzer"
  }
];

const Alerts = () => {
  const [filter, setFilter] = useState<"all" | "critical" | "warning" | "info">("all");

  const filteredAlerts = mockAlerts.filter(a => {
    if (filter === "all") return true;
    return a.type === filter;
  });

  const stats = {
    total: mockAlerts.length,
    critical: mockAlerts.filter(a => a.type === "critical").length,
    warning: mockAlerts.filter(a => a.type === "warning").length,
    info: mockAlerts.filter(a => a.type === "info").length
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold mb-1">Alert Center</h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            Real-time security alerts and threat notifications
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <CheckCheck className="w-4 h-4" />
            <span className="hidden sm:inline ml-2">Mark All Read</span>
          </Button>
          <Button variant="cyber" size="sm">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline ml-2">Configure</span>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "glass-card rounded-xl p-3 md:p-4 flex items-center gap-3 md:gap-4 text-left transition-all",
            filter === "all" && "border-primary/50 glow-primary"
          )}
        >
          <div className="p-2 md:p-3 rounded-lg bg-primary/10">
            <Bell className="w-4 md:w-5 h-4 md:h-5 text-primary" />
          </div>
          <div>
            <p className="text-xl md:text-2xl font-bold">{stats.total}</p>
            <p className="text-[10px] md:text-xs text-muted-foreground">Total</p>
          </div>
        </button>
        <button
          onClick={() => setFilter("critical")}
          className={cn(
            "glass-card rounded-xl p-3 md:p-4 flex items-center gap-3 md:gap-4 text-left transition-all",
            filter === "critical" && "border-destructive/50 glow-danger"
          )}
        >
          <div className="p-2 md:p-3 rounded-lg bg-destructive/10">
            <AlertTriangle className="w-4 md:w-5 h-4 md:h-5 text-destructive" />
          </div>
          <div>
            <p className="text-xl md:text-2xl font-bold text-destructive">{stats.critical}</p>
            <p className="text-[10px] md:text-xs text-muted-foreground">Critical</p>
          </div>
        </button>
        <button
          onClick={() => setFilter("warning")}
          className={cn(
            "glass-card rounded-xl p-3 md:p-4 flex items-center gap-3 md:gap-4 text-left transition-all",
            filter === "warning" && "border-warning/50 glow-warning"
          )}
        >
          <div className="p-2 md:p-3 rounded-lg bg-warning/10">
            <AlertTriangle className="w-4 md:w-5 h-4 md:h-5 text-warning" />
          </div>
          <div>
            <p className="text-xl md:text-2xl font-bold text-warning">{stats.warning}</p>
            <p className="text-[10px] md:text-xs text-muted-foreground">Warnings</p>
          </div>
        </button>
        <button
          onClick={() => setFilter("info")}
          className={cn(
            "glass-card rounded-xl p-3 md:p-4 flex items-center gap-3 md:gap-4 text-left transition-all",
            filter === "info" && "border-primary/50 glow-primary"
          )}
        >
          <div className="p-2 md:p-3 rounded-lg bg-primary/10">
            <Info className="w-4 md:w-5 h-4 md:h-5 text-primary" />
          </div>
          <div>
            <p className="text-xl md:text-2xl font-bold text-primary">{stats.info}</p>
            <p className="text-[10px] md:text-xs text-muted-foreground">Info</p>
          </div>
        </button>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => (
          <AlertItem key={alert.id} alert={alert} />
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="text-center py-12">
          <Shield className="w-12 h-12 text-success mx-auto mb-4" />
          <p className="text-muted-foreground">No alerts in this category</p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Alerts;
