import useGlobalStore from '@/store';
import { toastStyles } from '@/utils/utils';
import { useQuery } from '@tanstack/react-query';
import { Client } from '@xmtp/xmtp-js';
import axios from 'axios';
import { Wallet } from 'ethers';
import toast from 'react-hot-toast';
import { useAccount } from 'wagmi';

const useSubscribe = () => {
    const { userEmail } = useGlobalStore();
    const { address } = useAccount();
    const { data } = useQuery({
        queryKey: ['creator-subscription', address, 'david goggins'],
        enabled: !!address,
        queryFn: async () =>
            await axios.get<{ found: boolean }>('/api/creator-subscription', {
                params: {
                    address,
                    creator: 'david goggins',
                },
            }),
    });

    const newConversation = async function (
        xmtp_client: Client,
        addressTo: string
    ) {
        if (await xmtp_client?.canMessage(addressTo)) {
            const conversation =
                await xmtp_client.conversations.newConversation(addressTo);
            await conversation.send(
                'Thanks for subscribing to my plan, we will send you daily updates on your email everyday'
            );
        } else {
            console.log('cant message because is not on the network.');
        }
    };

    const handleSubscribe = async () => {
        if (!address || !userEmail || data?.data.found) {
            return;
        }
        toast.loading('Subscribing...', toastStyles);
        try {
            const signer = new Wallet(
                process.env.SUBSCRIPTION_BOT_KEY as string
            );
            const xmtp = await Client.create(signer, { env: 'production' });
            await newConversation(xmtp, address);

            await axios.post('/api/creator-subscription', {
                address,
                email: userEmail,
                creator: 'david goggins',
            });

            toast.success('Subscription successful', toastStyles);
        } catch (error) {
            console.error('Subscription failed:', error);
            toast.error('Subscription failed', toastStyles);
        } finally {
            toast.remove();
        }
    };

    return { handleSubscribe };
};

export default useSubscribe;
