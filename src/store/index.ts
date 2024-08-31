import { create } from 'zustand';

interface GlobalStore {
    userAgent: string | null;
    setUserAgnet: (agent: string | null) => void;
}

const useGlobalStore = create<GlobalStore>()((set) => ({
    userAgent: null,
    setUserAgnet: (agent) => set({ userAgent: agent }),
}));

export default useGlobalStore;
