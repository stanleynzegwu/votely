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
    Connector,
} from "@starknet-react/core";
import { WebWalletConnector } from "@argent/starknet-react-webwallet-connector";

export function StarknetProvider({ children }: { children: React.ReactNode }) {
    const { connectors: injectedConnectors } = useInjectedConnectors({
        recommended: [ready(), braavos()],
        includeRecommended: "always",
        order: "alphabetical",
    });

    const webWalletConnector = new WebWalletConnector({
        url: "https://web.hydrogen.argent47.net",
    });

    const connectors = [
        ...injectedConnectors,
        webWalletConnector as unknown as Connector,
    ];

    return (
        <StarknetConfig
            autoConnect
            paymasterProvider={paymasterRpcProvider({
                rpc: () => ({
                    nodeUrl: "https://sepolia.paymaster.avnu.fi",
                    headers: { "x-paymaster-api-key": process.env.AVNU_API_KEY ?? "" },
                }),
            })}
            chains={[sepolia]}
            // provider={jsonRpcProvider({
            //     rpc: () => ({ nodeUrl: process.env.NEXT_PUBLIC_RPC_URL }),
            // })}
            provider={jsonRpcProvider({
                rpc: () => {
                    const url = process.env.NEXT_PUBLIC_RPC_URL;
                    if (!url) throw new Error("NEXT_PUBLIC_RPC_URL is not set");
                    return { nodeUrl: url };
                },
            })}
            connectors={connectors}
            explorer={voyager}
        >
            {children}
        </StarknetConfig>
    );
}