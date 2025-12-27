import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MessageAnalyzer } from "@/components/dashboard/MessageAnalyzer";
import { ThreatScoreGauge } from "@/components/dashboard/ThreatScoreGauge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Upload,
  Clock,
  Shield,
  AlertTriangle
} from "lucide-react";

interface ConversationItem {
  id: string;
  platform: "email" | "whatsapp" | "linkedin";
  sender: string;
  preview: string;
  timestamp: string;
  threatScore: number;
  unread: boolean;
}

const mockConversations: ConversationItem[] = [
  {
    id: "1",
    platform: "whatsapp",
    sender: "Unknown +91 98765...",
    preview: "Hi! I saw your profile and have an urgent job opportunity...",
    timestamp: "10:34 AM",
    threatScore: 85,
    unread: true
  },
  {
    id: "2",
    platform: "email",
    sender: "hr@techcorp-hiring.com",
    preview: "Congratulations! You've been selected for an interview...",
    timestamp: "9:15 AM",
    threatScore: 62,
    unread: true
  },
  {
    id: "3",
    platform: "linkedin",
    sender: "John Smith - Recruiter",
    preview: "I have a great opportunity at a Fortune 500 company...",
    timestamp: "Yesterday",
    threatScore: 28,
    unread: false
  },
  {
    id: "4",
    platform: "email",
    sender: "careers@legitimate-corp.com",
    preview: "Thank you for applying. We'd like to schedule an interview...",
    timestamp: "Yesterday",
    threatScore: 12,
    unread: false
  }
];

const platformIcons = {
  email: Mail,
  whatsapp: MessageSquare,
  linkedin: MessageSquare
};

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold mb-1">Message Analysis</h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            Analyze suspicious messages from any platform
          </p>
        </div>
        <Button variant="cyber" size="sm" className="self-start sm:self-auto">
          <Upload className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Import Conversation</span>
          <span className="sm:hidden">Import</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations List */}
        <div className="glass-card rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Recent Conversations</h3>
            <Badge variant="cyber">{mockConversations.length}</Badge>
          </div>

          {mockConversations.map((conv) => {
            const Icon = platformIcons[conv.platform];
            return (
              <div
                key={conv.id}
                onClick={() => setSelectedConversation(conv.id)}
                className={cn(
                  "p-3 rounded-lg cursor-pointer transition-all duration-200",
                  "border border-transparent",
                  selectedConversation === conv.id
                    ? "bg-primary/10 border-primary/30"
                    : "hover:bg-secondary/50",
                  conv.unread && "border-l-4 border-l-primary"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    conv.threatScore > 60 ? "bg-destructive/10 text-destructive" :
                    conv.threatScore > 30 ? "bg-warning/10 text-warning" :
                    "bg-success/10 text-success"
                  )}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm truncate">{conv.sender}</span>
                      <span className="text-[10px] text-muted-foreground">{conv.timestamp}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{conv.preview}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge 
                        variant={
                          conv.threatScore > 60 ? "danger" :
                          conv.threatScore > 30 ? "warning" :
                          "safe"
                        }
                        className="text-[10px]"
                      >
                        {conv.threatScore}% Risk
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Message Analyzer */}
        <div className="lg:col-span-2 space-y-6">
          <MessageAnalyzer />

          {/* Analysis Tips */}
          <div className="glass-card rounded-xl p-5">
            <h3 className="font-semibold mb-4">Analysis Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-secondary/30">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-warning" />
                  <span className="font-medium text-sm">Red Flags to Watch</span>
                </div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Urgency or pressure tactics</li>
                  <li>• Requests for personal information</li>
                  <li>• Payment or fee requests</li>
                  <li>• Too-good-to-be-true offers</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-success" />
                  <span className="font-medium text-sm">Safe Practices</span>
                </div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Verify company domains</li>
                  <li>• Check recruiter profiles</li>
                  <li>• Never pay upfront fees</li>
                  <li>• Use official job portals</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Messages;
