import { Layout } from "@/components/layout/Layout";
import { ValidationForm } from "@/components/nft/ValidationForm";

export default function NftValidation() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">NFT Validation</h1>
        <ValidationForm />
      </div>
    </Layout>
  );
}
