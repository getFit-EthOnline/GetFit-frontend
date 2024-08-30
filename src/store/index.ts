import { BiconomySmartAccountV2 } from "@biconomy/account";
import { create } from "zustand";

interface GlobalStore {
  smartAccount: BiconomySmartAccountV2 | null;
  setSmartAccount: (smartAccount: BiconomySmartAccountV2) => void;
  smartAddress: string | null;
  setSmartAddress: (smartAccount: string | null) => void;
}

const useGlobalStore = create<GlobalStore>()((set) => ({
  smartAccount: null,
  setSmartAccount: (smartAccount) => set({ smartAccount: smartAccount }),
  smartAddress: null,
  setSmartAddress: (smartAddress) => set({ smartAddress: smartAddress }),
}));

export default useGlobalStore;
