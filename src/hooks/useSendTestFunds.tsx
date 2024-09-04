import { getAddressesForChain } from '@/config/addresses'
import { galadriel_devnet, isMorphHolesky } from '@/config/chains'
import useGlobalStore from '@/store'
import { useMutation } from '@tanstack/react-query'
import { Chain, createWalletClient, erc20Abi, getAddress, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { spicy } from 'viem/chains'
import { useAccount, usePublicClient } from 'wagmi'

const account = privateKeyToAccount(process.env.NEXT_PUBLIC_PK as `0x${string}`)

const AMOUNT_TO_SEND = BigInt(100e6)

const useSendTestFundsMutation = ({ chain }: { chain?: Chain }) => {
    const { address } = useAccount()
    const { smartAccount, smartAddress } = useGlobalStore()
    const publicClient = usePublicClient()

    const client = createWalletClient({
        account: account,
        chain: chain,
        transport: http(),
        // transport: http(config.chains[chain?.id ?? 0].rpcUrls.default.http[0])
    })


    return useMutation({
        mutationKey: ["send-test-funds"],
        mutationFn: async () => {
            if (!publicClient || !chain) return
            if (chain.id === galadriel_devnet.id) return

            const { USDC_TOKEN_ADDRESS } = getAddressesForChain(chain.id)
            const args = isMorphHolesky(chain.id) && smartAccount ? getAddress(smartAddress ?? '') : getAddress(address ?? '')
            let balance;
            try {
                balance = await publicClient.readContract({
                    abi: erc20Abi,
                    address: USDC_TOKEN_ADDRESS,
                    functionName: 'balanceOf',
                    args: [args],
                });
            } catch (error) {
                debugger
                console.error('Error reading contract balance:', error);
                throw error;
            }
            debugger
            if (balance > BigInt(0)) return
            debugger
            if (chain.id === spicy.id) {
                let tx;
                try {
                    tx = await client.sendTransaction({
                        to: account.address,
                        value: BigInt(1e18),
                        account: account,
                        chain: chain,
                    });
                } catch (error) {
                    debugger
                    console.error('Error sending transaction:', error);
                    throw error;
                }
                const receipt = await publicClient.waitForTransactionReceipt({
                    hash: tx
                })
            }
            const tx = await client.writeContract({
                chain: chain,
                address: USDC_TOKEN_ADDRESS,
                abi: erc20Abi,
                functionName: 'transfer',
                args: [args, AMOUNT_TO_SEND]
            })
            const sendUSDCReceipt = await publicClient.waitForTransactionReceipt({
                hash: tx
            })
            return sendUSDCReceipt
        }
    })
}

export default useSendTestFundsMutation