export interface Protocol {
  id: number;
  name: string;
  address: string;
  healthScore: number;
  liquidityUsd: number;
  stakingApr: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  lastUpdated: string;
  metadata?: Record<string, any>;
}

export interface NftValidation {
  id: number;
  tokenId: string;
  contractAddress: string;
  isAuthentic: boolean;
  validationDate: string;
  metadata?: Record<string, any>;
}

export interface Alert {
  id: number;
  type: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  message: string;
  protocolId?: number;
  createdAt: string;
  metadata?: Record<string, any>;
}
