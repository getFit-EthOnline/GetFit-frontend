// "use client";
// import Web3 from "web3";
// import {
//   getNewMessages,
//   startFitnessRun,
//   addMessage,
// } from "../contracts/galadriel";
// import useWeb3Auth from "../hooks/useWeb3Auth";

// export default function Home() {
//   // const { login, loggedIn, logout, getUserInfo, getAccounts, provider } =
//   //   useWeb3Auth();
//   // const loggedInView = (
//   //   <>
//   //     <button onClick={logout}>Log Out</button>{" "}
//   //     <button onClick={getUserInfo} className="card">
//   //       Get User Info
//   //     </button>
//   //     <button onClick={getAccounts} className="card">
//   //       Get Accounts
//   //     </button>
//   //   </>
//   // );
//   // const unloggedInView = (
//   //   <button onClick={login} className="card">
//   //     Login
//   //   </button>
//   // );

//   const handleDelay = (id: number) => {
//     setTimeout(async () => {
//       const data = await getNewMessages(id, 0);
//       console.log(data);
//     }, 15000);
//   };
//   return (
//     <>
//       <div className="grid">{loggedIn ? loggedInView : unloggedInView}</div>
//       <div id="console" style={{ whiteSpace: "pre-line" }}>
//         <p style={{ whiteSpace: "pre-line" }}></p>
//       </div>
//       <div
//         onClick={async () => {
//           //   const res = await startFitnessRun({
//           //     message:
//           //       "Age 43, Sex M, fitness goal muscle gain, diet vegan. Create the weekly workout schedule",
//           //     provider,
//           //   });
//           //   const res = await addMessage({
//           //     message: "Send the diet schedule for the above workout",
//           //     agentRunID: 1,
//           //     provider,
//           //   });
//           //   if (res.runId) {
//           handleDelay(1);
//           //   }
//         }}
//       >
//         start fitness
//       </div>
//     </>
//   );
// }


const page = () => {
  return (
    <div>page</div>
  )
}

export default page