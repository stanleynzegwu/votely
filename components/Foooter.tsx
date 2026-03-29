'use client';

import { ElectionState, mockElection } from "@/lib/mock-data";
import { VOTE_CONTRACT_ADDRESS } from "@/lib/utils";
import { useAccount } from "@starknet-react/core";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

export function Footer() {
    const [election, setElection] = useState(mockElection);
    const [currentTime, setCurrentTime] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, []);

    const handleCopy = () => {
        if (VOTE_CONTRACT_ADDRESS) {
          navigator.clipboard.writeText(VOTE_CONTRACT_ADDRESS);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
  };

    const getStateLabel = (state: ElectionState): string => {
      return { 0: 'Not Started', 1: 'Ongoing', 2: 'Ended' }[state];
    };
    
    return (
        <>
         {currentTime && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 rounded-lg border border-border/30 bg-background/50">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Smart Contract</p>
              <div className="text-sm font-mono text-accent truncate flex justify-center">
                <p> {VOTE_CONTRACT_ADDRESS.slice(0, 6)}...{VOTE_CONTRACT_ADDRESS.slice(-4)}</p>
                <button
                    onClick={handleCopy}
                    className="ml-1 p-1 hover:bg-muted rounded-full transition-colors cursor-pointer"
                >
                    {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5 text-muted-foreground" />}
                </button>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Election State</p>
              <p className="text-sm font-semibold text-foreground capitalize">
                {getStateLabel(election.state)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Last Updated</p>
              <p className="text-sm font-semibold text-foreground">
                {currentTime}
              </p>
            </div>
          </div>
        )}
        </>
    )
}