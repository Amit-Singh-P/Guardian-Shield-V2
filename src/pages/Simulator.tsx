import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThreatScoreGauge } from "@/components/dashboard/ThreatScoreGauge";
import { cn } from "@/lib/utils";
import { 
  Brain, 
  Play, 
  RotateCcw,
  ChevronRight,
  AlertTriangle,
  DollarSign,
  Clock,
  FileText,
  User
} from "lucide-react";

interface SimulationStep {
  id: number;
  title: string;
  description: string;
  type: "message" | "action" | "red_flag";
  content: string;
  threatDelta: number;
}

const simulationSteps: SimulationStep[] = [
  {
    id: 1,
    title: "Initial Contact",
    description: "Recruiter reaches out via LinkedIn",
    type: "message",
    content: "Hi! I saw your amazing profile. We have an exciting remote position at a Fortune 500 company with a salary of $150k. Interested?",
    threatDelta: 15
  },
  {
    id: 2,
    title: "Quick Response",
    description: "Recruiter pushes for immediate action",
    type: "message",
    content: "Great! This position is filling fast. I need your resume and we can schedule an interview TODAY. Don't miss this opportunity!",
    threatDelta: 20
  },
  {
    id: 3,
    title: "Red Flag: Urgency",
    description: "AI detects pressure tactics",
    type: "red_flag",
    content: "⚠️ Urgency language detected: 'filling fast', 'TODAY', 'Don't miss'. Legitimate recruiters don't pressure candidates.",
    threatDelta: 0
  },
  {
    id: 4,
    title: "Fake Interview",
    description: "Instant 'interview' via chat",
    type: "message",
    content: "Congratulations! You passed the interview. We're offering you $180k salary. Just need to complete some paperwork and pay a small processing fee of $200.",
    threatDelta: 30
  },
  {
    id: 5,
    title: "Red Flag: Payment Request",
    description: "AI detects financial request",
    type: "red_flag",
    content: "🚨 CRITICAL: Payment request detected. Legitimate employers NEVER ask candidates to pay fees. This is a classic advance-fee fraud.",
    threatDelta: 0
  },
  {
    id: 6,
    title: "Final Attempt",
    description: "Scammer escalates pressure",
    type: "message",
    content: "The fee is refundable and required for background check. If you don't pay within 24 hours, we'll have to give this position to another candidate.",
    threatDelta: 20
  }
];

const Simulator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [threatScore, setThreatScore] = useState(10);

  const handleNextStep = () => {
    if (currentStep < simulationSteps.length) {
      const step = simulationSteps[currentStep];
      setThreatScore(prev => Math.min(100, prev + step.threatDelta));
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setThreatScore(10);
    setIsPlaying(false);
  };

  const handleAutoPlay = () => {
    setIsPlaying(true);
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= simulationSteps.length) {
          clearInterval(interval);
          setIsPlaying(false);
          return prev;
        }
        const step = simulationSteps[prev];
        setThreatScore(t => Math.min(100, t + step.threatDelta));
        return prev + 1;
      });
    }, 2500);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold mb-1">AI Scam Simulator</h1>
          <p className="text-xs md:text-sm text-muted-foreground">
            See how a typical job scam unfolds in real-time
          </p>
        </div>
        <Badge variant="cyber" className="px-2 md:px-3 py-1 self-start sm:self-auto">
          <Brain className="w-3 md:w-4 h-3 md:h-4 mr-1 md:mr-2" />
          <span className="text-xs">Educational Mode</span>
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Simulation Panel */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          {/* Controls */}
          <div className="glass-card rounded-xl p-3 md:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Button 
                variant="cyber" 
                size="sm"
                onClick={handleAutoPlay}
                disabled={isPlaying || currentStep >= simulationSteps.length}
              >
                <Play className="w-4 h-4 mr-1 md:mr-2" />
                {isPlaying ? "Playing..." : "Auto Play"}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleNextStep}
                disabled={isPlaying || currentStep >= simulationSteps.length}
              >
                <span className="hidden sm:inline">Next Step</span>
                <span className="sm:hidden">Next</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">Reset</span>
              </Button>
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">
              Step {currentStep} of {simulationSteps.length}
            </div>
          </div>

          {/* Chat Simulation */}
          <div className="glass-card rounded-xl p-4 md:p-5">
            <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Scam Conversation Simulation</h3>
            <div className="space-y-3 md:space-y-4 min-h-[300px] md:min-h-[400px]">
              {simulationSteps.slice(0, currentStep).map((step) => (
                <div
                  key={step.id}
                  className={cn(
                    "animate-fade-in",
                    step.type === "red_flag" && "border-l-4 border-l-destructive pl-4"
                  )}
                >
                  {step.type === "message" ? (
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{step.title}</span>
                          <span className="text-[10px] text-muted-foreground">{step.description}</span>
                        </div>
                        <div className="p-3 rounded-lg bg-secondary/50 text-sm">
                          {step.content}
                        </div>
                        {step.threatDelta > 0 && (
                          <div className="mt-2 flex items-center gap-2">
                            <Badge variant="danger" className="text-[10px]">
                              +{step.threatDelta}% Threat Score
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-destructive" />
                        <span className="font-semibold text-destructive">{step.title}</span>
                      </div>
                      <p className="text-sm">{step.content}</p>
                    </div>
                  )}
                </div>
              ))}

              {currentStep === 0 && (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <p>Click "Auto Play" or "Next Step" to begin the simulation</p>
                </div>
              )}

              {currentStep >= simulationSteps.length && (
                <div className="p-6 rounded-lg bg-success/10 border border-success/30 text-center animate-fade-in">
                  <h4 className="font-bold text-success text-lg mb-2">Simulation Complete</h4>
                  <p className="text-sm text-muted-foreground">
                    You've seen how a typical job scam unfolds. Remember: Never pay upfront fees and always verify recruiters!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Panel */}
        <div className="space-y-6">
          {/* Live Threat Score */}
          <div className="glass-card rounded-xl p-5">
            <h3 className="font-semibold mb-4 text-center">Live Threat Analysis</h3>
            <div className="flex justify-center">
              <ThreatScoreGauge score={threatScore} size="lg" />
            </div>
          </div>

          {/* Red Flags Detected */}
          <div className="glass-card rounded-xl p-5">
            <h3 className="font-semibold mb-4">Common Scam Indicators</h3>
            <div className="space-y-3">
              <div className={cn(
                "p-3 rounded-lg border transition-all",
                currentStep >= 3 ? "border-destructive/30 bg-destructive/10" : "border-border/50 bg-secondary/30"
              )}>
                <div className="flex items-center gap-2">
                  <Clock className={cn("w-4 h-4", currentStep >= 3 ? "text-destructive" : "text-muted-foreground")} />
                  <span className={cn("text-sm font-medium", currentStep >= 3 && "text-destructive")}>
                    Urgency Pressure
                  </span>
                </div>
              </div>
              <div className={cn(
                "p-3 rounded-lg border transition-all",
                currentStep >= 5 ? "border-destructive/30 bg-destructive/10" : "border-border/50 bg-secondary/30"
              )}>
                <div className="flex items-center gap-2">
                  <DollarSign className={cn("w-4 h-4", currentStep >= 5 ? "text-destructive" : "text-muted-foreground")} />
                  <span className={cn("text-sm font-medium", currentStep >= 5 && "text-destructive")}>
                    Payment Request
                  </span>
                </div>
              </div>
              <div className={cn(
                "p-3 rounded-lg border transition-all",
                currentStep >= 2 ? "border-warning/30 bg-warning/10" : "border-border/50 bg-secondary/30"
              )}>
                <div className="flex items-center gap-2">
                  <FileText className={cn("w-4 h-4", currentStep >= 2 ? "text-warning" : "text-muted-foreground")} />
                  <span className={cn("text-sm font-medium", currentStep >= 2 && "text-warning")}>
                    Too Good To Be True
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="glass-card rounded-xl p-5">
            <h3 className="font-semibold mb-3">Protection Tips</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-success">✓</span>
                Never pay upfront fees for jobs
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success">✓</span>
                Verify company domains and emails
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success">✓</span>
                Research recruiters on LinkedIn
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success">✓</span>
                Be wary of unrealistic salaries
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Simulator;
