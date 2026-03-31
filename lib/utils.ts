import { clsx, type ClassValue } from "clsx"
import { RpcProvider } from "starknet";
import { twMerge } from "tailwind-merge"
import { Election_S } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const myProvider = new RpcProvider({
  nodeUrl: process.env.NEXT_PUBLIC_RPC_URL,
})

//export const VOTE_CONTRACT_ADDRESS = "0x0256c8c03bf6b38bffb39e801f4d6b058dc7c77664be9e1c508943e27922f302";
//export const VOTE_CONTRACT_ADDRESS = "0x02dd107d0bf16aa1f701f85a03a4cf39572e002b1149e4d07647a348d6309a4a"; //added hasVoted fn
export const VOTE_CONTRACT_ADDRESS = "0x07f4ff6122a6ab46aeeca5b44b4582772a5ab89502085bf420be136132492515"; //versioning functionality

// UTILITY FUNCTIONS
export const calculate_total_votes = (election_state: Election_S | null) => {
  if(election_state == null) return 0;
  // Total votes calculated from calculate_votes array
  const totalVotes = election_state?.calculate_votes?.reduce((acc, votePair) => {
    // votePair is {0: candidateId, 1: votes}
    return acc + Number(votePair[1] ?? 0);
  }, 0) ?? 0;
  
  return totalVotes;
}

export const get_all_candidates = (election_state: Election_S | null) => {
  if(election_state == null) return ;
  return election_state?.calculate_votes;
}