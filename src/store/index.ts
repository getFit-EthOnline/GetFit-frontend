import { StaticImageData } from 'next/image';
import { create } from 'zustand';
import { BiconomySmartAccountV2 } from '@biconomy/account';
export interface userAgentProps {
    id: number;
    name: string;
    profilePic: StaticImageData;
}
type userProfileType = {
    age: string;
    gender: string;
    height: string;
    weight: string;
    goal: string;
    dietRequired: string;
};
interface GlobalStore {
    streak: boolean[];
    setStreak: (streak: boolean[]) => void;
    smartAddress: string | null;
    setSmartAddress: (smartAccount: string | null) => void;
    userProfile: userProfileType;
    setUserProfile: (profile: userProfileType) => void;
    chatId: number;
    setChatId: (chatId: number) => void;
    userId: string;
    setUserId: (userId: string) => void;
    smartAccount: BiconomySmartAccountV2 | null;
    setSmartAccount: (smartAccount: BiconomySmartAccountV2) => void;
    userName: string | undefined;
    userEmail: string | undefined;
    setUserEmail: (email: string | undefined) => void;
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
    streak: [false, false, false, false, false, false, false],
    setStreak: (streak) => set({ streak: streak }),
    smartAddress: null,
    setSmartAddress: (smartAddress) => set({ smartAddress: smartAddress }),
    userProfile: {
        age: '',
        gender: '',
        height: '',
        weight: '',
        goal: '',
        dietRequired: '',
    },
    setUserProfile: (profile) => set({ userProfile: profile }),
    chatId: 0,
    setChatId: (chatId) => set({ chatId: chatId }),
    userId: '',
    setUserId: (userId) => set({ userId: userId }),
    smartAccount: null,
    setSmartAccount: (smartAccount) => set({ smartAccount: smartAccount }),
    userName: '',
    userEmail: '',
    setUserEmail: (email) => set({ userEmail: email }),
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
