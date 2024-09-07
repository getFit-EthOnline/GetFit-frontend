import { Bundler } from '@biconomy/account';
import { morphHolesky, spicy, sepolia, base } from 'viem/chains';

const BUNDLER_ENTRYPOINT_ADDRESS = '0x00000061FEfce24A79343c27127435286BB7A4E1';

export const chilizBundler = new Bundler({
    bundlerUrl: `https://bundler.biconomy.io/api/v2/${spicy.id}/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44`,
    chainId: spicy.id,
    entryPointAddress: BUNDLER_ENTRYPOINT_ADDRESS,
});

export const morphHoleskyBundler = new Bundler({
    bundlerUrl: `https://bundler.biconomy.io/api/v2/${morphHolesky.id}/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44`,
    chainId: morphHolesky.id,
});
export const sepoliaBundler = new Bundler({
    bundlerUrl: `https://bundler.biconomy.io/api/v2/${sepolia.id}/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44`,
    chainId: sepolia.id,
});
export const baseBundler = new Bundler({
    bundlerUrl: `https://bundler.biconomy.io/api/v2/${base.id}/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44`,
    chainId: base.id,
});

const BICONOMY_CONFIG = {
    [morphHolesky.id]: {
        bundler: morphHoleskyBundler,
        paymasterUrl:
            'https://paymaster.biconomy.io/api/v1/2810/DS-wEbVvs.54923a20-d8fe-47e7-9cff-94133e4a9716',
        paymasterApiKey: 'DS-wEbVvs.54923a20-d8fe-47e7-9cff-94133e4a9716',
    },
    [spicy.id]: {
        bundler: chilizBundler,
        paymasterUrl:
            'https://paymaster.biconomy.io/api/v1/88882/Pif4RJCbe.a229636b-777b-484e-8b48-ec39049a6cad',
        paymasterApiKey: 'Pif4RJCbe.a229636b-777b-484e-8b48-ec39049a6cad',
    },
    [sepolia.id]: {
        bundler: sepoliaBundler,
        paymasterUrl:
            'https://paymaster.biconomy.io/api/v1/11155111/WugWhiuuo.c712de20-661a-4f9f-9ac1-9e37826eb0bb',
        paymasterApiKey: 'WugWhiuuo.c712de20-661a-4f9f-9ac1-9e37826eb0bb',
    },
    [base.id]: {
        bundler: sepoliaBundler,
        paymasterUrl:
            'https://paymaster.biconomy.io/api/v1/84532/chmQxV0UK.535ba9a7-bd76-438c-ae3b-f21bfb14ed0b',
        paymasterApiKey: 'chmQxV0UK.535ba9a7-bd76-438c-ae3b-f21bfb14ed0b',
    },
};

export default BICONOMY_CONFIG;
