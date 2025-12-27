import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { RecruiterCard, Recruiter } from "@/components/dashboard/RecruiterCard";
import { ThreatScoreGauge } from "@/components/dashboard/ThreatScoreGauge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Users, 
  Search, 
  Filter,
  SortAsc,
  AlertTriangle,
  Shield,
  Plus
} from "lucide-react";

const mockRecruiters: Recruiter[] = [
  {
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
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike@global-recruitment.xyz",
    company: "Global Recruitment",
    domain: "global-recruitment.xyz",
    domainAge: "30 days old",
    messageCount: 5,
    threatScore: 65,
    flags: ["Suspicious TLD", "Generic Emails"],
    lastContact: "1 day ago"
  },
  {
    id: "3",
    name: "Emily Watson",
    email: "emily.w@acme-corp.com",
    company: "Acme Corporation",
    domain: "acme-corp.com",
    domainAge: "5 years old",
    messageCount: 3,
    threatScore: 22,
    flags: [],
    lastContact: "3 days ago"
  },
  {
    id: "4",
    name: "Unknown Recruiter",
    email: "jobs@instant-money-work.com",
    company: "Work From Home Inc",
    domain: "instant-money-work.com",
    domainAge: "7 days old",
    messageCount: 12,
    threatScore: 92,
    flags: ["Crypto Payment", "High Urgency", "Unrealistic Salary", "No Interview"],
    lastContact: "5 hours ago"
  }
];

const Recruiters = () => {
  const [filter, setFilter] = useState<"all" | "high" | "medium" | "low">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecruiters = mockRecruiters.filter(r => {
    if (filter === "high" && r.threatScore < 60) return false;
    if (filter === "medium" && (r.threatScore < 30 || r.threatScore >= 60)) return false;
    if (filter === "low" && r.threatScore >= 30) return false;
    if (searchQuery && !r.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !r.company.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: mockRecruiters.length,
    high: mockRecruiters.filter(r => r.threatScore >= 60).length,
    medium: mockRecruiters.filter(r => r.threatScore >= 30 && r.threatScore < 60).length,
    low: mockRecruiters.filter(r => r.threatScore < 30).length
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold mb-1">Recruiter Intelligence</h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            Track and analyze recruiter profiles for potential scams
          </p>
        </div>
        <Button variant="cyber" size="sm" className="self-start sm:self-auto">
          <Plus className="w-4 h-4 mr-2" />
          Add Recruiter
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <div className="glass-card rounded-xl p-3 md:p-4 flex items-center gap-3 md:gap-4">
          <div className="p-2 md:p-3 rounded-lg bg-primary/10">
            <Users className="w-4 md:w-5 h-4 md:h-5 text-primary" />
          </div>
          <div>
            <p className="text-xl md:text-2xl font-bold">{stats.total}</p>
            <p className="text-[10px] md:text-xs text-muted-foreground">Total Tracked</p>
          </div>
        </div>
        <div className="glass-card rounded-xl p-3 md:p-4 flex items-center gap-3 md:gap-4">
          <div className="p-2 md:p-3 rounded-lg bg-destructive/10">
            <AlertTriangle className="w-4 md:w-5 h-4 md:h-5 text-destructive" />
          </div>
          <div>
            <p className="text-xl md:text-2xl font-bold text-destructive">{stats.high}</p>
            <p className="text-[10px] md:text-xs text-muted-foreground">High Risk</p>
          </div>
        </div>
        <div className="glass-card rounded-xl p-3 md:p-4 flex items-center gap-3 md:gap-4">
          <div className="p-2 md:p-3 rounded-lg bg-warning/10">
            <AlertTriangle className="w-4 md:w-5 h-4 md:h-5 text-warning" />
          </div>
          <div>
            <p className="text-xl md:text-2xl font-bold text-warning">{stats.medium}</p>
            <p className="text-[10px] md:text-xs text-muted-foreground">Medium Risk</p>
          </div>
        </div>
        <div className="glass-card rounded-xl p-3 md:p-4 flex items-center gap-3 md:gap-4">
          <div className="p-2 md:p-3 rounded-lg bg-success/10">
            <Shield className="w-4 md:w-5 h-4 md:h-5 text-success" />
          </div>
          <div>
            <p className="text-xl md:text-2xl font-bold text-success">{stats.low}</p>
            <p className="text-[10px] md:text-xs text-muted-foreground">Low Risk</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search recruiters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              "w-full h-10 pl-10 pr-4 rounded-lg",
              "bg-secondary/50 border border-border/50",
              "text-sm placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-primary/50"
            )}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {(["all", "high", "medium", "low"] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "cyber" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
              className="whitespace-nowrap"
            >
              {f === "all" ? "All" : f === "high" ? "High" : f === "medium" ? "Med" : "Low"}
              <span className="hidden sm:inline ml-1">{f !== "all" && "Risk"}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Recruiter Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredRecruiters.map((recruiter) => (
          <RecruiterCard key={recruiter.id} recruiter={recruiter} />
        ))}
      </div>

      {filteredRecruiters.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No recruiters match your filters</p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Recruiters;
