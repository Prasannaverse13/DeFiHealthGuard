import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Protocol } from "@/types/protocol";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface HealthScoreCardProps {
  protocol: Protocol;
  historicalData: { timestamp: string; score: number }[];
}

export function HealthScoreCard({ protocol, historicalData }: HealthScoreCardProps) {
  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{protocol.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Health Score</span>
            <span className={`text-2xl font-bold ${getRiskColor(protocol.healthScore)}`}>
              {protocol.healthScore}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Liquidity</span>
              <span>${protocol.liquidityUsd.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Staking APR</span>
              <span>{protocol.stakingApr}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Risk Level</span>
              <span className={getRiskColor(protocol.healthScore)}>{protocol.riskLevel}</span>
            </div>
          </div>

          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData}>
                <XAxis dataKey="timestamp" hide />
                <YAxis hide domain={[0, 100]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
