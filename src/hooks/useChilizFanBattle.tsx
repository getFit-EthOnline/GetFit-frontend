import { CHILIZ_FAN_BATTLE_ABI } from '@/abi/CHILIZ_FAN_BATTLE_ABI'
import { CHILIZ_FAN_BATTLE_ADDRESS } from '@/config/addresses'
import useGlobalStore from '@/store'
import { PaymasterMode } from '@biconomy/account'
import { encodeFunctionData } from 'viem'
import { usePublicClient } from 'wagmi'

const useChilizFanBattle = () => {
    const publicClient = usePublicClient()
    const { smartAccount } = useGlobalStore()
    const participateInBattle = async (team: string) => {
        if (!publicClient || !smartAccount) return
        debugger
        const txData = encodeFunctionData({
            abi: CHILIZ_FAN_BATTLE_ABI,
            functionName: 'joinTeam',
            args: [team],
        });
        const tx = {
            to: CHILIZ_FAN_BATTLE_ADDRESS,
            data: txData,
        };
        try {
            const userOpResponse = await smartAccount.sendTransaction([tx], {
                paymasterServiceData: { mode: PaymasterMode.SPONSORED },
            });
            debugger
            const userOpReceipt = await userOpResponse.wait();
            if (userOpReceipt.success == "true") {
                console.log("UserOp receipt", userOpReceipt);
                console.log("Transaction receipt", userOpReceipt.receipt);
            } debugger
            return userOpReceipt.receipt
        } catch (error) {
            debugger
        }

    }
    return { participateInBattle }
}

export default useChilizFanBattle