// 'use client';

// import { useState } from 'react';
// import { Card } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Election, ElectionState, candidateTemplates } from '@/lib/mock-data';
// import { toast } from 'sonner';
// import { useAccount, useContract, useSendTransaction } from '@starknet-react/core';
// import { VOTE_ABI } from '@/abi/vote_abi';
// import { VOTE_CONTRACT_ADDRESS } from '@/lib/utils';
// import { Election_S } from '@/lib/types';


// interface AdminPanelProps {
//   election: Election_S | null;
//   onAddCandidate?: (candidateId: string) => void;
//   onStateChange?: (newState: ElectionState) => void;
// }

// export function AdminPanel({ election, onAddCandidate, onStateChange }: AdminPanelProps) {
//   const [candidateInput, setCandidateInput] = useState('');
//   const [isEditing, setIsEditing] = useState(false);
//   const [showAddCandidate, setShowAddCandidate] = useState(false);

//   //////////////
//   const {address } = useAccount();
//   const { contract } = useContract({
//     abi: VOTE_ABI,
//     address: VOTE_CONTRACT_ADDRESS,
//   });
//   const { send: add_candidate, error: add_transaction_Error } = useSendTransaction({
//     calls:
//       contract && address
//         ? [contract.populate("add_candidate", [BigInt(candidateInput)])]
//         : undefined,
//   });
//   //////////////


//   const maxCandidates = 5;
//   const candidateCount = election?.candidates_length ?? 0;
//   const isMaxReached = candidateCount >= maxCandidates;


//   const handleAddCandidate = () => {
//     const candidateId = candidateInput.trim();

//     if (!candidateId) {
//       toast.error('Please enter a candidate ID');
//       return;
//     }

//     // Check if candidate already exists
//     // if (election.candidates.some((c) => c.id === candidateId)) {
//     //   toast.error('This candidate has already been added');
//     //   return;
//     // }

//     // Check max candidates
//     if (isMaxReached) {
//       toast.error(`Maximum ${maxCandidates} candidates reached`);
//       return;
//     }

//     // Find candidate template
//     // const template = candidateTemplates.find((c) => c.id === candidateId);
//     // if (!template) {
//     //   toast.error('Candidate ID not found');
//     //   return;
//     // }
//     add_candidate();
//     onAddCandidate?.(candidateId);
//     toast.success('Candidate added successfully');
//     setCandidateInput('');
//     setShowAddCandidate(false);
//   };

//   const handleStateChange = (newState: ElectionState) => {
//     onStateChange?.(newState);
//     setIsEditing(false);
//     const stateLabels: Record<ElectionState, string> = {
//       0: 'Not Started',
//       1: 'Ongoing',
//       2: 'Ended',
//     };
//     toast.success(`Election state changed to ${stateLabels[newState]}`);
//   };

//   const getStateLabel = (state: number): string => {
//     return { 0: 'Not Started', 1: 'Ongoing', 2: 'Ended' }[state];
//   };

//   return (
//     <Card className="glass-primary p-6 col-span-1 md:col-span-2">
//       <div className="space-y-4">
//         <h3 className="text-lg font-semibold text-primary">Admin Panel</h3>

//         <div className="space-y-3 p-3 bg-background/50 rounded-lg border border-border/30">
//           <div className="flex items-center justify-between">
//             <span className="text-sm text-muted-foreground">Election State</span>
//             <span className="text-sm font-semibold text-accent capitalize">
//               {getStateLabel(election?.election_state ?? 0)}
//             </span>
//           </div>
//           <div className="flex items-center justify-between">
//             <span className="text-sm text-muted-foreground">Total Votes</span>
//             <span className="text-sm font-bold text-foreground">
//               {election.totalVotes}
//             </span>
//           </div>
//           <div className="flex items-center justify-between">
//             <span className="text-sm text-muted-foreground">Candidates</span>
//             <span className="text-sm font-bold text-foreground">
//               {candidateCount} / {maxCandidates}
//             </span>
//           </div>
//         </div>

//         {/* Add Candidate Section - Only show if state is 0 (Not Started) */}
//         {election.state === 0 && (
//           <div className="space-y-2 p-3 bg-background/50 rounded-lg border border-primary/20 animate-slide-up">
//             <div>
//               <p className="text-sm font-semibold text-foreground mb-1">Add Candidate</p>
//               <p className="text-xs text-muted-foreground mb-3">
//                 Candidates can only be added before the election starts
//               </p>
//             </div>

//             {!showAddCandidate ? (
//               <Button
//                 onClick={() => setShowAddCandidate(true)}
//                 disabled={isMaxReached}
//                 className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-foreground shadow-lg hover:shadow-primary/50"
//               >
//                 {isMaxReached ? 'Maximum Candidates Reached' : 'Add New Candidate'}
//               </Button>
//             ) : (
//               <div className="space-y-2">
//                 <div className="flex gap-2">
//                   <Input
//                     type="number"
//                     min="1"
//                     max="5"
//                     placeholder="Enter candidate ID (1-5)"
//                     value={candidateInput}
//                     onChange={(e) => setCandidateInput(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && handleAddCandidate()}
//                     className="flex-1"
//                     disabled={isMaxReached}
//                   />
//                   <Button
//                     onClick={handleAddCandidate}
//                     disabled={isMaxReached || !candidateInput.trim()}
//                     className="bg-primary hover:bg-primary/90"
//                   >
//                     Add
//                   </Button>
//                 </div>
//                 <Button
//                   onClick={() => setShowAddCandidate(false)}
//                   variant="outline"
//                   size="sm"
//                   className="w-full text-xs"
//                 >
//                   Cancel
//                 </Button>
//               </div>
//             )}
//           </div>
//         )}

//         {/* State Control Section */}
//         {isEditing ? (
//           <div className="space-y-2 animate-slide-up">
//             <p className="text-xs text-muted-foreground mb-2">Change Election State</p>
//             <div className="grid grid-cols-3 gap-2">
//               <Button
//                 onClick={() => handleStateChange(0)}
//                 variant={election.state === 0 ? 'default' : 'outline'}
//                 size="sm"
//                 className="text-xs"
//               >
//                 Start
//               </Button>
//               <Button
//                 onClick={() => handleStateChange(1)}
//                 variant={election.state === 1 ? 'default' : 'outline'}
//                 disabled={candidateCount === 0}
//                 size="sm"
//                 className="text-xs"
//               >
//                 Go Live
//               </Button>
//               <Button
//                 onClick={() => handleStateChange(2)}
//                 variant={election.state === 2 ? 'default' : 'outline'}
//                 disabled={election.state !== 1}
//                 size="sm"
//                 className="text-xs"
//               >
//                 End
//               </Button>
//             </div>
//           </div>
//         ) : (
//           <Button
//             onClick={() => setIsEditing(true)}
//             variant="outline"
//             size="sm"
//             className="w-full"
//           >
//             Change Election State
//           </Button>
//         )}

//         {/* Conditional Action Buttons */}
//         {election.state === 0 && (
//           <Button
//             onClick={() => handleStateChange(1)}
//             disabled={candidateCount === 0}
//             className="w-full bg-green-600 hover:bg-green-700 text-white"
//           >
//             Start Election {candidateCount === 0 ? '(Add candidates first)' : ''}
//           </Button>
//         )}

//         {election.state === 1 && (
//           <Button
//             onClick={() => handleStateChange(2)}
//             className="w-full bg-red-600 hover:bg-red-700 text-white"
//           >
//             End Election
//           </Button>
//         )}

//         {election.state !== 2 && (
//           <div className="grid grid-cols-2 gap-2">
//             <Button
//               variant="outline"
//               size="sm"
//               className="text-xs"
//             >
//               Export Data
//             </Button>
//             <Button
//               variant="outline"
//               size="sm"
//               className="text-xs"
//             >
//               View Logs
//             </Button>
//           </div>
//         )}

//         {election.state === 2 && (
//           <div className="p-3 bg-accent/10 rounded-lg border border-accent/30">
//             <p className="text-sm font-semibold text-accent">Election Ended</p>
//             <p className="text-xs text-muted-foreground mt-1">
//               Results are finalized and visible below
//             </p>
//           </div>
//         )}
//       </div>
//     </Card>
//   );
// }


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

  // ✅ SAFE VALUES
  const electionState = Number(election?.election_state ?? 0);
  const candidateCount = Number(election?.candidates_length ?? 0);

  // ✅ FIXED (NO ITERABLE ERROR)
  const totalVotes =
    election?.calculate_votes?.reduce((acc, item) => {
      const votes = item[1]; // 👈 correct access for {0,1}
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

  // ✅ ADD CANDIDATE
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

  // ✅ START ELECTION
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

  // ✅ END ELECTION
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
          <div className="p-3 bg-accent/10 rounded-lg border border-accent/30">
            <p className="text-sm font-semibold text-accent">
              Election Ended
            </p>
            <p className="text-xs text-muted-foreground">
              Results are finalized
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}