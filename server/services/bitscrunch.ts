import { env } from "process";

interface TokenMetrics {
  liquidity: number;
  stakingApr: number;
  healthScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

interface NftValidationResult {
  isAuthentic: boolean;
  confidence: number;
  details?: Record<string, any>;
}

// Supported blockchain IDs according to BitsCrunch docs
const SUPPORTED_CHAINS = {
  ETHEREUM: '1',
  POLYGON: '137',
  AVALANCHE: '43114',
  BSC: '57'
} as const;

export class BitsCrunchService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    // Use the provided API key
    this.apiKey = 'dbea4fc17a5975fae375be12add3d957';
    this.baseUrl = 'https://api.unleashnfts.com/api/v1';

    if (!this.apiKey) {
      throw new Error('BitsCrunch API key is required');
    }
  }

  private async makeRequest(endpoint: string, params: Record<string, any> = {}) {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString());
    });

    const response = await fetch(url.toString(), {
      headers: {
        'x-api-key': this.apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`BitsCrunch API error: ${response.statusText}`);
    }

    return response.json();
  }

  // Implementation based on BitsCrunch Token APIs documentation
  async getTokenMetrics(address: string, chainId: string = SUPPORTED_CHAINS.ETHEREUM): Promise<TokenMetrics> {
    const data = await this.makeRequest('/market/metrics', {
      currency: 'usd',
      blockchain: chainId,
      metrics: ['marketcap', 'volume', 'washtrade_level'].join(','),
      time_range: '24h',
      include_washtrade: true,
      address,
    });

    // Convert API response to our TokenMetrics interface
    return {
      liquidity: parseFloat(data.metric_values.volume?.value || '0'),
      stakingApr: 0, // Not directly available in API, would need additional calculation
      healthScore: 100 - (parseInt(data.metric_values.washtrade_level?.value || '0')), // Inverse of wash trade level
      riskLevel: this.getRiskLevel(data.metric_values.washtrade_level?.value || '0'),
    };
  }

  private getRiskLevel(washTradeLevel: string): 'LOW' | 'MEDIUM' | 'HIGH' {
    const level = parseInt(washTradeLevel);
    if (level <= 5) return 'LOW';
    if (level <= 20) return 'MEDIUM';
    return 'HIGH';
  }

  // Implementation based on BitsCrunch NFT APIs documentation
  async validateNft(contractAddress: string, tokenId: string, chainId: string = SUPPORTED_CHAINS.ETHEREUM): Promise<NftValidationResult> {
    // Using collection details API to get authenticity information
    const data = await this.makeRequest(`/collection/${chainId}/${contractAddress}`, {
      include_verification: true,
    });

    // Check for duplicates using market metrics
    const washTradeData = await this.makeRequest('/market/metrics', {
      currency: 'usd',
      blockchain: chainId,
      metrics: 'washtrade_suspect_sales_ratio',
      time_range: '24h',
      contract_address: contractAddress,
      token_id: tokenId,
    });

    const washTradeRatio = parseFloat(washTradeData.metric_values.washtrade_suspect_sales_ratio?.value || '0');

    return {
      isAuthentic: data.verified && washTradeRatio < 0.1, // Consider authentic if verified and low wash trade ratio
      confidence: 1 - washTradeRatio,
      details: {
        collection_verified: data.verified,
        wash_trade_ratio: washTradeRatio,
        collection_name: data.name,
        start_date: data.start_date,
      },
    };
  }

  // Implementation based on BitsCrunch IP Protection APIs documentation
  async checkNftDuplicates(contractAddress: string, tokenId: string, chainId: string = SUPPORTED_CHAINS.ETHEREUM): Promise<boolean> {
    const data = await this.makeRequest('/market/metrics', {
      currency: 'usd',
      blockchain: chainId,
      metrics: 'washtrade_assets',
      time_range: '24h',
      contract_address: contractAddress,
      token_id: tokenId,
    });

    return parseInt(data.metric_values.washtrade_assets?.value || '0') > 0;
  }
}

export const bitsCrunchService = new BitsCrunchService();