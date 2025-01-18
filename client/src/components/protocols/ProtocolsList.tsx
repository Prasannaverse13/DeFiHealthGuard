import { useQuery } from "@tanstack/react-query";
import { HealthScoreCard } from "./HealthScoreCard";
import { Protocol } from "@/types/protocol";

// Mock data for development
const mockProtocols: Protocol[] = [
  {
    id: 1,
    name: "Uniswap V3",
    address: "0x1234...",
    healthScore: 95,
    liquidityUsd: 1500000000,
    stakingApr: 12.5,
    riskLevel: "LOW",
    lastUpdated: new Date().toISOString(),
    metadata: {
      description: "Leading DEX protocol",
    }
  },
  {
    id: 2,
    name: "Aave V3",
    address: "0x5678...",
    healthScore: 92,
    liquidityUsd: 800000000,
    stakingApr: 8.2,
    riskLevel: "LOW",
    lastUpdated: new Date().toISOString(),
    metadata: {
      description: "Lending protocol",
    }
  },
  {
    id: 3,
    name: "Compound V3",
    address: "0x9012...",
    healthScore: 88,
    liquidityUsd: 600000000,
    stakingApr: 7.5,
    riskLevel: "MEDIUM",
    lastUpdated: new Date().toISOString(),
    metadata: {
      description: "Lending protocol",
    }
  }
];

// Mock historical data
const mockHistoricalData = [
  { timestamp: "1h", score: 85 },
  { timestamp: "2h", score: 82 },
  { timestamp: "3h", score: 88 },
  { timestamp: "4h", score: 90 },
  { timestamp: "5h", score: 87 },
];

export function ProtocolsList() {
  // Use mock data directly instead of fetching from API until we have the API key
  const protocols = mockProtocols;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {protocols.map((protocol) => (
        <HealthScoreCard
          key={protocol.id}
          protocol={protocol}
          historicalData={mockHistoricalData}
        />
      ))}
    </div>
  );
}