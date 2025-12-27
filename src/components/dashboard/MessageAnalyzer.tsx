import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  Send, 
  Loader2, 
  AlertTriangle, 
  Shield, 
  Brain,
  Zap
} from "lucide-react";

interface AnalysisResult {
  score: number;
  indicators: {
    type: "danger" | "warning" | "safe";
    label: string;
    description: string;
  }[];
  psychologicalTriggers: string[];
  recommendation: string;
}

export const MessageAnalyzer = () => {
  const [message, setMessage] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyzeMessage = async () => {
    if (!message.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock result based on content
    const hasUrgency = /urgent|immediately|asap|right now|deadline/i.test(message);
    const hasMoneyRequest = /payment|transfer|fee|deposit|crypto|bitcoin|bank/i.test(message);
    const hasPersonalInfo = /ssn|social security|password|id card|passport/i.test(message);
    const hasSuspiciousDomain = /@(gmail|yahoo|hotmail)\.com/i.test(message);
    
    const score = Math.min(100, 
      (hasUrgency ? 25 : 0) + 
      (hasMoneyRequest ? 35 : 0) + 
      (hasPersonalInfo ? 30 : 0) + 
      (hasSuspiciousDomain ? 15 : 0) +
      Math.floor(Math.random() * 20)
    );

    const indicators: AnalysisResult["indicators"] = [];
    
    if (hasUrgency) {
      indicators.push({
        type: "danger",
        label: "Urgency Pressure",
        description: "Message contains time-pressure tactics commonly used in scams"
      });
    }
    
    if (hasMoneyRequest) {
      indicators.push({
        type: "danger",
        label: "Financial Request",
        description: "References to money transfers or payments detected"
      });
    }
    
    if (hasPersonalInfo) {
      indicators.push({
        type: "danger",
        label: "PII Request",
        description: "Request for sensitive personal information"
      });
    }
    
    if (hasSuspiciousDomain) {
      indicators.push({
        type: "warning",
        label: "Non-Corporate Email",
        description: "Using personal email domain instead of company email"
      });
    }
    
    if (indicators.length === 0) {
      indicators.push({
        type: "safe",
        label: "No Immediate Threats",
        description: "No obvious scam indicators detected"
      });
    }

    setResult({
      score,
      indicators,
      psychologicalTriggers: hasUrgency ? ["Fear of missing out", "Time pressure"] : [],
      recommendation: score > 60 
        ? "HIGH RISK: Do not respond. Report this message." 
        : score > 30 
        ? "CAUTION: Verify sender identity before proceeding."
        : "LOW RISK: Continue with standard verification."
    });
    
    setIsAnalyzing(false);
  };

  const getScoreColor = (score: number) => {
    if (score <= 30) return "text-success";
    if (score <= 60) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-5 h-5 text-primary" />
        <h3 className="font-semibold">Message Analyzer</h3>
        <Badge variant="cyber" className="ml-auto">AI-Powered</Badge>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Paste a suspicious message to analyze..."
            className={cn(
              "w-full h-32 px-4 py-3 rounded-lg resize-none",
              "bg-secondary/50 border border-border",
              "text-sm font-mono placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50",
              "scrollbar-cyber"
            )}
          />
          <Button
            onClick={analyzeMessage}
            disabled={!message.trim() || isAnalyzing}
            className="absolute bottom-3 right-3"
            size="sm"
            variant="cyber"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                Analyze
              </>
            )}
          </Button>
        </div>

        {result && (
          <div className="space-y-4 animate-fade-in">
            {/* Score */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
              <div>
                <p className="text-sm text-muted-foreground">Threat Score</p>
                <p className={cn("text-3xl font-bold font-mono", getScoreColor(result.score))}>
                  {result.score}%
                </p>
              </div>
              <div className={cn(
                "p-3 rounded-full",
                result.score > 60 ? "bg-destructive/20 text-destructive" : 
                result.score > 30 ? "bg-warning/20 text-warning" : 
                "bg-success/20 text-success"
              )}>
                {result.score > 60 ? <AlertTriangle className="w-6 h-6" /> : <Shield className="w-6 h-6" />}
              </div>
            </div>

            {/* Indicators */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Detected Indicators</p>
              {result.indicators.map((indicator, i) => (
                <div 
                  key={i}
                  className={cn(
                    "p-3 rounded-lg border-l-4",
                    indicator.type === "danger" && "bg-destructive/10 border-l-destructive",
                    indicator.type === "warning" && "bg-warning/10 border-l-warning",
                    indicator.type === "safe" && "bg-success/10 border-l-success"
                  )}
                >
                  <p className="font-medium text-sm">{indicator.label}</p>
                  <p className="text-xs text-muted-foreground">{indicator.description}</p>
                </div>
              ))}
            </div>

            {/* Psychological Triggers */}
            {result.psychologicalTriggers.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Psychological Triggers</p>
                <div className="flex flex-wrap gap-2">
                  {result.psychologicalTriggers.map((trigger, i) => (
                    <Badge key={i} variant="warning">{trigger}</Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendation */}
            <div className={cn(
              "p-4 rounded-lg border",
              result.score > 60 ? "border-destructive/30 bg-destructive/5" :
              result.score > 30 ? "border-warning/30 bg-warning/5" :
              "border-success/30 bg-success/5"
            )}>
              <p className="text-sm font-medium">{result.recommendation}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
