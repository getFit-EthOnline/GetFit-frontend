import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
} from '@headlessui/react';

import clsx from 'clsx';
import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa6';
import { useSwitchChain } from 'wagmi';
import { Chiliz, Galadriel, Morph } from '../../../public';
import Image from 'next/image';
import { morphHolesky, spicy } from 'wagmi/chains';
import useGlobalStore from '@/store';
import { getBalance } from '@/contracts/galadriel';
import toast from 'react-hot-toast';
import { toastStyles } from '@/utils/utils';
import { sendTestTokensChiliz } from '@/contracts/chiliz';
export default function ComboboxComponent() {
    const { chains, switchChain } = useSwitchChain();
    const [selected, setSelected] = useState<any>(chains[0]);
    const { address, setBalance } = useGlobalStore();
    const handleSwitchChain = async (chainId: any) => {
        switchChain({ chainId: chainId });
        if (chainId === spicy.id) {
            const balance = await getBalance(address, chainId);
            setBalance(balance);
            if (parseFloat(balance) < 1) {
                toast.loading('Sending test tokens 💸', toastStyles);
                const tokens = await sendTestTokensChiliz(address);
                if (tokens.trxhash) {
                    const balance = await getBalance(address, chainId);
                    setBalance(balance);
                    toast.dismiss();
                    toast.success('Tokens sent successfully 🚀', toastStyles);
                }
            }
        }
    };
    return (
        <div className="w-72">
            <Combobox value={selected} onChange={(value) => setSelected(value)}>
                <div className="relative">
                    <ComboboxInput
                        className={clsx(
                            'w-full rounded-lg border-none bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 text-white',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                        )}
                        disabled
                        displayValue={(chain: any) => {
                            return chain?.name + ' ' + `(${chain?.id})`;
                        }}
                    />{' '}
                    <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                        <Image
                            src={
                                selected.id === spicy.id
                                    ? Chiliz
                                    : selected.id === morphHolesky.id
                                    ? Morph
                                    : Galadriel
                            }
                            alt="icons"
                            className="size-5 rounded-full absolute right-8 bottom-2"
                        />
                        <FaAngleDown color="white" />
                    </ComboboxButton>
                </div>

                <ComboboxOptions
                    anchor="bottom"
                    transition
                    className={clsx(
                        'w-[var(--input-width)] rounded-xl border border-white/5 bg-[#313131] z-50 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
                        'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                    )}
                >
                    {chains.map((chain) => {
                        return (
                            <ComboboxOption
                                key={chain.id}
                                value={chain}
                                onClick={() => handleSwitchChain(chain.id)}
                                className="group flex cursor-default items-center gap-2 rounded-lg py-2 px-3 select-none data-[focus]:bg-white/10"
                            >
                                <Image
                                    src={
                                        chain.id === spicy.id
                                            ? Chiliz
                                            : chain.id === morphHolesky.id
                                            ? Morph
                                            : Galadriel
                                    }
                                    alt="icons"
                                    className="size-5 rounded-full"
                                />
                                <div className="text-sm/6 text-white">
                                    {chain.name} ({chain.id})
                                </div>
                            </ComboboxOption>
                        );
                    })}
                </ComboboxOptions>
            </Combobox>
        </div>
    );
}
