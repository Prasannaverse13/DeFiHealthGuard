import { pgTable, text, serial, integer, timestamp, json, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const protocols = pgTable("protocols", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").unique().notNull(),
  healthScore: integer("health_score").notNull(),
  liquidityUsd: integer("liquidity"),  // Change to nullable
  stakingApr: integer("staking_apr"),  // Change to nullable
  riskLevel: text("risk_level"),       // Change to nullable
  lastUpdated: timestamp("last_updated").notNull().defaultNow(),
  metadata: json("metadata")
});

export const nftValidations = pgTable("nft_validations", {
  id: serial("id").primaryKey(),
  tokenId: text("token_id").notNull(),
  contractAddress: text("contract_address").notNull(),
  isAuthentic: boolean("is_authentic").notNull(),
  validationDate: timestamp("validation_date").notNull().defaultNow(),
  metadata: json("metadata")
});

export const alerts = pgTable("alerts", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  severity: text("severity").notNull(),
  message: text("message").notNull(),
  protocolId: integer("protocol_id").references(() => protocols.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  metadata: json("metadata")
});

// Schema types
export const insertProtocolSchema = createInsertSchema(protocols);
export const selectProtocolSchema = createSelectSchema(protocols);
export type Protocol = typeof protocols.$inferSelect;
export type NewProtocol = typeof protocols.$inferInsert;

export const insertNftValidationSchema = createInsertSchema(nftValidations);
export const selectNftValidationSchema = createSelectSchema(nftValidations);
export type NftValidation = typeof nftValidations.$inferSelect;
export type NewNftValidation = typeof nftValidations.$inferInsert;

export const insertAlertSchema = createInsertSchema(alerts);
export const selectAlertSchema = createSelectSchema(alerts);
export type Alert = typeof alerts.$inferSelect;
export type NewAlert = typeof alerts.$inferInsert;