import { isValidAddress, useCanMessage } from "@xmtp/react-sdk";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";

const CanMessage: React.FC = () => {
    const [peerAddress, setPeerAddress] = useState("");
    const [isOnNetwork, setIsOnNetwork] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { canMessage } = useCanMessage();

    const handleAddressChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPeerAddress(e.target.value);
    }, []);

    const handleCheckAddress = useCallback(async (e: FormEvent) => {
        e.preventDefault();
        if (isValidAddress(peerAddress)) {
            setIsLoading(true);
            setIsOnNetwork(await canMessage(peerAddress));
            setIsLoading(false);
        } else {
            setIsOnNetwork(false);
        }
    }, [canMessage, peerAddress]);

    return (
        <form onSubmit={handleCheckAddress}>
            <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6 w-full rounded-lg shadow-lg">
                <input
                    name="addressInput"
                    type="text"
                    className="w-[200px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter Ethereum address"
                    value={peerAddress}
                    onChange={handleAddressChange}
                    disabled={isLoading}
                />
            </div>
        </form>
    );
};
export default CanMessage;