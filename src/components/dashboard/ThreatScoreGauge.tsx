import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ThreatScoreGaugeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  label?: string;
  animated?: boolean;
}

export const ThreatScoreGauge = ({ 
  score, 
  size = "md", 
  label,
  animated = true 
}: ThreatScoreGaugeProps) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setDisplayScore(score);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setDisplayScore(score);
    }
  }, [score, animated]);

  const getColor = () => {
    if (score <= 30) return { color: "text-success", glow: "glow-success", bg: "bg-success" };
    if (score <= 60) return { color: "text-warning", glow: "glow-warning", bg: "bg-warning" };
    return { color: "text-destructive", glow: "glow-danger", bg: "bg-destructive" };
  };

  const getLabel = () => {
    if (score <= 30) return "LOW RISK";
    if (score <= 60) return "MODERATE";
    return "HIGH RISK";
  };

  const sizeClasses = {
    sm: { container: "w-24 h-24", text: "text-xl", label: "text-[10px]" },
    md: { container: "w-36 h-36", text: "text-3xl", label: "text-xs" },
    lg: { container: "w-48 h-48", text: "text-5xl", label: "text-sm" },
  };

  const { color, glow, bg } = getColor();
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn("relative", sizeClasses[size].container)}>
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-secondary"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            className={cn(color, "transition-all duration-1000 ease-out")}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
            }}
          />
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-mono font-bold", sizeClasses[size].text, color)}>
            {displayScore}
          </span>
          <span className={cn("font-medium tracking-wider", sizeClasses[size].label, color)}>
            {getLabel()}
          </span>
        </div>
        {/* Glow effect */}
        {score > 60 && (
          <div className={cn(
            "absolute inset-0 rounded-full animate-threat-pulse",
            score > 60 && "opacity-50"
          )} />
        )}
      </div>
      {label && (
        <span className="text-sm text-muted-foreground font-medium">{label}</span>
      )}
    </div>
  );
};
