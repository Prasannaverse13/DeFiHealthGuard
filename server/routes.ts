import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { protocols, alerts, nftValidations } from "@db/schema";
import { eq } from "drizzle-orm";
import { bitsCrunchService } from "./services/bitscrunch";

export function registerRoutes(app: Express): Server {
  // NFT validation endpoints
  app.post("/api/nft/validate", async (req, res) => {
    try {
      const { contractAddress, tokenId, chainId = '1' } = req.body;

      if (!contractAddress || !tokenId) {
        res.status(400).json({ message: 'Contract address and token ID are required' });
        return;
      }

      // Get validation results from BitsCrunch
      const [validationResult, duplicateCheck] = await Promise.all([
        bitsCrunchService.validateNft(contractAddress, tokenId, chainId),
        bitsCrunchService.checkNftDuplicates(contractAddress, tokenId, chainId)
      ]);

      const validation = {
        tokenId,
        contractAddress,
        isAuthentic: validationResult.isAuthentic && !duplicateCheck,
        validationDate: new Date(),
        metadata: {
          confidence: validationResult.confidence,
          hasDuplicates: duplicateCheck,
          chainId,
          details: validationResult.details,
        },
      };

      const result = await db.insert(nftValidations).values(validation).returning();
      res.json(result[0]);
    } catch (error) {
      console.error('NFT validation error:', error);
      res.status(500).json({ 
        message: 'Failed to validate NFT',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Protocol health monitoring endpoints
  app.get("/api/protocols", async (req, res) => {
    try {
      const { chainId = '1' } = req.query;
      const dbProtocols = await db.select().from(protocols);

      // Fetch updated metrics from BitsCrunch
      const updatedProtocols = await Promise.all(
        dbProtocols.map(async (protocol) => {
          try {
            const metrics = await bitsCrunchService.getTokenMetrics(protocol.address, chainId as string);
            return {
              ...protocol,
              healthScore: metrics.healthScore,
              liquidityUsd: metrics.liquidity,
              stakingApr: metrics.stakingApr,
              riskLevel: metrics.riskLevel,
              lastUpdated: new Date(),
            };
          } catch (error) {
            console.error(`Failed to fetch metrics for protocol ${protocol.id}:`, error);
            return protocol;
          }
        })
      );

      res.json(updatedProtocols);
    } catch (error) {
      console.error('Failed to fetch protocols:', error);
      res.status(500).json({ 
        message: 'Failed to fetch protocols',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.get("/api/protocols/:id", async (req, res) => {
    try {
      const { chainId = '1' } = req.query;
      const protocol = await db.select()
        .from(protocols)
        .where(eq(protocols.id, parseInt(req.params.id)))
        .then(rows => rows[0]);

      if (!protocol) {
        res.status(404).json({ message: "Protocol not found" });
        return;
      }

      // Get latest metrics from BitsCrunch
      const metrics = await bitsCrunchService.getTokenMetrics(protocol.address, chainId as string);
      const updatedProtocol = {
        ...protocol,
        healthScore: metrics.healthScore,
        liquidityUsd: metrics.liquidity,
        stakingApr: metrics.stakingApr,
        riskLevel: metrics.riskLevel,
        lastUpdated: new Date(),
      };

      res.json(updatedProtocol);
    } catch (error) {
      console.error('Failed to fetch protocol:', error);
      res.status(500).json({ 
        message: 'Failed to fetch protocol',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Alerts endpoints
  app.get("/api/alerts", async (_req, res) => {
    try {
      const result = await db.select().from(alerts).orderBy(alerts.createdAt);
      res.json(result);
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
      res.status(500).json({ 
        message: 'Failed to fetch alerts',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}