import { useEffect, useState } from "react";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import { CHAIN_NAMESPACES, PLUGIN_STATUS, IProvider } from "@web3auth/base";
import "./App.css";
import RPC from "./web3RPC"; // for using web3.js
// import RPC from "./ethersRPC"; // for using ethers.js
import { useWalletServicesPlugin  } from "@web3auth/wallet-services-plugin-react-hooks";
import { createPublicClient, http, createWalletClient, custom } from 'viem'
import { arbitrumSepolia } from 'viem/chains'
import Button from '@mui/material/Button';
import LinearWithValueLabel from "./Healthbar";

function App() {

  const {
    initModal,
    provider,
    web3Auth,
    connect,
    authenticateUser,
    logout,
    userInfo,
    isMFAEnabled,
    enableMFA,
    status,
  } = useWeb3Auth();

  const { showCheckout, showWalletConnectScanner, showWalletUI, plugin, isPluginConnected } = useWalletServicesPlugin();
  const [unloggedInView, setUnloggedInView] = useState<JSX.Element | null>(null);
  const [MFAHeader, setMFAHeader] = useState<JSX.Element | null>(
    <div>
      <h2>MFA is disabled</h2>
    </div>
  );

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
        <div className="w-full h-1/2 border-2 border-gray-300 rounded-lg p-4"> 
          <div className="h-1/2">
            <div>
            </div>
          </div>
          <div className="h-1/2 flex flex-row mx-3 justify-between">
            <div className="w-1/6 h-15 border-2 border-black rounded-md">First stone</div>
            <div className="w-1/6 h-15 border-2 border-black rounded-md">Second stone</div>
            <div className="w-1/6 h-15 border-2 border-black rounded-md">Third stone</div>
            <div className="w-1/6 h-15 border-2 border-black rounded-md">Fourth stone</div>
            <div className="w-1/6 h-15 border-2 border-black rounded-md">Fifth stone</div>
          </div>
        </div>
        <div className="w-full h-1/2 border-2 border-gray-300 rounded-lg p-3 flex justify-between"> 
          <div className="w-1/3 border-4 rounded-lg">
            <div className="h-1/2">
            First Player
              <div>
                <LinearWithValueLabel fixedValue={50} />
              </div>
            </div>
            <div className="flex h-1/2 border-2 rounded-lg">
              <div className="w-1/3 border-2 rounded-lg">left direction</div>
              <div className="w-1/3">submit button, dice picture</div>
              <div className="w-1/3 border-2 rounded-lg">right direction</div>
            </div>
          </div>

          <div className="w-1/3 border-4 rounded-lg">
            <button onClick={sendTransaction}>Send ETH</button>
          </div>

          <div className="w-1/3 border-4 rounded-lg">
            <div className="h-1/2">
            Second Player
              <div>
                <LinearWithValueLabel fixedValue={50} />
              </div>
            </div>
            <div className="flex h-1/2 border-2 rounded-lg">
              <div className="w-1/3 border-2 rounded-lg">left direction</div>
              <div className="w-1/3">submit button, dice picture</div>
              <div className="w-1/3 border-2 rounded-lg">right direction</div>
            </div>
          </div>        
        </div>
      </div>
  );
}

export default App;
