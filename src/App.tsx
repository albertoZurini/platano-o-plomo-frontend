import { useEffect, useState } from "react";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import { ADAPTER_STATUS, IProvider } from "@web3auth/base";
import "./App.css";
import RPC from "./web3RPC"; // for using web3.js
import { useWalletServicesPlugin } from "@web3auth/wallet-services-plugin-react-hooks";
import PlayerCard from "./components/PlayerCard";
import RecentMoves from "./components/RecentMoves";
import GameBoard from "./components/GameBoard";
import { Direction, GunType, Player } from "./interfaces/player.interface";
import monkeyGreenImage from './assets/images/monkey-green.png';  // Ensure to use the correct path
import monkeyBrownImage from './assets/images/monkey-brown.png'; // Ensure to use the correct path
import Web3 from "web3";
import UserAction from "./components/UserActions";
import GameHistory from "./components/GameHistory";

enum GameState {
  MakingGame,
  PendingPlayerOne,
  PendingPlayerTwo,
  PendingOracle,
  Completed,
}

function App() {
  const [playerOne, setPlayerOne] = useState({
    name: null,
    position: 0,
    health: 100,
    direction: Direction.RIGHT,
    image: monkeyGreenImage,
    gun: {
      type: GunType.NONE,
      isInHand: false, // at the beginning true, after 1s false
      isMoving: false, // after 1s from isInHand false, set this to true. This will start the animation of the banana moving
      showRain: false,
      delta: 0,
    },
    isShooting: false,
    dice: 0
  });

  const [playerTwo, setPlayerTwo] = useState({
    name: null,
    position: 4,
    health: 100,
    direction: Direction.LEFT,
    image: monkeyBrownImage,
    gun: {
      type: GunType.NONE,
      isInHand: false, // at the beginning true, after 1s false
      isMoving: false, // after 1s from isInHand false, set this to true. This will start the animation of the banana moving
      showRain: false,
      delta: 0,
    },
    isShooting: false,
    dice: 0
  });

  const [gameState, setGameState] = useState(4)
  const {
    initModal,
    provider,
    web3Auth,
    connect,
    logout,
    userInfo,
    status,
  } = useWeb3Auth();

  const rpc = new RPC(provider as IProvider);
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
  useEffect(() => {
    rpc.readContract().then(message =>
      setGameState(message)
    )
  }, [provider])
  useEffect(() => {
    if (gameState == 1 || gameState == 2) {
      rpc.readFirstPlayerGameContract().then(player => {
        console.log(player)
        setFirstPlayerName(player[1])
        setPlayerOne((prev) => {
          return {
            ...prev,
            health: Number(player["health"]),
            direction: player['facingRight'] ? Direction.RIGHT : Direction.LEFT,
            dice: Number(player['lastDice']),
            position: Number(player['position']),
          }
        })
        setFirstPlayerCanJoin(false)
      })
      rpc.readSecondPlayerGameContract().then(player => {
        console.log(player)
        setSecondPlayerName(player[1])
        setPlayerTwo((prev) => {
          return {
            ...prev,
            health: Number(player["health"]),
            direction: player['facingRight'] ? Direction.RIGHT : Direction.LEFT,
            dice: Number(player['lastDice']),
            position: Number(player['position']),
          }
        })
        setSecondPlayerCanJoin(false)
      })
    }
    console.log(playerOne)
  }, [gameState])

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



  // TODO: Getting two booleans for showing if first and second player exist in the game (bool, bool)
  // TODO: function getting the location ( Index from 0 to 4 ) of both players as well as their direction from smart contract
  // TODO: function for registering the user, accepting a name 
  // TODO: function for accepting the move from user, accepts a direction

  const [firstPlayerCanJoin, setFirstPlayerCanJoin] = useState(true)
  const [secondPlayerCanJoin, setSecondPlayerCanJoin] = useState(true)
  const [firstPlayerName, setFirstPlayerName] = useState('');
  const [secondPlayerName, setSecondPlayerName] = useState('');
  const onBoardUser = async (playerName: string) => {
    console.log('shit')
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const receipt = await rpc.writeApeContractMint();
    const receipt1 = await rpc.writeApeContractApproval();
    console.log(playerName);
    const receipt2 = await rpc.writeGameContractRegister(playerName);
    console.log(receipt)
    console.log(receipt1)
    console.log(receipt2)
  };

  // get the playerOne
  const getPlayerOne = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const receipt = await rpc.readFirstPlayerGameContract();
    const _position = Number(Web3.utils.toWei(receipt.position, "ether")) + 1;
    const _health = Number(Web3.utils.toWei(receipt.health, "ether"));

    console.log(Web3.utils.toWei(receipt.position, "ether"));
    setPlayerOne(prevState => ({
      ...prevState,
      name: receipt.name,
      position: _position, // Convert BigInt to number
      health: _health, // Convert BigInt to number
      direction: receipt.facingRight ? Direction.RIGHT : Direction.LEFT,
    }));
  }
  const handleDirection = async (player: number, direction: 'left' | 'right') => {
    const newEntry = `Player ${player} moves ${direction}`;
    const reciept = await rpc.writeRollDice(direction === 'right')
    // Implement API call or logic for handling direction
  };

  const handleMove = (player: number, newPosition: number, direction: 'left' | 'right') => {
    if (player === 1) {
      setPlayerOne((prev) => {
        return { ...prev, position: newPosition, direction: direction == 'left' ? Direction.LEFT : Direction.RIGHT };
      });
    } else {
      setPlayerTwo((prev) => {
        return { ...prev, position: newPosition, direction: direction == 'left' ? Direction.LEFT : Direction.RIGHT };
      });
    }
  };
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
  return (
    <div>
      {status === ADAPTER_STATUS.CONNECTED ? (
        <div className="app">
          <GameBoard playerOne={playerOne} playerTwo={playerTwo} />

          <div className="container-fluid">
            <div className="row">
              <div className="col-4">
                <UserAction
                  user="first"
                  health={playerOne.health}
                  onDirection={(direction) => handleDirection(1, direction)}
                  initialPosition={playerOne.position}
                  onMove={(steps, direction) => handleMove(1, steps, direction)}
                  playerCanJoin={firstPlayerCanJoin}
                  setName={setFirstPlayerName}
                  playerName={firstPlayerName}
                  onBoardUser={onBoardUser}
                  dice={playerOne.dice}
                />
              </div>
              <div className="col-4">
                <GameHistory />
              </div>
              <div className="col-4">
                <UserAction
                  user="second"
                  health={playerTwo.health}
                  onDirection={(direction) => handleDirection(2, direction)}
                  initialPosition={playerTwo.position}
                  onMove={(steps, direction) => handleMove(2, steps, direction)}
                  playerCanJoin={secondPlayerCanJoin}
                  setName={setSecondPlayerName}
                  playerName={secondPlayerName}
                  onBoardUser={onBoardUser}
                  dice={playerTwo.dice}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center"><button onClick={connect} className='px-4 py-2 bg-blue-500 text-white rounded'>login</button></div>
      )
      }
    </div>
  );
}

export default App;
