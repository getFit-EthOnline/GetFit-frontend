import { motion } from 'framer-motion'
import { useState } from 'react'

const tabs = ['Weight Lifting Bets', 'MMA Bets', 'Arm Wrestling Bets']

interface TabProps {
    text: string
    selected: boolean
    setSelected: (text: string) => void
}

const Tab = ({ text, selected, setSelected }: TabProps) => {
    return (
        <button
            onClick={() => setSelected(text)}
            className={`${selected
                ? 'text-[#FF5200]'
                : 'text-gray-500 hover:text-[#FF5200] dark:hover:text-[#FF5200]'
                } relative rounded-md px-2 py-2 text-sm font-medium transition-colors`}
        >
            <span className="relative z-10">{text}</span>
            {selected && (
                <motion.span
                    layoutId="tab"
                    transition={{ type: 'spring', duration: 0.4 }}
                    className="absolute inset-0 z-0 rounded-md bg-[#f2c7b4]"
                ></motion.span>
            )}
        </button>
    )
}

const BettingTableTabs = () => {
    const [selected, setSelected] = useState<string>(tabs[0])
    return (
        <div className=" flex flex-wrap items-center gap-2 bg-white p-4 rounded-md">
            {tabs.map((tab, index) => (
                <Tab
                    text={tab}
                    selected={selected === tab}
                    setSelected={setSelected}
                    key={tab}
                />
            ))}
        </div>
    )
}

export default BettingTableTabs