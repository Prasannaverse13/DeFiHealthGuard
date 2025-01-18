import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

interface ValidationFormData {
  contractAddress: string;
  tokenId: string;
}

// Mock NFT examples for demonstration
const mockNftExamples = [
  {
    contractAddress: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
    tokenId: "1234",
    name: "Bored Ape Yacht Club",
  },
  {
    contractAddress: "0x60e4d786628fea6478f785a6d7e704777c86a7c6",
    tokenId: "5678",
    name: "Mutant Ape Yacht Club",
  },
];

export function ValidationForm() {
  const [result, setResult] = useState<{
    isAuthentic?: boolean;
    confidence?: number;
    details?: {
      collection_name?: string;
      wash_trade_ratio?: number;
      start_date?: string;
    };
    error?: string;
  }>({}); 

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ValidationFormData>();

  const validateMutation = useMutation({
    mutationFn: async (data: ValidationFormData) => {
      // Simulate API call with mock responses
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

      // Randomly return different validation results for demonstration
      const isAuthentic = Math.random() > 0.3;
      return {
        isAuthentic,
        confidence: isAuthentic ? 0.95 : 0.45,
        details: {
          collection_name: isAuthentic ? "Verified Collection" : "Suspicious Collection",
          wash_trade_ratio: isAuthentic ? 0.02 : 0.35,
          start_date: "2021-08-15T00:00:00Z",
        },
      };
    },
    onSuccess: (data) => {
      setResult(data);
    },
    onError: (error) => {
      setResult({ error: error.message });
    },
  });

  const loadExample = (example: typeof mockNftExamples[0]) => {
    setValue("contractAddress", example.contractAddress);
    setValue("tokenId", example.tokenId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          NFT Validation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Try these example NFTs or enter your own to validate:
            </AlertDescription>
          </Alert>
          <div className="mt-4 space-y-2">
            {mockNftExamples.map((example, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start"
                onClick={() => loadExample(example)}
              >
                <div className="text-left">
                  <div className="font-medium">{example.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Contract: {example.contractAddress.slice(0, 6)}...{example.contractAddress.slice(-4)}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit((data) => validateMutation.mutate(data))} className="space-y-4">
          <div className="space-y-2">
            <Input
              {...register("contractAddress", { required: "Contract address is required" })}
              placeholder="Contract Address (e.g., 0xbc4ca0...)"
            />
            {errors.contractAddress && (
              <p className="text-sm text-red-500">{errors.contractAddress.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              {...register("tokenId", { required: "Token ID is required" })}
              placeholder="Token ID (e.g., 1234)"
            />
            {errors.tokenId && (
              <p className="text-sm text-red-500">{errors.tokenId.message}</p>
            )}
          </div>

          <Button 
            type="submit" 
            disabled={validateMutation.isPending}
            className="w-full"
          >
            {validateMutation.isPending ? "Validating..." : "Validate NFT"}
          </Button>

          {validateMutation.isPending && (
            <div className="animate-pulse space-y-4">
              <div className="h-20 bg-gray-200 rounded" />
            </div>
          )}

          {result.isAuthentic !== undefined && !validateMutation.isPending && (
            <Alert variant={result.isAuthentic ? "default" : "destructive"}>
              <AlertTitle className="flex items-center gap-2">
                {result.isAuthentic ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <AlertTriangle className="h-4 w-4" />
                )}
                {result.isAuthentic ? "Authentic NFT" : "Suspicious NFT"}
              </AlertTitle>
              <AlertDescription className="mt-2 space-y-2">
                <div>
                  Confidence: {Math.round((result.confidence || 0) * 100)}%
                </div>
                {result.details && (
                  <>
                    <div>Collection: {result.details.collection_name}</div>
                    <div>
                      Wash Trade Ratio: {Math.round((result.details.wash_trade_ratio || 0) * 100)}%
                    </div>
                    <div>
                      Collection Start Date: {new Date(result.details.start_date || '').toLocaleDateString()}
                    </div>
                  </>
                )}
                <div className="mt-2 text-sm">
                  {result.isAuthentic
                    ? "This NFT appears to be authentic and safe to use as collateral."
                    : "This NFT shows signs of potential fraud. Exercise caution and perform additional verification."}
                </div>
              </AlertDescription>
            </Alert>
          )}

          {result.error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{result.error}</AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
    </Card>
  );
}