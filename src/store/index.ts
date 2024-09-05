import { StaticImageData } from 'next/image';
import { create } from 'zustand';
import { BiconomySmartAccountV2 } from '@biconomy/account';
export interface userAgentProps {
    id: number;
    name: string;
    profilePic: StaticImageData;
}
interface GlobalStore {
    smartAddress: string | null;
    setSmartAddress: (smartAccount: string | null) => void;
    smartAccount: BiconomySmartAccountV2 | null;
    setSmartAccount: (smartAccount: BiconomySmartAccountV2) => void;
    userName: string | undefined;
    setUserName: (name: string | undefined) => void;
    balance: string | null;
    setBalance: (balance: string | null) => void;
    fitnessRunTrx: string | null;
    setFitnessRunTrx: (trx: string | null) => void;
    address: string | null;
    setAddress: (address: string | null) => void;
    provider: any;
    setProvider: (provider: any) => void;
    userAgent: userAgentProps | null;
    setUserAgnet: (agent: userAgentProps | null) => void;
    agentFirstMessage: string | null;
    setAgentFirstMessage: (message: string | null) => void;
}

const useGlobalStore = create<GlobalStore>()((set) => ({
    smartAddress: null,
    setSmartAddress: (smartAddress) => set({ smartAddress: smartAddress }),
    smartAccount: null,
    setSmartAccount: (smartAccount) => set({ smartAccount: smartAccount }),
    userName: '',
    setUserName: (name) => set({ userName: name }),
    balance: null,
    setBalance: (balance) => set({ balance }),
    fitnessRunTrx: null,
    setFitnessRunTrx: (trx) => set({ fitnessRunTrx: trx }),
    address: '',
    setAddress: (address) => set({ address }),
    provider: null,
    setProvider: (provider) => set({ provider }),
    userAgent: null,
    setUserAgnet: (agent) => set({ userAgent: agent }),
    agentFirstMessage: null,
    setAgentFirstMessage: (message) => set({ agentFirstMessage: message }),
}));

export default useGlobalStore;
