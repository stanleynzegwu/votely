'use client';

import { Card } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface VotingResultsProps {
  candidates: {0: bigint, 1: bigint}[] | undefined;
  totalVotes: number;
  electionState?: number | undefined;
}

const colors = ['oklch(0.6 0.25 270)', 'oklch(0.55 0.22 290)', 'oklch(0.5 0.2 310)', 'oklch(0.65 0.23 250)'];

export function VotingResults({ candidates, totalVotes, electionState = 1 }: VotingResultsProps) {
  const hasNoCandidates = candidates?.length === 0;
  const chartData = candidates?.map((candidate) => ({
    name: `ID-${Number(candidate[0])}`,
    votes: Number(candidate[1]),
    percentage: totalVotes > 0 ? ((Number(candidate[0]) / totalVotes) * 100).toFixed(1) : 0,
  }));

  // Show empty state if no candidates
  if (hasNoCandidates) {
    return (
      <Card className="glass-primary p-6 col-span-1 md:col-span-2 lg:col-span-3">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary">Voting Results</h3>
          <div className="bg-background/50 rounded-lg border border-border/30 p-8 text-center min-h-[300px] flex items-center justify-center">
            <div className="space-y-2">
              <p className="text-muted-foreground">
                {electionState === 0 
                  ? 'Candidates are being added...' 
                  : 'No candidates available yet'}
              </p>
              <p className="text-xs text-muted-foreground">
                {electionState === 0 
                  ? 'Results will appear once the election starts' 
                  : 'Check back soon'}
              </p>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`glass-primary p-6 col-span-1 md:col-span-2 lg:col-span-3 ${
      electionState === 2 ? 'border-accent/50 bg-accent/5' : ''
    }`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-primary">Voting Results</h3>
          {electionState === 2 && (
            <span className="text-xs font-semibold px-2 py-1 bg-accent/20 text-accent rounded-full">
              Final Results
            </span>
          )}
        </div>

        <div className="bg-background/50 rounded-lg border border-border/30 p-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.2 0.02 0)" />
              <XAxis
                dataKey="name"
                tick={{ fill: 'oklch(0.95 0.01 0)', fontSize: 12 }}
              />
              <YAxis tick={{ fill: 'oklch(0.95 0.01 0)', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'oklch(0.12 0 0)',
                  border: '1px solid oklch(0.2 0.02 0)',
                  borderRadius: '0.5rem',
                  color: 'oklch(0.95 0.01 0)',
                }}
                labelStyle={{ color: 'oklch(0.95 0.01 0)' }}
              />
              <Bar dataKey="votes" radius={[8, 8, 0, 0]}>
                {chartData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {candidates?.map((candidate, index) => (
            <div
              key={candidate[0]}
              className="p-3 bg-background/50 rounded-lg border border-border/30"
            >
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                {/* <p className="text-xs text-muted-foreground truncate">{candidate.name.split(' ')[0]}</p> */}
                <p className="text-xs text-muted-foreground truncate">{candidate[0]}</p>
              </div>
              <p className="text-sm font-bold text-foreground">{Number(candidate[1])}</p>
              <p className="text-xs text-accent">
                {totalVotes > 0 ? ((Number(candidate[1]) / totalVotes) * 100).toFixed(1) : 0}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
