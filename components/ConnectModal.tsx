"use client";

import React, { useState } from "react";
//import { useWallet } from "@/context/WalletContext";
import { Connector, useConnect } from "@starknet-react/core";
import { Loader2, Zap, Shield } from "lucide-react";
import { Modal } from "./ui/_modal";

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConnectModal({ isOpen, onClose }: ConnectModalProps) {
  //const { connect } = useWallet();
  const { connect, connectors, error } = useConnect({});
  const [connecting, setConnecting] = useState<"Braavos" | "Ready" | null>(null);

  const handleConnect = async (connector: Connector) => {
    connect({ connector });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Connect Wallet">
      <div className="grid gap-4">
        {/* <button
          onClick={() => handleConnect("Braavos")}
          disabled={connecting !== null}
          className="flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-accent hover:border-primary/50 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
              <Shield className="h-5 w-5 text-blue-500" />
            </div>
            <span className="font-medium">Braavos</span>
          </div>
          {connecting === "Braavos" && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
        </button>

        <button
          onClick={() => handleConnect("Ready")}
          disabled={connecting !== null}
          className="flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-accent hover:border-primary/50 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-yellow-500/10 flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors">
              <Zap className="h-5 w-5 text-yellow-500" />
            </div>
            <span className="font-medium">Ready</span>
          </div>
          {connecting === "Ready" && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
        </button> */}

        {connectors.map((connector) => (
          <button
            key={connector.id}
            onClick={() => handleConnect(connector)}
            disabled={connecting !== null}
            className="flex items-center justify-between p-4 rounded-xl border bg-card hover:bg-accent hover:border-primary/50 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-yellow-500/10 flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors">
                {/* <img src={connector.icon as string} alt="wallet icon" className="h-5 w-5 text-yellow-500" /> */}
                <img src={connector.icon as string} alt="wallet icon" />
              </div>
              <span className="font-medium">{connector.name}</span>
            </div>
            {connecting === "Ready" && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
          </button>
        ))}
      </div>
    </Modal>
  );
}