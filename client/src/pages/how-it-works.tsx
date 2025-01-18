import { Layout } from "@/components/layout/Layout";
import { Info } from "lucide-react";

export default function HowItWorks() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Info className="h-8 w-8" />
          How It Works
        </h1>

        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">DeFi Health Monitor</h2>
            <p className="text-gray-600 mb-4">
              A comprehensive dashboard that provides real-time health scores for DeFi protocols
              and NFT fraud protection using BitsCrunch APIs.
            </p>
            
            <div className="pl-4 border-l-4 border-primary space-y-4">
              <div>
                <h3 className="font-medium">Real-time Protocol Monitoring</h3>
                <p className="text-gray-600">
                  Track liquidity, staking metrics, and wallet activity to evaluate protocol health.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium">NFT Validation</h3>
                <p className="text-gray-600">
                  Verify NFT authenticity and detect potential fraud using advanced blockchain analytics.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium">Risk Assessment</h3>
                <p className="text-gray-600">
                  Get detailed risk scores and alerts for potential security threats.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Real-time DeFi protocol health monitoring</li>
              <li>NFT fraud detection and validation</li>
              <li>Comprehensive analytics dashboard</li>
              <li>Custom alerts for high-risk protocols</li>
            </ul>
          </section>
        </div>
      </div>
    </Layout>
  );
}
