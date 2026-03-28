'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Candidate } from '@/lib/mock-data';
import Image from 'next/image';

interface CandidateCardProps {
  candidate: Candidate;
  onVote: (candidateId: string) => void;
  isVoting?: boolean;
  hasVoted?: boolean;
  totalVotes: number;
}

export function CandidateCard({
  candidate,
  onVote,
  isVoting,
  hasVoted,
  totalVotes,
}: CandidateCardProps) {
  const votePercentage = totalVotes > 0 ? (candidate.votes / totalVotes) * 100 : 0;

  return (
    <Card className="glass p-4 overflow-hidden group hover:border-primary/50 transition-all duration-300">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="font-semibold text-foreground text-sm line-clamp-1">
              {candidate.name}
            </h4>
            <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
              {candidate.platform}
            </p>
          </div>
          <div className="flex-shrink-0 ml-2">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-primary/30">
              <Image
                src={candidate.image}
                alt={candidate.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">Votes</span>
            <span className="font-semibold text-accent">{candidate.votes}</span>
          </div>
          <div className="w-full bg-background/50 rounded-full h-2 overflow-hidden border border-border/30">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{ width: `${votePercentage}%` }}
            />
          </div>
          <div className="text-right">
            <span className="text-xs text-muted-foreground">
              {votePercentage.toFixed(1)}%
            </span>
          </div>
        </div>

        <Button
          onClick={() => onVote(candidate.id)}
          disabled={isVoting || hasVoted}
          className="w-full text-xs h-8 bg-gradient-to-r from-primary to-accent hover:opacity-90 disabled:opacity-50"
        >
          {hasVoted ? 'Voted' : 'Vote'}
        </Button>
      </div>
    </Card>
  );
}
