import { IProvider } from '@web3auth/base';

export interface Message {
    role: string;
    content: string;
}
export interface startFitnessRunProps {
    message: string;
    imageUrls: string[];
    provider: IProvider | null;
}
