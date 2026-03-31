'use client';

import { Card } from '@/components/ui/card';

interface WinnerDisplayProps {
  candidates: {0: bigint, 1: bigint}[] | undefined; //{0:candidateId, 1: candidateVotes};
  totalVotes: number;
}

export function WinnerDisplay({ candidates, totalVotes }: WinnerDisplayProps) {
  if (candidates?.length === 0 || candidates == undefined) {
    return null;
  }

  // Find max votes
  const maxVotes = Math.max(...candidates.map((c) => Number(c[1])));
  
  // Find all candidates with max votes (handle ties)
  const winners = candidates?.filter((c) =>  Number(c[1]) === maxVotes);
  
  const isTie = winners.length > 1;

  return (
    <Card className="glass-primary p-8 col-span-1 md:col-span-3 animate-slide-up border-accent/50 bg-accent/5">
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-sm font-semibold text-accent mb-2 uppercase tracking-wide">
            {isTie ? '🏁 Election Results - Tie' : '🏆 Election Winner'}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
            {/* {isTie ? 'It\'s a Tie!' : winners[0]?.name} */}
            {isTie ? 'It\'s a Tie!' : winners[0][0]}
          </h2>
        </div>

        {isTie ? (
          <div className="space-y-4">
            <p className="text-center text-muted-foreground">
              Multiple candidates received the same number of votes:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {winners.map((winner, index) => (
                <div
                  key={winner[0]}
                  className="p-4 bg-background/50 rounded-lg border border-accent/30 text-center"
                >
                  {/* <p className="font-semibold text-foreground mb-2">{winner.name}</p> */}
                   <p className="font-semibold text-foreground mb-2">{`ID: ${winner[0]}`}</p>
                  <div className="flex items-center justify-center gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Votes</p>
                      <p className="text-2xl font-bold text-accent">{winner[1]}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Percentage</p>
                      <p className="text-2xl font-bold text-primary">
                        {totalVotes > 0 ? ((Number(winner[1]) / totalVotes) * 100).toFixed(1) : 0}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground italic">
              A runoff or additional voting may be required to determine a single winner.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-background/50 rounded-lg border border-border/30">
                <p className="text-xs text-muted-foreground mb-1">Total Votes</p>
                <p className="text-3xl font-bold text-accent">{winners[0][1] || 0}</p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg border border-border/30">
                <p className="text-xs text-muted-foreground mb-1">Vote Share</p>
                <p className="text-3xl font-bold text-primary">
                  {totalVotes > 0 ? ((Number(winners[0][1]) || 0) / totalVotes * 100).toFixed(1) : 0}%
                </p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg border border-border/30">
                <p className="text-xs text-muted-foreground mb-1">Total Votes Cast</p>
                <p className="text-3xl font-bold text-secondary">{totalVotes}</p>
              </div>
            </div>

            <div className="p-4 bg-primary/10 rounded-lg border border-primary/30 text-center">
              <p className="text-foreground font-semibold">
                {`ID: ${winners[0][0]}`} wins with {winners[0][1]} votes!
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {/* {winners[0]?.platform} */}
                {"Healthcare reform and accessibility"}
              </p>
            </div>

            {/* Runner-up info */}
            {candidates.length > 1 && (
              <div className="pt-4 border-t border-border/30">
                <p className="text-xs text-muted-foreground text-center mb-3">Other Results</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {candidates
                    .filter((c) => c[0] !== winners[0][0])
                    .sort((a, b) => Number(b[1]) - Number(a[1]))
                    .map((candidate) => (
                      <div
                        key={candidate[0]} //candidateID
                        className="p-2 bg-background/50 rounded border border-border/30 flex items-center justify-between"
                      >
                        <p className="text-sm text-foreground">{`ID: ${candidate[0]}`}</p>
                        <div className="flex gap-2">
                          <span className="text-xs font-semibold text-muted-foreground">
                             {candidate[1]} {/*candidate votes */}
                          </span>
                          <span className="text-xs text-accent">
                            {totalVotes > 0 ? ((Number(candidate[1]) / totalVotes) * 100).toFixed(1) : 0}%
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
