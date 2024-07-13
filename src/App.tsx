import { useEffect, useState } from "react";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import { ADAPTER_STATUS, IProvider } from "@web3auth/base";
import "./App.css";
import RPC from "./web3RPC"; // for using web3.js
import { useWalletServicesPlugin } from "@web3auth/wallet-services-plugin-react-hooks";
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CasinoIcon from '@mui/icons-material/Casino';
import JoinGame from "./components/JoinGame";
import PlayerCard from "./components/PlayerCard";
import RecentMoves from "./components/RecentMoves";

function App() {

  const [firstPlayerCanJoin, setFirstPlayerCanJoin] = useState(false)
  const [secondPlayerCanJoin, setSecondPlayerCanJoin] = useState(false)

  const {
    initModal,
    provider,
    web3Auth,
    connect,
    logout,
    userInfo,
    status,
  } = useWeb3Auth();

  useEffect(() => {
    const init = async () => {
      try {
        if (web3Auth) {
          await initModal();
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, [initModal, web3Auth]);

  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider as IProvider);
    const address = await rpc.getAccounts();
    console.log(address);
  };

  const getBalance = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider as IProvider);
    const balance = await rpc.getBalance();
    console.log(balance);
  };

  const sendTransaction = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    console.log("Function Triggered")
    const rpc = new RPC(provider as IProvider);
    const receipt = await rpc.sendTransaction();
    console.log(receipt);
  };

  const readContract = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider as IProvider);
    const message = await rpc.readContract();
    console.log(message);
  };

  const writeContract = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider as IProvider);
    const receipt = await rpc.writeContract();
    console.log(receipt);
    if (receipt) {
      setTimeout(async () => {
        await readContract();
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {status === ADAPTER_STATUS.CONNECTED ? (
        <div className="flex flex-col h-screen">
          <div className="w-full h-1/2 border-2 border-gray-300 rounded-lg p-4">
            <div className="h-1/2">
              <div>
              </div>
            </div>
            <div className="h-1/2 flex flex-row mx-3 justify-between">
              <div className="w-1/6 h-15 border-2 border-black rounded-md">First stone, Index 0</div>
              <div className="w-1/6 h-15 border-2 border-black rounded-md">Second stone, Index 1</div>
              <div className="w-1/6 h-15 border-2 border-black rounded-md">Third stone, Index 2</div>
              <div className="w-1/6 h-15 border-2 border-black rounded-md">Fourth stone, Index 3</div>
              <div className="w-1/6 h-15 border-2 border-black rounded-md">Fifth stone, Index 4</div>
            </div>
          </div>
          <div className="w-full h-1/2 border-2 border-gray-300 rounded-lg p-3 flex justify-between">
            <div className="w-1/4">
              {firstPlayerCanJoin ? <JoinGame></JoinGame> : <PlayerCard></PlayerCard>}
            </div>

            <div className="w-2/4 border-4 rounded-lg">
              <RecentMoves />
              {/* <button onClick={readContract}>Send ETH</button> */}
            </div>

            <div className="w-1/4">
              {secondPlayerCanJoin ? <JoinGame></JoinGame> : <PlayerCard></PlayerCard>}
            </div>
          </div>
        </div>) : (<button onClick={connect}>login</button>)}
    </div>
  );
}

export default App;
