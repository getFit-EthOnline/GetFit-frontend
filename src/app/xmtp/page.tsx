'use client'
import CanMessage from '@/xmtp/CanMessage'
import CreateClient from '@/xmtp/Client'
import { ListConversations } from '@/xmtp/ListConversation'
import { StartConversation } from '@/xmtp/StartConversation'
import { useConnect, useWalletClient } from 'wagmi'

const XMTP = () => {
    const { connect, connectors, error } = useConnect();
    const { data: walletClient } = useWalletClient();

    return (
        <div>
            <h1>Can Message</h1>
            {walletClient ? <CreateClient signer={walletClient} /> : <div >Connect
                {connectors.map((connector) => {
                    return (
                        <button className="card" key={connector.id} onClick={() => connect({ connector })}>
                            {connector.name}
                        </button>
                    );
                })}
            </div>}
            <div className='h-[400px] bg-slate-600 w-full'>
                <CanMessage />
            </div>
            <StartConversation />
            <ListConversations />
        </div>
    )
}

export default XMTP