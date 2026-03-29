'use client';

import { useState, useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import { Header } from '@/components/header';
import { ElectionStatus } from '@/components/election-status';
import { CandidateCard } from '@/components/candidate-card';
import { VotingResults } from '@/components/voting-results';
import { AdminPanel } from '@/components/admin-panel';
import { mockElection, candidateTemplates, ElectionState, mockCandidate } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { useAccount, useContract, useReadContract, useSendTransaction } from '@starknet-react/core';
import { VOTE_ABI } from '@/abi/vote_abi';
import { calculate_total_votes, get_all_candidates, VOTE_CONTRACT_ADDRESS } from '@/lib/utils';
import { Election_S } from '@/lib/types';
import { Footer } from '@/components/Foooter';

export default function Home() {
  const [election, setElection] = useState(mockElection);
  const [election_s, setElection_s] = useState<Election_S | null>(null);
  const [currentTime, setCurrentTime] = useState('');

  //////////////
  const { address } = useAccount();
  const { contract } = useContract({
    abi: VOTE_ABI,
    address: VOTE_CONTRACT_ADDRESS,
  });
  const { data: election_state, isLoading, refetch: refetchCount, isFetching, error } = useReadContract({
    abi: VOTE_ABI,
    functionName: "get_election_state",
    address: VOTE_CONTRACT_ADDRESS,
    args: [], // empty array because , no input for the function get_election_state
    refetchInterval: 10000,
  })
  const { data: candidates_length } = useReadContract({
    abi: VOTE_ABI,
    functionName: "get_candidates_length",
    address: VOTE_CONTRACT_ADDRESS,
    args: [], // empty array because , no input for the function get_candidates_length
    refetchInterval: 10000,
  })
  const { data: calculate_votes } = useReadContract({
    abi: VOTE_ABI,
    functionName: "calculate_votes",
    address: VOTE_CONTRACT_ADDRESS,
    args: [], // empty array because , no input for the function get_candidates_length
    refetchInterval: 10000,
  })
  const { data: hasVoted } = useReadContract({
    abi: VOTE_ABI,
    functionName: "has_voted",
    address: VOTE_CONTRACT_ADDRESS,
    args: [address],
    refetchInterval: 10000,
  })
  console.log(calculate_votes)

  useEffect(() => {
    const election_s = {
      candidates_length,
      election_state,
      calculate_votes
    }
  setElection_s(election_s)
  },[candidates_length, election_state, calculate_votes])

  const { send: sendVote } = useSendTransaction({});
  /////////

  const handleVote = (candidateId: bigint) => {
    if (!contract || !address) {
      toast.error('Wallet not connected');
      return;
    }
    // Only allow voting if election is ongoing (state 1)
    if (Number(election_state) !== 1) {
      return;
    }

    try {
      sendVote([
        contract.populate("vote", [candidateId]),
      ]);

      toast.success('Voted successfully');
    } catch {
      toast.error('Transaction failed');
    }
  };

  // const handleAddCandidate = (candidateId: string) => {
  //   // Only allow adding if election hasn't started (state 0)
  //   if (election.state !== 0) {
  //     return;
  //   }

  //   // Find the candidate template
  //   const template = candidateTemplates.find((c) => c.id === candidateId);
  //   if (!template) {
  //     return;
  //   }

  //   // Check if already added
  //   if (election.candidates.some((c) => c.id === candidateId)) {
  //     return;
  //   }

  //   // const updatedElection = {
  //   //   ...election,
  //   //   candidates: [...election.candidates, template],
  //   // };

  //   // setElection(updatedElection);
  // };

  const handleStateChange = (newState: ElectionState) => {
    setElection({
      ...election,
      state: newState,
    });
  };

  const getStateLabel = (state: ElectionState): string => {
    return { 0: 'Not Started', 1: 'Ongoing', 2: 'Ended' }[state];
  };

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="bottom-right" />
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary mb-4">
            Secure Voting Platform
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience transparent and secure voting powered by blockchain technology.
            Every vote counts and is permanently recorded on-chain.
          </p>
        </div>

        {/* Election Status */}
        <div className="mb-8">
          <ElectionStatus election={election_s} />
        </div>

        {/* Voting Section - Only show if election is ongoing (state 1) */}
        {Number(Number) === 1 && (
          <div className="mb-8 animate-slide-up">
            <h3 className="text-2xl font-bold text-foreground mb-4">Cast Your Vote</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {get_all_candidates(election_s)?.map((candidate) => (
                <div
                  key={candidate[0]}
                  className="animate-slide-up"
                >
                  <CandidateCard
                    candidate={candidate}
                    mockCandidate={mockCandidate}
                    onVote={handleVote}
                    hasVoted={hasVoted}
                    totalVotes={calculate_total_votes(election_s)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Not Started Message */}
        {Number(Number) === 0 && (
          <div className="mb-8 animate-slide-up">
            <Card className="glass-primary p-8 text-center">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Election Not Started
              </h3>
              <p className="text-muted-foreground">
                The admin is adding candidates. Voting will begin soon.
              </p>
            </Card>
          </div>
        )}

        {/* Results and Admin */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <VotingResults
              candidates={get_all_candidates(election_s)}
              mockCandidates={election.candidates}
              totalVotes={calculate_total_votes(election_s)}
              electionState={Number(election_s?.election_state)}
            />
          </div>
          {/* <AdminPanel
            election={election_s}
            onAddCandidate={handleAddCandidate}
            onStateChange={handleStateChange}
          /> */}
          <AdminPanel election={election_s} />
        </div>

        {/* Election Ended Message */}
        {Number(Number) === 2 && (
          <div className="mb-8 animate-slide-up">
            <Card className="glass-primary p-8 text-center bg-accent/10 border-accent/30">
              <h3 className="text-xl font-semibold text-accent mb-2">
                Election Concluded
              </h3>
              <p className="text-muted-foreground">
                Thank you for participating. Results are finalized and displayed below.
              </p>
            </Card>
          </div>
        )}

        {/* Footer Info */}
        <Footer />
      </main>
    </div>
  );
}
