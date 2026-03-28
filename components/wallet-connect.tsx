'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('');

  const handleConnect = () => {
    const mockAddress = '0x' + Math.random().toString(16).substring(2, 42);
    setAddress(mockAddress);
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setAddress('');
  };

  return (
    <Card className="glass-primary p-6 col-span-1">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-primary">Wallet</h3>
        {isConnected ? (
          <div className="space-y-3">
            <div className="p-3 bg-background/50 rounded-lg border border-primary/20">
              <p className="text-xs text-muted-foreground mb-1">Connected Address</p>
              <p className="text-sm font-mono text-accent truncate">{address}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-background/50 rounded-lg border border-border/30">
                <p className="text-xs text-muted-foreground">Network</p>
                <p className="text-sm font-semibold text-foreground">Starknet</p>
              </div>
              <div className="p-2 bg-background/50 rounded-lg border border-border/30">
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="text-sm font-semibold text-accent">Connected</p>
              </div>
            </div>
            <Button
              onClick={handleDisconnect}
              variant="outline"
              size="sm"
              className="w-full"
            >
              Disconnect
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Connect your Starknet wallet to participate in voting.
            </p>
            <Button
              onClick={handleConnect}
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              Connect Wallet
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}


// 'use client'

// import { useState } from 'react'
// import { Button } from '@/components/ui/button'
// import { Card } from '@/components/ui/card'
// import {
//   useConnect,
//   useDisconnect,
//   useAccount,
// } from '@starknet-react/core'

// export function WalletConnect() {
//   const { connect, connectors } = useConnect()
//   const { disconnect } = useDisconnect()
//   const { address, status } = useAccount()

//   const [connecting, setConnecting] = useState<string | null>(null)

//   const handleConnect = async (connector: any) => {

//     try {
//           console.log('hello')
//       setConnecting(connector.id)
//       await connect({ connector })
//       setConnecting(null)
//     } catch (err) {
//       console.error(err)
//       setConnecting(null)
//     }
//   }

//   return (
//     <Card className="glass-primary p-6 col-span-1">
//       <div className="space-y-4">
//         <h3 className="text-lg font-semibold text-primary">Wallet</h3>

//         {status === 'connected' ? (
//           <div className="space-y-3">
//             <div className="p-3 bg-background/50 rounded-lg border border-primary/20">
//               <p className="text-xs text-muted-foreground mb-1">
//                 Connected Address
//               </p>
//               <p className="text-sm font-mono text-accent truncate">
//                 {address}
//               </p>
//             </div>

//             <div className="grid grid-cols-2 gap-2">
//               <div className="p-2 bg-background/50 rounded-lg border border-border/30">
//                 <p className="text-xs text-muted-foreground">Network</p>
//                 <p className="text-sm font-semibold text-foreground">
//                   Starknet
//                 </p>
//               </div>
//               <div className="p-2 bg-background/50 rounded-lg border border-border/30">
//                 <p className="text-xs text-muted-foreground">Status</p>
//                 <p className="text-sm font-semibold text-accent">
//                   Connected
//                 </p>
//               </div>
//             </div>

//             <Button
//               onClick={() => disconnect()}
//               variant="outline"
//               size="sm"
//               className="w-full"
//             >
//               Disconnect
//             </Button>
//           </div>
//         ) : (
//           <div className="space-y-3">
//             <p className="text-sm text-muted-foreground">
//               Connect your Starknet wallet to participate in voting.
//             </p>

//             {/* CONNECTORS LIST */}
//             <div className="space-y-2">
//               {connectors.map((connector) => (
//                 <Button
//                   key={connector.id}
//                   onClick={() => handleConnect(connector)}
//                   disabled={connecting !== null}
//                   className="w-full flex items-center justify-between"
//                 >
//                   <span>{connector.name}</span>

//                   {connecting === connector.id && (
//                     <span className="text-xs">Connecting...</span>
//                   )}
//                 </Button>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </Card>
//   )
// }