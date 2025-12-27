import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { cn } from "@/lib/utils";

const data = [
  { time: "00:00", score: 85, threats: 12 },
  { time: "04:00", score: 78, threats: 18 },
  { time: "08:00", score: 65, threats: 34 },
  { time: "12:00", score: 45, threats: 67 },
  { time: "16:00", score: 52, threats: 45 },
  { time: "20:00", score: 68, threats: 28 },
  { time: "Now", score: 72, threats: 22 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-lg p-3 border border-primary/20">
        <p className="text-xs text-muted-foreground mb-2">{label}</p>
        <div className="space-y-1">
          <p className="text-sm">
            <span className="text-primary font-medium">Trust Score: </span>
            <span className="font-mono">{payload[0].value}%</span>
          </p>
          <p className="text-sm">
            <span className="text-destructive font-medium">Threats: </span>
            <span className="font-mono">{payload[1].value}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export const TrustScoreChart = () => {
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold">Trust Score Trend</h3>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Trust Score</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <span className="text-muted-foreground">Threats</span>
          </div>
        </div>
      </div>

      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(186, 100%, 50%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(186, 100%, 50%)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(222, 30%, 18%)" 
              vertical={false}
            />
            <XAxis 
              dataKey="time" 
              stroke="hsl(215, 20%, 55%)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(215, 20%, 55%)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="score"
              stroke="hsl(186, 100%, 50%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorScore)"
            />
            <Area
              type="monotone"
              dataKey="threats"
              stroke="hsl(0, 84%, 60%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorThreats)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
