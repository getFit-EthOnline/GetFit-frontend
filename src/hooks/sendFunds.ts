import { getAddressesForChain } from "@/config/addresses";
import { galadriel_devnet, isMorphHolesky, spicy } from "@/config/chains";
import { BiconomySmartAccountV2 } from "@biconomy/account";
import {
  Address,
  Chain,
  createWalletClient,
  erc20Abi,
  getAddress,
  http,
  PublicClient,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";

const account = privateKeyToAccount(
  process.env.NEXT_PUBLIC_PK as `0x${string}`
);

const AMOUNT_TO_SEND = BigInt(100e6);

export const sendTestFunds = async ({
  publicClient,
  chain,
  smartAccount,
  smartAddress,
  address,
}: {
  publicClient?: PublicClient;
  chain: Chain;
  smartAccount?: BiconomySmartAccountV2;
  smartAddress?: Address;
  address?: Address;
}) => {
  debugger;
  const client = createWalletClient({
    account: account,
    chain: chain,
    transport: http(
      chain && chain.id === spicy.id
        ? "https://chiliz-spicy-rpc.publicnode.com"
        : "https://rpc-quicknode-holesky.morphl2.io"
    ),
  });

  if (!publicClient || !chain) return;
  if (chain.id === galadriel_devnet.id) return;

  const { USDC_TOKEN_ADDRESS } = getAddressesForChain(chain.id);
  const args =
    isMorphHolesky(chain.id) && smartAccount
      ? getAddress(smartAddress ?? "")
      : getAddress(address ?? "");
  let balance;
  let nativeBalance;
  try {
    balance = await publicClient.readContract({
      abi: erc20Abi,
      address: USDC_TOKEN_ADDRESS,
      functionName: "balanceOf",
      args: [args],
    });
    nativeBalance = await publicClient.getBalance({
      address: args,
    });
  } catch (error) {
    console.error("Error reading contract balance:", error);
    throw error;
  }
  if (balance > BigInt(0) && nativeBalance > BigInt(0)) return;
  if (chain.id === spicy.id) {
    let tx;
    try {
      tx = await client.sendTransaction({
        to: args,
        value: BigInt(1e18),
        account: account,
        chain: chain,
      });
    } catch (error) {
      console.error("Error sending transaction:", error);
      throw error;
    }
    const receipt = await publicClient.waitForTransactionReceipt({
      hash: tx,
    });
  }
  if (balance > BigInt(0)) return;
  const tx = await client.writeContract({
    chain: chain,
    address: USDC_TOKEN_ADDRESS,
    abi: erc20Abi,
    functionName: "transfer",
    args: [args, AMOUNT_TO_SEND],
  });
  const sendUSDCReceipt = await publicClient.waitForTransactionReceipt({
    hash: tx,
  });
  return sendUSDCReceipt;
};
