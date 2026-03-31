'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useAccount, useContract, useSendTransaction } from '@starknet-react/core';
import { VOTE_ABI } from '@/abi/vote_abi';
import { VOTE_CONTRACT_ADDRESS } from '@/lib/utils';
import { Election_S } from '@/lib/types';

interface AdminPanelProps {
  election: Election_S | null;
}

export function AdminPanel({ election }: AdminPanelProps) {
  const [candidateInput, setCandidateInput] = useState('');
  const [showAddCandidate, setShowAddCandidate] = useState(false);

  const { address } = useAccount();
  const { contract } = useContract({
    abi: VOTE_ABI,
    address: VOTE_CONTRACT_ADDRESS,
  });

  const { send: sendTransaction } = useSendTransaction({});

  const maxCandidates = 5;
  const electionState = Number(election?.election_state ?? 0);
  const candidateCount = Number(election?.candidates_length ?? 0);

  const totalVotes =
    election?.calculate_votes?.reduce((acc, item) => {
      const votes = item[1]; // correct access for {0,1}
      return acc + Number(votes ?? 0);
    }, 0) ?? 0;

  const isMaxReached = candidateCount >= maxCandidates;

  const getStateLabel = (state: number): string => {
    return (
      {
        0: 'Not Started',
        1: 'Ongoing',
        2: 'Ended',
      }[state] ?? 'Unknown'
    );
  };

  //  ADD CANDIDATE
  const handleAddCandidate = () => {
    if (!contract || !address) {
      toast.error('Wallet not connected');
      return;
    }
    const candidateId = candidateInput.trim();

    if (!candidateId) {
      toast.error('Please enter a candidate ID');
      return;
    }

    if (isMaxReached) {
      toast.error(`Maximum ${maxCandidates} candidates reached`);
      return;
    }

    try {
      sendTransaction([
        contract.populate('add_candidate', [BigInt(candidateId)]),
      ]);

      toast.success('Candidate added successfully');
      setCandidateInput('');
      setShowAddCandidate(false);
    } catch {
      toast.error('Transaction failed');
    }
  };

  //  START ELECTION
  const handleStartElection = () => {
    if (!contract || !address) {
      toast.error('Wallet not connected');
      return;
    }

    if (candidateCount < 2) {
      toast.error('At least 2 candidates required');
      return;
    }

    try {
      sendTransaction([contract.populate('start_election', [])]);
      toast.success('Election started');
    } catch {
      toast.error('Transaction failed');
    }
  };

  // END ELECTION
  const handleEndElection = () => {
    if (!contract || !address) {
      toast.error('Wallet not connected');
      return;
    }

    try {
      sendTransaction([contract.populate('end_election', [])]);
      toast.success('Election ended');
    } catch {
      toast.error('Transaction failed');
    }
  };

  //Reset Election
  const handleReset = () => {
    if (!contract || !address) { 
      toast.error('Wallet not connected');
      return;
    }
    try {
      sendTransaction([contract.populate('reset_vote_state', [])]);
      toast.success('Election reset');
    } catch {
      toast.error('Transaction failed');
    }
  };

  return (
    <Card className="glass-primary p-6 col-span-1 md:col-span-2">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-primary">Admin Panel</h3>

        {/* STATUS */}
        <div className="space-y-3 p-3 bg-background/50 rounded-lg border border-border/30">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Election State</span>
            <span className="text-sm font-semibold text-accent">
              {getStateLabel(electionState)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Total Votes</span>
            <span className="text-sm font-bold text-foreground">
              {totalVotes}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Candidates</span>
            <span className="text-sm font-bold text-foreground">
              {candidateCount} / {maxCandidates}
            </span>
          </div>
        </div>

        {/* ADD CANDIDATE */}
        {electionState === 0 && (
          <div className="space-y-2 p-3 bg-background/50 rounded-lg border border-primary/20">
            <p className="text-sm font-semibold">Add Candidate</p>

            {!showAddCandidate ? (
              <Button
                onClick={() => setShowAddCandidate(true)}
                disabled={isMaxReached}
                className="w-full"
              >
                {isMaxReached ? 'Max Reached' : 'Add Candidate'}
              </Button>
            ) : (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Candidate ID"
                    value={candidateInput}
                    onChange={(e) => setCandidateInput(e.target.value)}
                  />
                  <Button onClick={handleAddCandidate}>Add</Button>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddCandidate(false)}
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        )}

        {/* ACTION BUTTONS */}
        {electionState === 0 && (
          <Button
            onClick={handleStartElection}
            disabled={candidateCount < 2}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            Start Election
          </Button>
        )}

        {electionState === 1 && (
          <Button
            onClick={handleEndElection}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            End Election
          </Button>
        )}

        {electionState === 2 && (
          <div className="space-y-3">
            <div className="p-3 bg-accent/10 rounded-lg border border-accent/30">
              <p className="text-sm font-semibold text-accent">Election Ended</p>
              <p className="text-xs text-muted-foreground">Results are finalized</p>
            </div>
            <Button
              onClick={handleReset}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-foreground"
            >
              Reset &amp; Start New Election
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
