import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { ThreatScoreGauge } from "@/components/dashboard/ThreatScoreGauge";
import { AlertItem, Alert } from "@/components/dashboard/AlertItem";
import { RecruiterCard, Recruiter } from "@/components/dashboard/RecruiterCard";
import { MessageAnalyzer } from "@/components/dashboard/MessageAnalyzer";
import { ThreatTimeline } from "@/components/dashboard/ThreatTimeline";
import { LiveThreatFeed } from "@/components/dashboard/LiveThreatFeed";
import { TrustScoreChart } from "@/components/dashboard/TrustScoreChart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  AlertTriangle, 
  Users, 
  FileSearch, 
  RefreshCw
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "critical",
    title: "Advance Fee Fraud Detected",
    description: "A recruiter is requesting payment for 'processing fees' before job placement. This is a common scam pattern.",
    timestamp: "5 mins ago",
    source: "WhatsApp Monitor"
  },
  {
    id: "2",
    type: "warning",
    title: "Suspicious Domain Age",
    description: "The recruiter's company domain was registered only 2 weeks ago. Exercise caution.",
    timestamp: "23 mins ago",
    source: "Domain Analysis"
  },
  {
    id: "3",
    type: "info",
    title: "New Recruiter Contact",
    description: "First contact from recruiter@techcorp.io. Background check in progress.",
    timestamp: "1 hour ago",
    source: "Email Scanner"
  }
];

const mockRecruiter: Recruiter = {
  id: "1",
  name: "Sarah Johnson",
  email: "sarah.j@quickhire-solutions.com",
  company: "QuickHire Solutions",
  domain: "quickhire-solutions.com",
  domainAge: "14 days old",
  messageCount: 8,
  threatScore: 78,
  flags: ["New Domain", "Payment Request", "Urgency Tactics"],
  lastContact: "2 hours ago"
};

const Index = () => {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    toast.success("Dashboard refreshed", {
      description: "All threat data has been updated"
    });
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold mb-1">Threat Dashboard</h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            Real-time job scam detection & prevention
          </p>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <Badge variant="cyber" className="px-2 md:px-3 py-1 text-xs">
            <span className="mr-1 md:mr-2">●</span>
            <span className="hidden sm:inline">Real-time </span>Protection
          </Badge>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
            <span className="hidden sm:inline ml-2">Refresh</span>
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Threats Blocked"
          value="1,247"
          change="+12% from last week"
          changeType="negative"
          icon={Shield}
          iconColor="success"
        />
        <StatCard
          title="Active Alerts"
          value="12"
          change="3 critical"
          changeType="negative"
          icon={AlertTriangle}
          iconColor="destructive"
        />
        <StatCard
          title="Recruiters Analyzed"
          value="89"
          change="23 flagged"
          changeType="neutral"
          icon={Users}
          iconColor="warning"
        />
        <StatCard
          title="Documents Scanned"
          value="156"
          change="8 suspicious"
          changeType="neutral"
          icon={FileSearch}
          iconColor="primary"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Trust Score Chart */}
          <TrustScoreChart />

          {/* Message Analyzer */}
          <MessageAnalyzer />

          {/* Flagged Recruiter */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Flagged Recruiter</h2>
              <Button variant="ghost" size="sm" className="text-primary" onClick={() => navigate("/recruiters")}>
                View All →
              </Button>
            </div>
            <RecruiterCard recruiter={mockRecruiter} />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Current Threat Level */}
          <div className="glass-card rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Current Threat Level</h3>
              <Badge variant="danger">ELEVATED</Badge>
            </div>
            <div className="flex justify-center">
              <ThreatScoreGauge score={72} size="lg" label="Overall Risk Score" />
            </div>
          </div>

          {/* Live Threat Feed */}
          <LiveThreatFeed />

          {/* Threat Timeline */}
          <ThreatTimeline />

          {/* Recent Alerts */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Recent Alerts</h3>
              <Button variant="ghost" size="sm" className="text-primary" onClick={() => navigate("/alerts")}>
                View All →
              </Button>
            </div>
            <div className="space-y-2">
              {mockAlerts.map((alert) => (
                <AlertItem key={alert.id} alert={alert} onClick={() => navigate("/alerts")} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
