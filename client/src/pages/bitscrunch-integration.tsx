import { Layout } from "@/components/layout/Layout";
import { Webhook } from "lucide-react";

export default function BitsCrunchIntegration() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Webhook className="h-8 w-8" />
          BitsCrunch Integration
        </h1>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">API Integration</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium">Token APIs</h3>
                <p className="text-gray-600">
                  We utilize BitsCrunch Token APIs to fetch comprehensive data about DeFi protocols:
                </p>
                <ul className="list-disc pl-5 mt-2 text-gray-600">
                  <li>Real-time liquidity data</li>
                  <li>Staking metrics and APY trends</li>
                  <li>Protocol health scores</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium">NFT APIs</h3>
                <p className="text-gray-600">
                  Our NFT validation feature leverages BitsCrunch's NFT APIs for:
                </p>
                <ul className="list-disc pl-5 mt-2 text-gray-600">
                  <li>Real-time NFT authenticity verification</li>
                  <li>Historical NFT transaction analysis</li>
                  <li>Duplicate detection</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium">IP Protection APIs</h3>
                <p className="text-gray-600">
                  We implement BitsCrunch's IP Protection APIs to:
                </p>
                <ul className="list-disc pl-5 mt-2 text-gray-600">
                  <li>Detect NFT forgeries</li>
                  <li>Identify duplicate NFTs</li>
                  <li>Validate NFT authenticity</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
