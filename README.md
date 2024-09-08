# 🏋️‍♂️ getFit 🏃‍♀️

The getFit platform is an innovative on-chain fitness app that motivates users to stay active while earning rewards! From Move-to-Earn to fan token battles, prediction markets, and exclusive memberships, getFit offers a holistic fitness journey powered by Web3 technologies. Our platform seamlessly integrates Web3Auth, Galadriel, Chiliz, Morph, XMTP, Biconomy, Chainlink, and Kinto to bring the best of fitness and blockchain to your fingertips. 💪✨

## 🔥 Key Features

### 🏃‍♂️ M2E (Move-to-Earn)
Move-to-Earn (M2E) rewards users with tokens for achieving their fitness goals. Whether it’s completing daily workouts, maintaining streaks, or winning weekly challenges, you can earn tokens for your dedication to fitness! Users log their activity, hit their goals, and get rewarded with fan tokens to show off their progress! 🎉

### 🎟️ Sport Membership
Unlock premium content and classes with on-chain sport memberships! These exclusive memberships offer access to fitness programs, workout classes, and coaching sessions. Membership payments are automated with recurrent transactions 💸💼

### 🎯 Prediction Markets & Sportsbook
Get in on the action! Users can predict the outcomes of various fitness competitions, like arm wrestling, mma and weightlifting challenges. Using XMTP chatbots, spot betting becomes even more interactive, allowing for live conversations and wagers with other fitness enthusiasts. Place your bets and see if your predictions come true! 🤖💬

### 🤝 P2P Fan Token Battles
Compete head-to-head with other users in fitness challenges for fan tokens! Whether it’s fitness duels or friendly competitions, these battles encourage engagement and allow fans to support their favorite fitness influencers. Use your earned tokens to challenge other participants and grow your fan base! 🏆🔥

---

## 🌶 Chiliz Integration
Chiliz powers the fan tokens that fuel the competitive spirit on the getFit platform. Fan tokens are used in everything from P2P battles to exclusive content and rewards. Collect, trade, and use these tokens to unlock unique benefits and engage in the fitness ecosystem! 🎫💪

- **Chiliz Fan Token Contract**: [Chiliz Fan Token](https://testnet.chiliscan.com/token/0x56EF69e24c3bCa5135C18574b403273F1eB2Bd74)
    - This contract is used to create and manage fan tokens for the platform, allowing users to engage in fan token battles and unlock exclusive content.
    
- **Chiliz Move-to-Earn Contract**: [Chiliz M2E Contract](https://testnet.chiliscan.com/address/0x8b6cE7068F22276F00d05eb73F2D4dDD21DEDbEf)
    - This contract handles the reward system for users who achieve their fitness goals through the Move-to-Earn feature.

- **Chiliz P2P-Betting Contract**: [Chiliz P2P Betting Contract](https://testnet.chiliscan.com/address/0x9d24c52916A14afc31D86B5Aa046b252383ee444/contract/88882/code)
    - This contract powers peer-to-peer betting on fitness challenges, where users can place bets on each other’s performance in real-time.

- **Chiliz Frontend Integration**: 
    - [Code Reference](https://github.com/getFit-EthOnline/GetFit-frontend/blob/40cd02553a049c8f7504b6284325d20a567436fa/src/contracts/chiliz/index.tsx#L13)
    - [Code Reference](https://github.com/getFit-EthOnline/GetFit-frontend/blob/40cd02553a049c8f7504b6284325d20a567436fa/src/contracts/chiliz/index.tsx#L50)
    - [Code Reference](https://github.com/getFit-EthOnline/GetFit-frontend/blob/99458f312490dd75bb6acef74213a5bae99bd0d6/src/contracts/chiliz/index.tsx#L113)
---

## 🔰 Morph Integration
Morph blockchain integration allows for gasless transactions within the M2E system. Users can record their daily workouts without worrying about transaction fees, making it a seamless and user-friendly experience. 🏃‍♀️🔗

- **Morph Reward Token Contract**: [Morph Reward Token](https://explorer-holesky.morphl2.io/address/0x94c17DD37ED3Ca85764b35BfD4d1CCc543b1bE3E)
    - This contract issues reward tokens to users for completing daily workouts and fitness challenges.

- **Morph Move-to-Earn Contract**: [Morph M2E Contract](https://explorer-holesky.morphl2.io/address/0xf7409b94F7285d27Ab1A456638A1110A4E55bFEC)
    - This contract handles the Move-to-Earn system on the Morph blockchain, allowing users to earn rewards for staying active.

- **Morph P2P-Betting Contract**: [Morph P2P Betting Contract](https://explorer-holesky.morphl2.io/address/0xfD80F72afAeFB921DB1CccE92e02Bd485ca48764)
    - this contracts enables peer-to-peer betting on the Morph blockchain, allowing users to bet on fitness competitions.

- **Morph Frontend Integration**: [Code Reference](https://github.com/getFit-EthOnline/GetFit-frontend/blob/40cd02553a049c8f7504b6284325d20a567436fa/src/contracts/morph/index.tsx#L9)

---

## 🔗 Chainlink Integration

### 🤖 Membership Automation (Sepolia, Base)
getFit utilizes **Chainlink Functions**, **Chainlink Automation**, and **Chainlink CCIP** to automate subscription payments and cross-chain memberships. Users can set up their memberships and never have to worry about renewals—it’s all done automatically using the latest in blockchain automation! ⚙️💳

**Chainlink CCIP** ensures seamless cross-chain communication between blockchains for subscription handling, allowing users to subscribe to services from different chains while keeping everything in sync. 🌍🔄

- **Chainlink Membership Automation Contract (Sepolia)**: [Sepolia Contract](https://sepolia.etherscan.io/address/0x36A0C6ad26868FFA23D512AD8E0ee9E090122161)
    - This contract manages the membership subscriptions on the Sepolia network, ensuring seamless automation of payments.

- **Chainlink Membership Automation Contract (Base)**: [Base Contract](https://sepolia.basescan.org/address/0x7899070557CF9758b8be4E0BE9dfF5a200D5ef6d)
    - The same functionality as the Sepolia contract, but deployed on the Base network for cross-chain support.

- **Chainlink Frontend Integration**:
- [Code Reference](https://github.com/getFit-EthOnline/GetFit-frontend/blob/40cd02553a049c8f7504b6284325d20a567436fa/src/contracts/chainlink/index.tsx#L11)
- [Code Reference](https://github.com/getFit-EthOnline/GetFit-frontend/blob/99458f312490dd75bb6acef74213a5bae99bd0d6/src/components/ui/membership/subscribeModal.tsx#L104)

---

## 🔒 Web3Auth Integration
Seamlessly secure your account with **Web3Auth**. We offer:


1. **Custom Login Verifiers** that allow multiple identity providers like Google, Facebook, and GitHub for flexibility.
    - [Code Reference](https://github.com/getFit-EthOnline/GetFit-frontend/blob/40cd02553a049c8f7504b6284325d20a567436fa/src/hooks/useWeb3Auth.tsx#L38)
2. **Multichain Support**, including **switch-chain** functionality for seamless cross-chain interaction.
    - [Code Reference](https://github.com/getFit-EthOnline/GetFit-frontend/blob/40cd02553a049c8f7504b6284325d20a567436fa/src/components/ui/Combobox.tsx#L101)
3. **Smart Accounts** integrated with **Biconomy** for gasless transactions and enhanced UI/UX.
    - [Code Reference](https://github.com/getFit-EthOnline/GetFit-frontend/blob/5454af55288b8fb14adefa168a443dcc91747778/src/web3auth/useWeb3AuthWrapper.tsx#L25)
4. **Custom React Hooks** for handling authentication flow effortlessly within the React ecosystem.
    - [Code Reference](https://github.com/getFit-EthOnline/GetFit-frontend/blob/99458f312490dd75bb6acef74213a5bae99bd0d6/src/components/ui/navBar.tsx#L62)
    - [Code Reference](https://github.com/getFit-EthOnline/GetFit-frontend/blob/d10b84dd3189e786a153b69061276106aa57a76d/src/app/page.tsx#L20)]
5. **Wallet UI** to let users manage their wallets securely and with ease.
    - [Code Reference](https://github.com/getFit-EthOnline/GetFit-frontend/blob/d10b84dd3189e786a153b69061276106aa57a76d/src/app/hooks/web3AuthProviderProps.ts#L85)
6. **Fiat On-Ramp** solutions to allow users to buy tokens directly with credit/debit cards.
    - [Code Reference](https://github.com/getFit-EthOnline/GetFit-frontend/blob/d10b84dd3189e786a153b69061276106aa57a76d/src/app/hooks/web3AuthProviderProps.ts#L85)
8. **MPC Core-Kit** for event sponsors and organizers to manage their transactions seamlessly.
    - [Code Reference](https://github.com/getFit-EthOnline/GetFit-frontend/blob/d10b84dd3189e786a153b69061276106aa57a76d/src/app/hooks/useWeb3AuthCore.tsx#L59)

---

## 🤖 Galadriel AI Integration
Galadriel elevates the user experience by offering:

1. **Fitness Companion**: A personalized AI agent that gives tips, tracks progress, and challenges users based on their individual fitness goals.
    - [Code Reference](https://github.com/getFit-EthOnline/GetFit-frontend/blob/40cd02553a049c8f7504b6284325d20a567436fa/src/contracts/galadriel/index.tsx#L14)
2. **Prediction Agent**: Analyze fitness trends and predict outcomes of various competitions, making workouts even more engaging.
    - [Code Reference](https://github.com/getFit-EthOnline/GetFit-frontend/blob/40cd02553a049c8f7504b6284325d20a567436fa/src/contracts/galadriel/index.tsx#L68)
3. **Profile Creation**: Custom AI-generated fitness profiles for users that evolve over time based on performance.
    - [Code Reference](https://github.com/getFit-EthOnline/GetFit-frontend/blob/40cd02553a049c8f7504b6284325d20a567436fa/src/app/(routes)/profile/page.tsx#L68)
4. **Fan Battle AI Agents**: Engage in fan battles between AI agents who motivate and challenge each other in fitness duels.
    - [Code Reference](https://github.com/getFit-EthOnline/GetFit-frontend/blob/99458f312490dd75bb6acef74213a5bae99bd0d6/src/contracts/chiliz/index.tsx#L50)
5. **Sending Test Tokens**: For sending test tokens [Code Reference](https://github.com/getFit-EthOnline/GetFit-frontend/blob/4a092f5d770b6e34064ffe88cf4ec4f305d8d615/src/contracts/galadriel/index.tsx#L138)

---

## 💬 XMTP Integration
getFit utilizes **XMTP** for seamless messaging and betting:

1. **XMTP Client** for fitness conversations and updates within the app.
    - [Implementation Link](#)
2. **Message-Kit Bot AI** that enables spot betting and transaction framing for real-time wagers.
    - [Implementation Link](#)
3. **Smart Accounts with Bundling and Gasless Transactions**, ensuring smooth and cost-effective P2P interactions.
    - [Implementation Link](#)
4. **XMTP Subscribe and Broadcast** feature to notify users of new membership purchases and subscription details.
    - [Code Reference](https://github.com/getFit-EthOnline/GetFit-frontend/blob/40cd02553a049c8f7504b6284325d20a567436fa/src/hooks/useSubscribe.tsx#L10)

---

## 🤝 Contributing
We welcome contributions! Whether you’re an enthusiast, developer, or fitness junkie, join us in building the future of fitness on the blockchain. Submit issues or pull requests, and help us improve the getFit experience.

## 📜 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

💥 Get ready to elevate your fitness game with getFit! 🏋️‍♀️🔥
