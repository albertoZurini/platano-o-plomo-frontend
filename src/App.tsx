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

import GameBoard from "./components/GameBoard";
import Footer from "./components/Footer";
import Header from "./components/Header";
import UserActions from "./components/UserActions";
import GameHistory from "./components/GameHistory";
import UserAction from "./components/UserActions";
import { Direction, GunType, Player } from "./interfaces/player.interface";
import monkeyGreenImage from './assets/images/monkey-green.png';  // Ensure to use the correct path
import monkeyBrownImage from './assets/images/monkey-brown.png'; // Ensure to use the correct path


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
    <div>
      {status === ADAPTER_STATUS.CONNECTED ? (
        <>
          <GameBoard playerOne={playerOne} playerTwo={playerTwo} />

        <div className="flex flex-col h-screen">
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
        </div>
        </>) : (<button onClick={connect}>login</button>)}
    </div>
  );
}

export default App;
