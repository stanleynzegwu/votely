import { clsx, type ClassValue } from "clsx"
import { RpcProvider } from "starknet";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const myProvider = new RpcProvider({
  nodeUrl: process.env.NEXT_PUBLIC_RPC_URL,
})

export const VOTE_CONTRACT_ADDRESS = "0x0256c8c03bf6b38bffb39e801f4d6b058dc7c77664be9e1c508943e27922f302";