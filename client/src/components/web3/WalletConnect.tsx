import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Wallet } from 'lucide-react';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export function WalletConnect() {
  const [account, setAccount] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  async function checkIfWalletIsConnected() {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function connectWallet() {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        toast({
          title: "MetaMask not found",
          description: "Please install MetaMask to connect your wallet",
          variant: "destructive",
        });
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      toast({
        title: "Wallet Connected",
        description: "Successfully connected to your MetaMask wallet",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect to your wallet",
        variant: "destructive",
      });
    }
  }

  return (
    <div>
      {account ? (
        <Button variant="outline" className="flex items-center gap-2">
          <Wallet className="h-4 w-4" />
          {`${account.slice(0, 6)}...${account.slice(-4)}`}
        </Button>
      ) : (
        <Button onClick={connectWallet} className="flex items-center gap-2">
          <Wallet className="h-4 w-4" />
          Connect Wallet
        </Button>
      )}
    </div>
  );
}
