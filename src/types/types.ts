import { IProvider } from '@web3auth/base';

export interface Message {
    role: string;
    content: string;
}
export interface startFitnessRunProps {
    message: string;
    provider: IProvider | null;
}

export interface addMessageProps {
    message: string;
    agentRunID: Number;
    provider: IProvider | any;
}
