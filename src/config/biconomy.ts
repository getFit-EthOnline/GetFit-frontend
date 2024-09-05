import { Bundler } from "@biconomy/account";
import { morphHolesky } from "viem/chains";
import { spicy } from "./chains";

const CHILIZ_BUNDLER_ENTRYPOINT_ADDRESS =
  "0x00000061FEfce24A79343c27127435286BB7A4E1";
const MORPH_HOLESKY_BUNDLER_ENTRYPOINT_ADDRESS =
  "0x00000061FEfce24A79343c27127435286BB7A4E1";

export const chilizBundler = new Bundler({
  bundlerUrl: `https://bundler.biconomy.io/api/v2/${spicy.id}/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44`,
  chainId: spicy.id,
  entryPointAddress: CHILIZ_BUNDLER_ENTRYPOINT_ADDRESS,
});

export const morphHoleskyBundler = new Bundler({
  bundlerUrl: `https://bundler.biconomy.io/api/v2/${morphHolesky.id}/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44`,
  chainId: morphHolesky.id,
});

const BICONOMY_CONFIG = {
  [morphHolesky.id]: {
    bundler: morphHoleskyBundler,
    paymasterUrl:
      "https://paymaster.biconomy.io/api/v1/2810/DS-wEbVvs.54923a20-d8fe-47e7-9cff-94133e4a9716",
    paymasterApiKey: "DS-wEbVvs.54923a20-d8fe-47e7-9cff-94133e4a9716",
  },
  [spicy.id]: {
    bundler: chilizBundler,
    paymasterUrl:
      "https://paymaster.biconomy.io/api/v1/88882/Pif4RJCbe.a229636b-777b-484e-8b48-ec39049a6cad",
    paymasterApiKey: "Pif4RJCbe.a229636b-777b-484e-8b48-ec39049a6cad",
  },
};

export default BICONOMY_CONFIG;
