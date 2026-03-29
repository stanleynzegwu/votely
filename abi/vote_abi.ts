import { Abi } from "starknet";

export const VOTE_ABI = [
  {
    "type": "impl",
    "name": "VoteImpl",
    "interface_name": "vote::IVote"
  },
  {
    "type": "enum",
    "name": "core::bool",
    "variants": [
      {
        "name": "False",
        "type": "()"
      },
      {
        "name": "True",
        "type": "()"
      }
    ]
  },
  {
    "type": "interface",
    "name": "vote::IVote",
    "items": [
      {
        "type": "function",
        "name": "start_election",
        "inputs": [],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "end_election",
        "inputs": [],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "add_candidate",
        "inputs": [
          {
            "name": "candidate_id",
            "type": "core::integer::u64"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "vote",
        "inputs": [
          {
            "name": "candidate_id",
            "type": "core::integer::u64"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "get_winner",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u64"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "calculate_votes",
        "inputs": [],
        "outputs": [
          {
            "type": "core::array::Array::<(core::integer::u64, core::integer::u64)>"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_candidate",
        "inputs": [
          {
            "name": "candidate_id",
            "type": "core::integer::u64"
          }
        ],
        "outputs": [
          {
            "type": "(core::integer::u64, core::integer::u64)"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_election_state",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u8"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_candidates_length",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u64"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "has_voted",
        "inputs": [
          {
            "name": "voter_address",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::bool"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "type": "constructor",
    "name": "constructor",
    "inputs": [
      {
        "name": "admin",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    "type": "event",
    "name": "vote::Vote::Voted",
    "kind": "struct",
    "members": [
      {
        "name": "voter",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      },
      {
        "name": "candidate_id",
        "type": "core::integer::u64",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "vote::Vote::Candidate_Added",
    "kind": "struct",
    "members": [
      {
        "name": "candidate_id",
        "type": "core::integer::u64",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "vote::Vote::Election_Started",
    "kind": "struct",
    "members": []
  },
  {
    "type": "event",
    "name": "vote::Vote::Election_Ended",
    "kind": "struct",
    "members": []
  },
  {
    "type": "event",
    "name": "vote::Vote::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "Voted",
        "type": "vote::Vote::Voted",
        "kind": "nested"
      },
      {
        "name": "Candidate_Added",
        "type": "vote::Vote::Candidate_Added",
        "kind": "nested"
      },
      {
        "name": "Election_Started",
        "type": "vote::Vote::Election_Started",
        "kind": "nested"
      },
      {
        "name": "Election_Ended",
        "type": "vote::Vote::Election_Ended",
        "kind": "nested"
      }
    ]
  }
] as Abi