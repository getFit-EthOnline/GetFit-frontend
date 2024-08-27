'use client';
import { tssLib } from '@toruslabs/tss-dkls-lib';
import { chainConfig } from './useWeb3Auth';
import { EthereumSigningProvider } from '@web3auth/ethereum-mpc-provider';
import { Web3 } from 'web3';
import {
    COREKIT_STATUS,
    JWTLoginParams,
    makeEthereumSigner,
    parseToken,
    WEB3AUTH_NETWORK,
    Web3AuthMPCCoreKit,
} from '@web3auth/mpc-core-kit';
// Optional, only for social second factor recovery
// Firebase libraries for custom authentication
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    UserCredential,
} from 'firebase/auth';
import { useEffect } from 'react';

const web3AuthClientId =
    'BGtT2vjtKsZnkJ0WAQrCERsQ4jaShATsN5QWOIbXli2yGZGfUUq9Ry2hcgFx975H45guOeYF1PDCPjLrIJgLxGE'; // get from https://dashboard.web3auth.io
// IMP END - Dashboard Registration

// IMP START - Verifier Creation
const verifier = 'firebase-getfit';

let coreKitInstance: Web3AuthMPCCoreKit;
let evmProvider: EthereumSigningProvider;
if (typeof window !== 'undefined') {
    coreKitInstance = new Web3AuthMPCCoreKit({
        web3AuthClientId,
        web3AuthNetwork: WEB3AUTH_NETWORK.DEVNET,
        storage: window.localStorage,
        manualSync: true, // This is the recommended approach
        tssLib: tssLib,
    });

    // Setup provider for EVM Chain
    evmProvider = new EthereumSigningProvider({ config: { chainConfig } });
    evmProvider.setupProvider(makeEthereumSigner(coreKitInstance));
}
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: 'get-fit-21fa5.firebaseapp.com',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: 'get-fit-21fa5.appspot.com',
    messagingSenderId: '54036546217',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: 'G-JW8LWWTCMX',
};

// IMP END - Auth Provider Login

function useWeb3AuthCore() {
    // Firebase Initialisation
    const app = initializeApp(firebaseConfig);

    useEffect(() => {
        const init = async () => {
            // IMP START - SDK Initialization
            await coreKitInstance.init();
            // IMP END - SDK Initialization
        };
        init();
    }, []);

    // IMP START - Auth Provider Login
    const signInWithGoogle = async (): Promise<UserCredential> => {
        try {
            const auth = getAuth(app);
            const googleProvider = new GoogleAuthProvider();
            const res = await signInWithPopup(auth, googleProvider);
            console.log(res);
            return res;
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    const loginCore = async () => {
        try {
            if (!coreKitInstance) {
                throw new Error('initiated to login');
            }
            // IMP START - Auth Provider Login
            const loginRes = await signInWithGoogle();
            const idToken = await loginRes.user.getIdToken(true);
            const parsedToken = parseToken(idToken);
            // IMP END - Auth Provider Login

            // IMP START - Login
            const idTokenLoginParams = {
                verifier,
                verifierId: parsedToken.sub,
                idToken,
            } as JWTLoginParams;

            await coreKitInstance.loginWithJWT(idTokenLoginParams);
            if (coreKitInstance.status === COREKIT_STATUS.LOGGED_IN) {
                await coreKitInstance.commitChanges(); // Needed for new accounts
            }
            // IMP END - Login

            // IMP START - Recover MFA Enabled Account
            if (coreKitInstance.status === COREKIT_STATUS.REQUIRED_SHARE) {
                console.log(
                    'required more shares, please enter your backup/ device factor key, or reset account [unrecoverable once reset, please use it with caution]'
                );
            }
            // IMP END - Recover MFA Enabled Account
        } catch (err) {
            console.log(err);
        }
    };
    const getAccountsCore = async () => {
        if (!coreKitInstance) {
            return;
        }
        const web3 = new Web3(evmProvider);
        // Get user's Ethereum public address
        const address = await web3.eth.getAccounts();
        console.log(address);
    };

    return { loginCore, getAccountsCore };
}

export default useWeb3AuthCore;
