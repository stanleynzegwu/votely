'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAccount } from '@starknet-react/core';
import { ConnectModal } from './ConnectModal';
import { DisconnectModal } from './DisconnectModal';

export function Header() {
  ////
  const { isConnected, address, account, status } = useAccount();
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [isDisconnectOpen, setIsDisconnectOpen] = useState(false);

  const handleWalletClick = () => {
    if (isConnected) {
      setIsDisconnectOpen(true);
    } else {
      setIsConnectOpen(true);
    }
  };

  return (
    <>
    <header className="border-b border-border/30 bg-background/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-lg">Ⓥ</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Voting dApp</h1>
              <p className="text-xs text-muted-foreground">Powered by Starknet</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1 px-3 py-1.5 bg-background/50 border border-border/30 rounded-lg">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse-glow" />
              <span className="text-xs text-muted-foreground">Network Live</span>
            </div>

            {isConnected && address ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-background/50 border border-primary/20 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-xs text-primary font-semibold">Connected</span>
                </div>
                <button
                  onClick={handleWalletClick}
                  className="px-4 py-2 text-sm font-semibold text-foreground bg-background/50 hover:bg-background border border-border/30 hover:border-primary/30 rounded-lg transition-colors cursor-pointer"
                  title={address}
                >
                  {address.slice(0, 6)}...{address.slice(-4)}
                </button>
              </div>
            ) : (
              <Button
                onClick={handleWalletClick}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-foreground font-semibold"
              >
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
    
    <ConnectModal
      isOpen={isConnectOpen}
      onClose={() => setIsConnectOpen(false)}
    />
    <DisconnectModal
      isOpen={isDisconnectOpen}
      onClose={() => setIsDisconnectOpen(false)}
    />
    </>
  );
}
