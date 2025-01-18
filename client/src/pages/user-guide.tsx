import { Layout } from "@/components/layout/Layout";
import { HelpCircle } from "lucide-react";

export default function UserGuide() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <HelpCircle className="h-8 w-8" />
          User Guide
        </h1>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium">Step 1: Connect Your Wallet</h3>
                <p className="text-gray-600">
                  Click the "Connect Wallet" button in the top right corner to connect your Web3 wallet
                  (MetaMask). This enables access to personalized insights and portfolio tracking.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium">Step 2: Monitor DeFi Protocols</h3>
                <p className="text-gray-600">
                  Navigate to the Protocol Analytics page to view health scores based on liquidity,
                  staking metrics, and wallet activity.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium">Step 3: Validate NFTs</h3>
                <p className="text-gray-600">
                  Use the NFT Validation tool to check for authenticity and potential fraud. Enter the
                  contract address and token ID to get detailed validation results.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-medium">Step 4: Monitor Alerts</h3>
                <p className="text-gray-600">
                  Check the Alerts page regularly for notifications about high-risk protocols or
                  suspicious NFT activity in your portfolio.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
