import { defineChain } from "viem";
import { morphHolesky } from "viem/chains";

export const galadriel_devnet = defineChain({
  id: 696969,
  name: "Galadriel Devnet",
  nativeCurrency: { name: "GAL", symbol: "GAL", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://devnet.galadriel.com"] },
  },
  blockExplorers: {
    default: {
      name: "Galadriel Devnet explorer",
      url: "https://explorer.galadriel.com",
    },
  },
});
export const spicy = defineChain({
  id: 88_882,
  name: "Chiliz Spicy Testnet",
  network: "chiliz-spicy-Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "CHZ",
    symbol: "CHZ",
  },
  rpcUrls: {
    default: {
      http: ["https://chiliz-spicy-rpc.publicnode.com"],
      webSocket: [
        "wss://spicy-rpc-ws.chiliz.com",
        "wss://chiliz-spicy-rpc.publicnode.com",
      ],
    },
  },
  blockExplorers: {
    default: {
      name: "Chiliz Explorer",
      url: "http://spicy-explorer.chiliz.com",
      apiUrl: "http://spicy-explorer.chiliz.com/api",
    },
  },
  testnet: true,
});

export const isMorphHolesky = (chainid: number) => chainid === morphHolesky.id;
