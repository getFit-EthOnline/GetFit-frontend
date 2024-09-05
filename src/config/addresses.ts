import { Address } from "viem";
import { morphHolesky } from "viem/chains";
import { spicy } from "./chains";
export const GALADRIEL_FITNESS_AGENT_ADDRESS =
  "0x054ba199Ef61ef15226e2CeB61138f7d5E2F8408";

type AddressMap = {
  [chainId: number]: {
    USDC_TOKEN_ADDRESS: Address;
    BETTING_CONTRACT_ADDRESS: Address;
  };
};

export const ADDRESS_MAP: AddressMap = {
  [morphHolesky.id]: {
    USDC_TOKEN_ADDRESS: "0x94c17DD37ED3Ca85764b35BfD4d1CCc543b1bE3E",
    BETTING_CONTRACT_ADDRESS: "0x14097485976CB545d743452f66604bEAC141Cc98",
  },
  [spicy.id]: {
    USDC_TOKEN_ADDRESS: "0xF99b791257ab50be7F235BC825E7d4B83942cf38",
    BETTING_CONTRACT_ADDRESS: "0x9d24c52916A14afc31D86B5Aa046b252383ee444",
  },
};

export const getAddressesForChain = (chainId: number) => ADDRESS_MAP[chainId];
