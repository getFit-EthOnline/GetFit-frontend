import { useRef, useState } from "react";
import { PEER_ADDRESS } from "./LiveChat";

function Chat({ client, messageHistory, conversation }) {
    const [inputValue, setInputValue] = useState("");
    const chatRef = useRef(null);
    // Function to handle sending a message
    const handleSend = async () => {
        if (inputValue) {
            await onSendMessage(inputValue);
            // if (chatRef.current) {
            //     (chatRef.current as HTMLDivElement).scrollTop = (chatRef.current as HTMLDivElement).scrollHeight;
            // }
            setInputValue("");
        }
    };


    // useEffect(() => {
    //     if (chatRef.current) {
    //         (chatRef.current as HTMLDivElement).scrollTop = (chatRef.current as HTMLDivElement).scrollHeight;
    //     }
    // }, []);


    // Function to handle sending a text message
    const onSendMessage = async (value) => {
        return conversation.send(value);
    };

    // MessageList component to render the list of messages
    const MessageList = ({ messages }) => {
        // Filter messages by unique id
        messages = messages.filter(
            (v, i, a) => a.findIndex((t) => t.id === v.id) === i,
        );

        return (
            <div className="flex-grow overflow-y-auto pr-2" ref={chatRef}>
                {messages.map((msg, index) => (
                    msg && (
                        <div
                            key={msg.id || index}
                            className={`p-2 mb-2 rounded-md ${msg.senderAddress === PEER_ADDRESS
                                ? 'bg-blue-400 italic'
                                : msg.senderAddress === client.address
                                    ? 'bg-red-400 font-bold'
                                    : msg.user === 'You'
                                        ? 'bg-green-600 text-right'
                                        : 'bg-gray-100'
                                }`}
                        >
                            <div className="flex flex-col">
                                <div>
                                    <span className="font-bold mr-2">{msg.senderAddress === client.address ? "You" : "Bot"}</span>
                                    <span className="ml-1">{msg.content}</span>
                                </div>
                                <span className="text-gray-500 text-xs mt-1">{msg.sent.toLocaleTimeString()}</span>
                            </div>
                        </div>
                    )
                ))}
            </div>
        );
    };

    const handleInputChange = (event) => {
        if (event.key === "Enter") {
            handleSend();
        } else {
            setInputValue(event.target.value);
        }
    };

    return (
        <>
            <MessageList messages={messageHistory} />
            <div className="bg-white sticky bottom-0">
                <div className="flex  py-4">
                    <input
                        type="text"
                        onChange={handleInputChange}
                        value={inputValue}
                        placeholder="Type your message here..."
                        className="flex-grow p-2 rounded bg-gray-100 text-gray-800 focus:outline-none"
                    />
                    <button
                        onClick={handleSend}
                        className="ml-2 p-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                    >
                        Send
                    </button>
                </div>
            </div>
        </>
    );
}

export default Chat;
