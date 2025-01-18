import { Layout } from "@/components/layout/Layout";
import { ProtocolsList } from "@/components/protocols/ProtocolsList";

export default function Analytics() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Protocol Analytics</h1>
        <ProtocolsList />
      </div>
    </Layout>
  );
}
