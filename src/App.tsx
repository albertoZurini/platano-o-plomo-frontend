import { useEffect, useState } from "react";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import { CHAIN_NAMESPACES, PLUGIN_STATUS, IProvider } from "@web3auth/base";
import "./App.css";
import RPC from "./web3RPC"; // for using web3.js
// import RPC from "./viemRPC"; // for using viem
// import RPC from "./ethersRPC"; // for using ethers.js
import { useWalletServicesPlugin } from "@web3auth/wallet-services-plugin-react-hooks";
import GameBoard from "./components/GameBoard";
import Footer from "./components/Footer";
import Header from "./components/Header";
import UserActions from "./components/UserActions";
import GameHistory from "./components/GameHistory";
import UserAction from "./components/UserActions";
import { Direction, GunType, Player } from "./interfaces/player.interface";
import monkeyGreenImage from './assets/images/monkey-green.png';  // Ensure to use the correct path
import monkeyBrownImage from './assets/images/monkey-brown.png'; // Ensure to use the correct path

const newChain = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x89", // hex of 137, polygon mainnet
  rpcTarget: "https://rpc.ankr.com/polygon",
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: "Polygon Mainnet",
  blockExplorerUrl: "https://polygonscan.com",
  ticker: "MATIC",
  tickerName: "MATIC",
  logo: "https://images.toruswallet.io/polygon.svg",
};

function App() {
  const {
    initModal,
    provider,
    web3Auth,
    isConnected,
    connect,
    authenticateUser,
    logout,
    addChain,
    switchChain,
    userInfo,
    isMFAEnabled,
    enableMFA,
    status,
    addAndSwitchChain,
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

  const getChainId = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider as IProvider);
    const chainId = await rpc.getChainId();
    uiConsole(chainId);
  };

  const getAccounts = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider as IProvider);
    const address = await rpc.getAccounts();
    uiConsole(address);
  };

  const getBalance = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider as IProvider);
    const balance = await rpc.getBalance();
    uiConsole(balance);
  };

  const sendTransaction = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider as IProvider);
    const receipt = await rpc.sendTransaction();
    uiConsole(receipt);
  };

  const signMessage = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider as IProvider);
    const signedMessage = await rpc.signMessage();
    uiConsole(signedMessage);
  };

  const readContract = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider as IProvider);
    const message = await rpc.readContract();
    uiConsole(message);
  };

  const writeContract = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider as IProvider);
    const receipt = await rpc.writeContract();
    uiConsole(receipt);
    if (receipt) {
      setTimeout(async () => {
        await readContract();
      }, 2000);
    }
  };

  const getPrivateKey = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider as IProvider);
    const privateKey = await rpc.getPrivateKey();
    uiConsole(privateKey);
  };

  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
    }
  }

  const loggedInView = (
    <>
      <div className="flex-container">
        <div>
          <button
            onClick={() => {
              uiConsole(userInfo);
            }}
            className="card"
          >
            Get User Info
          </button>
        </div>
        <div>
          <button
            onClick={async () => {
              const { idToken } = await authenticateUser();
              uiConsole(idToken);
            }}
            className="card"
          >
            Get ID Token
          </button>
        </div>
        <div>
          <button
            disabled={isMFAEnabled}
            onClick={() => {
              enableMFA();
            }}
            className="card"
          >
            Enable MFA
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              if (isPluginConnected) {
                showWalletUI();
              }
            }}
            className="card"
          >
            Show Wallet UI
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              if (isPluginConnected) {
                showWalletConnectScanner();
              }
            }}
            className="card"
          >
            Show Wallet Connect
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              if (isPluginConnected) {
                showCheckout();
              }
            }}
            className="card"
          >
            Show Checkout
          </button>
        </div>
        <div>
          <button onClick={getChainId} className="card">
            Get Chain ID
          </button>
        </div>
        <div>
          <button
            onClick={async () => {
              try {
                await addAndSwitchChain(newChain);
                uiConsole("New Chain Added and Switched");
              } catch (error) {
                uiConsole(error);
              }
            }}
            className="card"
          >
            Add and Switch Chain
          </button>
        </div>
        <div>
          <button
            onClick={async () => {
              try {
                await addChain(newChain);
                uiConsole("New Chain Added");
              } catch (error) {
                uiConsole(error);
              }
            }}
            className="card"
          >
            Add Chain
          </button>
        </div>
        <div>
          <button
            onClick={async () => {
              try {
                await switchChain({ chainId: newChain.chainId });
                uiConsole("Switched to new Chain");
              } catch (error) {
                uiConsole(error);
              }
            }}
            className="card"
          >
            Switch Chain
          </button>
        </div>
        <div>
          <button onClick={getAccounts} className="card">
            Get Accounts
          </button>
        </div>
        <div>
          <button onClick={getBalance} className="card">
            Get Balance
          </button>
        </div>
        <div>
          <button onClick={signMessage} className="card">
            Sign Message
          </button>
        </div>
        <div>
          <button onClick={sendTransaction} className="card">
            Send Transaction
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              const message = readContract();
              uiConsole(message);
            }}
            className="card"
          >
            Read Contract
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              const message = writeContract();
              uiConsole(message);
            }}
            className="card"
          >
            Write Contract
          </button>
        </div>
        <div>
          <button onClick={getPrivateKey} className="card">
            Get Private Key
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              logout();
            }}
            className="card"
          >
            Log Out
          </button>
        </div>
      </div>
      <div id="console" style={{ whiteSpace: "pre-line" }}>
        <p style={{ whiteSpace: "pre-line" }}></p>
      </div>
    </>
  );

  useEffect(() => {
    setUnloggedInView(
      <div>
        <h2>Web3Auth hook status: {status}</h2>
        <h2>Web3Auth status: {web3Auth?.status}</h2>
        <button onClick={connect} className="card">
          Login
        </button>
      </div>
    );
  }, [connect, status, web3Auth]);

  useEffect(() => {
    if (isMFAEnabled) {
      setMFAHeader(
        <div>
          <h2>MFA is enabled</h2>
        </div>
      );
    }
  }, [isMFAEnabled]);
  const [playerOneHealth, setPlayerOneHealth] = useState(100);
  const [playerTwoHealth, setPlayerTwoHealth] = useState(100);
  const [history, setHistory] = useState<string[]>([]);
  const [playerOne, setPlayerOne] = useState({
    position: 0,
    health: 100,
    direction: Direction.RIGHT,
    gun: {
      type: GunType.BIG,
      isInHand: true,
      isMoving: false,
      delta: 0,
      showRain: false
    },
    isShooting: false,
    image: monkeyGreenImage
  }); // Initial position for player one
  const [playerTwo, setPlayerTwo] = useState({
    position: 4,
    health: 100,
    direction: Direction.LEFT,
    gun: {
      type: GunType.NONE,
      delta: 0,
      isInHand: true,
      isMoving: false,
      showRain: false
    },
    isShooting: false,
    image: monkeyBrownImage
  }); // Initial position for player one\

  function shoot(setPlayer: any) {
    // stop player from jumping and put the gun in hte hand
    console.log("Stop the player")
    setPlayer((prev: Player) => {
      return {
        ...prev,
        gun: {
          ...prev.gun,
          isInHand: true
        },
        isShooting: true
      };
    });
    // after some time put the gun in front
    setTimeout(() => {
      console.log("move the gun in first place")
      setPlayer((prev: Player) => {
        return {
          ...prev,
          gun: {
            ...prev.gun,
            isInHand: false
          },
          isShooting: true
        };
      });
    }, 2000);
    // after some time make the gun move
    setTimeout(() => {
      console.log("make the gun move")
      setPlayer((prev: Player) => {
        return {
          ...prev,
          gun: {
            ...prev.gun,
            isInHand: false,
            isMoving: true
          },
          isShooting: true
        };
      });
    }, 4000);
    // set the rain
    setTimeout(() => {
      console.log("rain")
      setPlayer((prev: Player) => {
        return {
          ...prev,
          gun: {
            ...prev.gun,
            isInHand: false,
            isMoving: true,
            showRain: true
          },
          isShooting: true
        };
      });
    }, 6000);

    // After a while hide everything
    setTimeout(() => {
      console.log("rain")
      setPlayer((prev: Player) => {
        return {
          ...prev,
          gun: {
            ...prev.gun,
            isInHand: false,
            isMoving: false,
            showRain: false
          },
          isShooting: false
        };
      });
    }, 8000);

  }

  useEffect(() => {
    setTimeout(() => {
      // First: set the type of gun
      setPlayerTwo((prev) => {
        return {
          ...prev,
          gun: {
            ...prev.gun,
            type: GunType.SMALL
          }
        }
      })
      // Second: calculate the delta
      let delta = Math.abs(playerOne.position - playerTwo.position); // TODO: get this from backend
      setPlayerOne((prev) => {
        return {
          ...prev,
          gun: {
            ...prev.gun,
            delta: delta
          }
        }
      })
      setPlayerTwo((prev) => {
        return {
          ...prev,
          gun: {
            ...prev.gun,
            delta: delta
          }
        }
      })
      // Third: render the animation
      shoot(setPlayerOne);
      shoot(setPlayerTwo);
    }, 2000);
  }, [])


  const handleDirection = (player: number, direction: 'left' | 'right') => {
    const newEntry = `Player ${player} moves ${direction}`;
    setHistory([...history, newEntry]);
    console.log(newEntry);
    // Implement API call or logic for handling direction
  };

  const handleSubmit = (player: number) => {
    const newEntry = `Player ${player} submits`;
    setHistory([...history, newEntry]);
    console.log(newEntry);
    // Implement API call or logic for handling submit
  };



  const handleMove = (player: number, steps: number, direction: 'left' | 'right') => {
    if (player === 1) {
      setPlayerOne((prev) => {
        let newPosition = Math.floor(Math.random() * 4);
        let direction = Math.random() > 0.5 ? Direction.LEFT : Direction.RIGHT;
        return { ...prev, position: newPosition < 0 ? 0 : newPosition > 4 ? 4 : newPosition, direction };
      });
    } else {
      setPlayerTwo((prev) => {
        let newPosition = Math.floor(Math.random() * 4);
        let direction = Math.random() > 0.5 ? Direction.LEFT : Direction.RIGHT;
        return { ...prev, position: newPosition < 0 ? 0 : newPosition > 4 ? 4 : newPosition, direction };
      });
    }
  };

  return (
    <div className="app">
      <GameBoard playerOne={playerOne} playerTwo={playerTwo} />

      <div className="container-fluid">
        <div className="row">
          <div className="col-4">
            <UserAction
              user="first"
              health={playerOneHealth}
              onDirection={(direction) => handleDirection(1, direction)}
              onSubmit={() => handleSubmit(1)}
              initialPosition={playerOne.position}
              onMove={(steps, direction) => handleMove(1, steps, direction)}
            />
          </div>
          <div className="col-4">
            <GameHistory history={history} />
          </div>
          <div className="col-4">
            <UserAction
              user="second"
              health={playerTwoHealth}
              onDirection={(direction) => handleDirection(2, direction)}
              onSubmit={() => handleSubmit(2)}
              initialPosition={playerTwo.position}
              onMove={(steps, direction) => handleMove(2, steps, direction)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  // <div className="flex flex-col h-screen">
  //   <div className="w-full h-1/2 border-2 border-gray-300 rounded-lg p-4">
  //     <div className="h-1/2">
  //       <div>
  //         {/* {isConnected && MFAHeader} */}
  //       </div>
  //       {/* <div className="grid">{isConnected ? loggedInView : unloggedInView}</div> */}
  //     </div>
  //     <div className="h-1/2 flex flex-row mx-3 justify-between">
  //       <div className="w-1/6 h-15 border-2 border-black rounded-md">First stone</div>
  //       <div className="w-1/6 h-15 border-2 border-black rounded-md">Second stone</div>
  //       <div className="w-1/6 h-15 border-2 border-black rounded-md">Third stone</div>
  //       <div className="w-1/6 h-15 border-2 border-black rounded-md">Fourth stone</div>
  //       <div className="w-1/6 h-15 border-2 border-black rounded-md">Fifth stone</div>
  //     </div>
  //   </div>
  //   <div className="w-full h-1/2 border-2 border-gray-300 rounded-lg p-2 flex justify-between">
  //     <div className="w-1/3 border-4 rounded-lg">first player data</div>
  //     <div className="w-1/3 border-4 rounded-lg">second player data</div>
  //   </div>
  // </div>
}

export default App;
