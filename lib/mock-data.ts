// Mock data for elections
export type ElectionState = 0 | 1 | 2; // 0 = Not Started, 1 = Ongoing, 2 = Ended

export interface Candidate {
  id: string;
  name: string;
  platform: string;
  votes: number;
  image: string;
}

export interface Election {
  id: string;
  title: string;
  description: string;
  state: ElectionState; // 0 = Not Started, 1 = Ongoing, 2 = Ended
  startDate: Date;
  endDate: Date;
  candidates: Candidate[];
  totalVotes: number;
  maxCandidates: number;
}

export interface WalletState {
  connected: boolean;
  address: string;
  hasVoted: boolean;
}

// Candidate templates for adding
export const candidateTemplates: Candidate[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    platform: 'Climate action and renewable energy',
    votes: 0,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
  },
  {
    id: '2',
    name: 'Bob Smith',
    platform: 'Education and youth development',
    votes: 0,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
  },
  {
    id: '3',
    name: 'Carol Davis',
    platform: 'Healthcare reform and accessibility',
    votes: 0,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
  },
  {
    id: '4',
    name: 'David Wilson',
    platform: 'Technology innovation and infrastructure',
    votes: 0,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
  },
  {
    id: '5',
    name: 'Emma Thompson',
    platform: 'Social justice and community empowerment',
    votes: 0,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
  },
];

// Mock data - starts with no candidates (Not Started state)
export const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    platform: 'Climate action and renewable energy',
    votes: 1250,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
  },
  {
    id: '2',
    name: 'Bob Smith',
    platform: 'Education and youth development',
    votes: 980,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
  },
  {
    id: '3',
    name: 'Carol Davis',
    platform: 'Healthcare reform and accessibility',
    votes: 1120,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
  },
];

export const mockElection: Election = {
  id: '1',
  title: '2024 Leadership Election',
  description: 'Vote for your preferred candidate to lead our organization into the future',
  state: 1,
  startDate: new Date('2024-01-01'),
  endDate: new Date('2024-01-31'),
  candidates: mockCandidates,
  totalVotes: mockCandidates.reduce((sum, c) => sum + c.votes, 0),
  maxCandidates: 5,
};


export const mockCandidate:Candidate =  {
  id: '1',
  name: 'Alice Johnson',
  platform: 'Climate action and renewable energy',
  votes: 0,
  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
}