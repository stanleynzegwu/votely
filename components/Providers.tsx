"use client";
import React from "react";

import { sepolia, mainnet } from "@starknet-react/chains";
import {
    StarknetConfig,
    publicProvider,
    ready,
    braavos,
    useInjectedConnectors,
    voyager,
    paymasterRpcProvider,
    jsonRpcProvider,
} from "@starknet-react/core";

export function StarknetProvider({ children }: { children: React.ReactNode }) {
    const { connectors } = useInjectedConnectors({
        // Show these connectors if the user has no connector installed.
        recommended: [ready(), braavos()],
        // Hide recommended connectors if the user has any connector installed.
        //includeRecommended: "onlyIfNoConnectors", // we had an issue where our wallets were not popping up, so we chnaged to always
        includeRecommended: "always",
        // Randomize the order of the connectors.
        // order: "random",
        order: "alphabetical",
    });

    return (
        <StarknetConfig
            autoConnect
            paymasterProvider={paymasterRpcProvider({
                rpc: () => {
                    return {
                        nodeUrl: "https://sepolia.paymaster.avnu.fi",
                        headers: { 'x-paymaster-api-key': process.env.AVNU_API_KEY ?? '' }
                    }
                }
            })}
            // chains={[mainnet, sepolia]}
            chains={[sepolia]}
            // provider={publicProvider()}
            provider={jsonRpcProvider({
                rpc: () => ({ nodeUrl: process.env.NEXT_PUBLIC_RPC_URL })
            })}
            connectors={connectors}
            explorer={voyager}
        >
            {children}
        </StarknetConfig>
    );
}