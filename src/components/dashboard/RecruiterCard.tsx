import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThreatScoreGauge } from "./ThreatScoreGauge";
import { 
  Mail, 
  Globe, 
  Calendar, 
  MessageSquare,
  ExternalLink,
  Flag
} from "lucide-react";

export interface Recruiter {
  id: string;
  name: string;
  email: string;
  company: string;
  domain: string;
  domainAge: string;
  messageCount: number;
  threatScore: number;
  flags: string[];
  lastContact: string;
  avatar?: string;
}

interface RecruiterCardProps {
  recruiter: Recruiter;
  onAnalyze?: () => void;
  onReport?: () => void;
}

export const RecruiterCard = ({ recruiter, onAnalyze, onReport }: RecruiterCardProps) => {
  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <div className="glass-card rounded-xl p-5 transition-all duration-300 hover:border-primary/30">
      <div className="flex gap-5">
        {/* Avatar & Score */}
        <div className="flex flex-col items-center gap-3">
          <div className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold",
            "bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 text-primary"
          )}>
            {recruiter.avatar ? (
              <img src={recruiter.avatar} alt={recruiter.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              getInitials(recruiter.name)
            )}
          </div>
          <ThreatScoreGauge score={recruiter.threatScore} size="sm" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-lg">{recruiter.name}</h3>
              <p className="text-sm text-muted-foreground">{recruiter.company}</p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="truncate font-mono text-xs">{recruiter.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <span className="truncate">{recruiter.domain}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>Domain: {recruiter.domainAge}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MessageSquare className="w-4 h-4 text-muted-foreground" />
              <span>{recruiter.messageCount} messages</span>
            </div>
          </div>

          {/* Flags */}
          {recruiter.flags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {recruiter.flags.map((flag, i) => (
                <Badge key={i} variant="danger" className="text-[10px]">
                  {flag}
                </Badge>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="cyber" size="sm" onClick={onAnalyze}>
              <ExternalLink className="w-3 h-3 mr-1" />
              Deep Analysis
            </Button>
            <Button variant="danger" size="sm" onClick={onReport}>
              <Flag className="w-3 h-3 mr-1" />
              Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
