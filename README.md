# DeFi Health Monitor with NFT Fraud Protection

A comprehensive blockchain security platform providing advanced protection, real-time threat detection, and intelligent analytics for crypto investors and security professionals.

## Features

- Real-time DeFi Protocol Health Monitoring
- NFT Fraud Detection and Validation
- Web3 Wallet Integration (MetaMask)
- Custom Alert System
- Comprehensive Analytics Dashboard

## Technology Stack

- Frontend: React.js with TypeScript and Tailwind CSS
- Backend: Express.js with TypeScript
- Database: PostgreSQL with Drizzle ORM
- Web3: MetaMask Integration
- API Integration: BitsCrunch APIs

## BitsCrunch API Integration

We utilize multiple BitsCrunch APIs throughout the application:

### 1. Token APIs
Located in `server/services/bitscrunch.ts`:
- Fetches ERC20 token metrics
- Analyzes liquidity data
- Monitors staking performance
- Tracks wallet activity

Implementation: `getTokenMetrics()` method in BitsCrunchService

### 2. NFT APIs
Implemented in `server/services/bitscrunch.ts` and used in `server/routes.ts`:
- Real-time NFT authenticity verification
- Historical NFT transaction analysis
- Collection analytics

Implementation: `validateNft()` method in BitsCrunchService

### 3. IP Protection APIs
Used in `server/services/bitscrunch.ts`:
- NFT duplicate detection
- Forgery identification
- Authenticity validation

Implementation: `checkNftDuplicates()` method in BitsCrunchService

## API Key Configuration

The BitsCrunch API key is configured in:
- File: `server/services/bitscrunch.ts`
- API Key Value: "your API KEY"
- Used in: BitsCrunchService constructor

## Project Structure

```
├── client/                  # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/         # Page components
│   │   └── lib/           # Utility functions and hooks
├── server/                 # Backend Express application
│   ├── services/          # Service layer (including BitsCrunch integration)
│   └── routes.ts          # API routes
└── db/                    # Database configuration and schemas
```

## Key Components

1. Protocol Analytics (`/analytics`)
   - Displays health scores for DeFi protocols
   - Shows liquidity and staking metrics
   - Risk level indicators

2. NFT Validation (`/nft-validation`)
   - Contract address and token ID validation
   - Authenticity verification
   - Duplicate detection

3. Alert System (`/alerts`)
   - Custom alerts for high-risk protocols
   - NFT fraud notifications
   - Real-time monitoring

## How to Run

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
- Create a `.env` file with:
```
BITSCRUNCH_API_KEY= "your API KEY"
DATABASE_URL=your_database_url
```

3. Start the development server:
```bash
npm run dev
```

## BitsCrunch API Implementation Details

### File: `server/services/bitscrunch.ts`
Main service file handling all BitsCrunch API interactions:
- Lines 24-35: BitsCrunch service initialization and API key configuration
- Lines 57-74: Token metrics retrieval and health score calculation
- Lines 83-111: NFT validation implementation
- Lines 113-124: NFT duplicate detection

### File: `server/routes.ts`
API routes utilizing BitsCrunch services:
- Lines 10-47: NFT validation endpoint
- Lines 50-83: Protocol health monitoring
- Lines 85-117: Individual protocol analysis

## User Guide

For detailed information about using the application:
- How It Works: `/how-it-works`
- User Guide: `/user-guide`
- BitsCrunch Integration Details: `/bitscrunch-integration`
