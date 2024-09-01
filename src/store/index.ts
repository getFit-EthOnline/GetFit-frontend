import { BiconomySmartAccountV2 } from "@biconomy/account";
import { StaticImageData } from 'next/image';
import { create } from 'zustand';
export interface userAgentProps {
    id: number;
    name: string;
    profilePic: StaticImageData;
}
interface GlobalStore {
    address: string | null;
    setAddress: (address: string | null) => void;
    provider: any;
    setProvider: (provider: any) => void;
    userAgent: userAgentProps | null;
    setUserAgnet: (agent: userAgentProps | null) => void;
    agentFirstMessage: string | null;
    smartAccount: BiconomySmartAccountV2 | null;
  setSmartAccount: (smartAccount: BiconomySmartAccountV2) => void;
  smartAddress: string | null;
  setSmartAddress: (smartAccount: string | null) => void;
    setAgentFirstMessage: (message: string | null) => void;
}

const useGlobalStore = create<GlobalStore>()((set) => ({
    address: '',
    setAddress: (address) => set({ address }),
    provider: null,
    setProvider: (provider) => set({ provider }),
    userAgent: null,
    setUserAgnet: (agent) => set({ userAgent: agent }),
    agentFirstMessage: null,
    smartAccount: null,
    setSmartAccount: (smartAccount) => set({ smartAccount: smartAccount }),
    smartAddress: null,
    setSmartAddress: (smartAddress) => set({ smartAddress: smartAddress }),
    setAgentFirstMessage: (message) => set({ agentFirstMessage: message }),
}));

export default useGlobalStore;
