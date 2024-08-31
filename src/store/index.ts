import { StaticImageData } from 'next/image';
import { create } from 'zustand';
export interface userAgentProps {
    id: number;
    name: string;
    profilePic: StaticImageData;
}
interface GlobalStore {
    userAgent: userAgentProps | null;
    setUserAgnet: (agent: userAgentProps | null) => void;
}

const useGlobalStore = create<GlobalStore>()((set) => ({
    userAgent: null,
    setUserAgnet: (agent) => set({ userAgent: agent }),
}));

export default useGlobalStore;
