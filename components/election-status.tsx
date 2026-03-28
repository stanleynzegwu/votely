'use client';

import { VOTE_ABI } from '@/abi/vote_abi';
import { Card } from '@/components/ui/card';
import { Election, ElectionState } from '@/lib/mock-data';
import { VOTE_CONTRACT_ADDRESS } from '@/lib/utils';
import { useAccount, useContract, useReadContract, useSendTransaction } from "@starknet-react/core";

interface ElectionStatusProps {
  election: Election;
}

export function ElectionStatus({ election }: ElectionStatusProps) {

  const { data: election_state, isLoading, refetch: refetchCount, isFetching, error } = useReadContract({
    abi: VOTE_ABI,
    functionName: "get_election_state",
    address: VOTE_CONTRACT_ADDRESS,
    args: [], // empty array because , no input for the function get_election_state
    refetchInterval: 10000,
  })

  const getStatusColor = (state: number | undefined) => {
    switch (state) {
      case 1:
        return 'text-accent';
      case 0:
        return 'text-secondary';
      case 2:
        return 'text-muted-foreground';
      default:
        return 'text-foreground';
    }
  };
    
  const getStatusBgColor = (state:  number | undefined) => {
    switch (state) {
      case 1:
        return 'bg-accent/20 border-accent/50';
      case 0:
        return 'bg-secondary/20 border-secondary/50';
      case 2:
        return 'bg-muted/20 border-muted/50';
      default:
        return 'bg-muted/20 border-muted/50';
    }
  };

  const getStateLabel = (state: ElectionState): string => {
    return { 0: 'Not Started', 1: 'Ongoing', 2: 'Ended' }[state];
  };

  const statusDot = (
    <div className="flex items-center gap-2">
      <div
        className={`w-3 h-3 rounded-full ${
          election.state === 1 ? 'bg-accent animate-pulse' : 'bg-muted'
        }`}
      />
      <span className={`capitalize ${getStatusColor(Number(election_state) ?? undefined)}`}>
        {getStateLabel(election.state)}
      </span>
    </div>
  );

  return (
    <Card className="glass-primary p-6 col-span-1">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-primary mb-1">
            {election.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {election.description}
          </p>
        </div>

        <div className={`p-3 rounded-lg border ${getStatusBgColor(Number(election_state) ?? undefined)}`}>
          {statusDot}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-background/50 rounded-lg border border-border/30">
            <p className="text-xs text-muted-foreground mb-1">Total Votes</p>
            <p className="text-xl font-bold text-accent">{election.totalVotes}</p>
          </div>
          <div className="p-3 bg-background/50 rounded-lg border border-border/30">
            <p className="text-xs text-muted-foreground mb-1">Candidates</p>
            <p className="text-xl font-bold text-primary">{election.candidates.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="text-muted-foreground mb-1">Start Date</p>
            <p className="text-foreground font-semibold">
              {election.startDate.toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">End Date</p>
            <p className="text-foreground font-semibold">
              {election.endDate.toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
