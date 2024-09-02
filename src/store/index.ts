import { StaticImageData } from 'next/image';
import { create } from 'zustand';
export interface userAgentProps {
    id: number;
    name: string;
    profilePic: StaticImageData;
}
interface GlobalStore {
    fitnessRunTrx: string | null;
    setFitnessRunTrx: (trx: string | null) => void;
    workoutTrx: string | null;
    setWorkoutTrx: (trx: string | null) => void;
    dietTrx: string | null;
    setDietTrx: (trx: string | null) => void;
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
    fitnessRunTrx: null,
    setFitnessRunTrx: (trx) => set({ fitnessRunTrx: trx }),
    workoutTrx: null,
    setWorkoutTrx: (trx) => set({ workoutTrx: trx }),
    dietTrx: null,
    setDietTrx: (trx) => set({ dietTrx: trx }),
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
