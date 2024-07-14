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

enum GameState {
  MakingGame,
  PendingPlayerOne,
  PendingPlayerTwo,
  PendingOracle,
  Completed,
}

function App() {

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
  const [name, setName] = useState('');

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
  });

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

  // const readContract = async () => {
  //   if (!provider) {
  //     console.log("provider not initialized yet");
  //     return;
  //   }
  //   const rpc = new RPC(provider as IProvider);
  //   const message = await rpc.readContract();
  //   // Convert bigint to number within the safe integer range
  //   const messageNumber = Number(message);
  //   if (messageNumber < Number.MIN_SAFE_INTEGER || messageNumber > Number.MAX_SAFE_INTEGER) {
  //     console.error("The message value is outside the safe integer range.");
  //     return;
  //   }
  //   // Use the number to index into the GameState enum
  //   const gameState = GameState[messageNumber];
  //   console.log(gameState); // Logs the name of the enum value
  //   console.log("Now trying to interact with the Ape contract!");
  //   const message1 = await rpc.readApeContract();
  //   console.log(message1);
  //   console.log(message1);
  //   // }
  // };

  const onboardUser = async () => {
    // mint ape token for the user
    // approve tokens to the game contract
    // then we add the user to the game
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider as IProvider);
    const receipt = await rpc.writeApeContractMint();
    const receipt1 = await rpc.writeApeContractApproval();
    const receipt2 = await rpc.writeGameContractRegister(name);
    // this part can be used to update data after the transaction is done
    // if (receipt) {
    //   setTimeout(async () => {
    //     await readContract();
    //   }, 2000);
    // }
  };

  // get the playerOne
  const getPlayerOne = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider as IProvider);
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

  const approveApeContract = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider as IProvider);
    const receipt = await rpc.writeApeContractApproval();
    console.log(receipt);
  }

  const allowanceApeContract = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider as IProvider);
    const receipt = await rpc.readApeContractAllowance();
    console.log(receipt);
  }

  const playersExist = async () => {
    // Call the smart contract to check if the players exist
    // If they exist, set the state to true
    setFirstPlayerCanJoin(true);
    setSecondPlayerCanJoin(true);
  }

  return (
    <div>
      {status === ADAPTER_STATUS.CONNECTED ? (
        <div>
          <GameBoard playerOne={playerOne} playerTwo={playerTwo} />
          <div className="flex flex-col">
            <div className="w-full border-2 border-gray-300 rounded-lg p-3 flex justify-between">
              <div className="w-1/4 border-2 rounded-lg mx-1">
                {firstPlayerCanJoin ?
                  <div className='w-full flex justify-center items-center'>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      onboardUser();
                    }} className='flex flex-col items-center mx-2 my-2'>
                      <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Enter your name'
                        className='text-center my-1' // Added margin-bottom for spacing
                      />
                      <button type='submit' className='px-4 py-2 bg-blue-500 text-white rounded'>
                        Join Game
                      </button>
                    </form>
                  </div>
                  :
                  <PlayerCard></PlayerCard>}
              </div>

              <div className="w-2/4 border-2 rounded-lg mx-1">
                <RecentMoves />
                {/* <button onClick={(e) => { e.preventDefault(); approveApeContract(); }} className='px-4 py-2 bg-blue-500 text-white rounded'>Approve</button>
                <button onClick={(e) => { e.preventDefault(); allowanceApeContract(); }} className='px-4 py-2 bg-blue-500 text-white rounded'>Allowance</button> */}
                <button onClick={getPlayerOne}>Get Player</button>
              </div>

              <div className="w-1/4 border-2 rounded-lg mx-1">
                {secondPlayerCanJoin ?
                  <div className='w-full flex justify-center items-center'>
                    <form onSubmit={() => console.log("registering the user")} className='flex flex-col items-center mx-2 my-2'>
                      <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Enter your name'
                        className='text-center my-1'
                      />
                      <button type='submit' className='px-4 py-2 bg-blue-500 text-white rounded'>
                        Join Game
                      </button>
                    </form>
                  </div> :
                  <PlayerCard></PlayerCard>
                }
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




// const sendTransaction = async () => {
//   if (!provider) {
//     console.log("provider not initialized yet");
//     return;
//   }
//   console.log("Function Triggered")
//   const rpc = new RPC(provider as IProvider);
//   const receipt = await rpc.sendTransaction();
//   console.log(receipt);
// };

// function shoot(setPlayer: any) {
//   // stop player from jumping and put the gun in hte hand
//   console.log("Stop the player")
//   setPlayer((prev: Player) => {
//     return {
//       ...prev,
//       gun: {
//         ...prev.gun,
//         isInHand: true
//       },
//       isShooting: true
//     };
//   });
//   // after some time put the gun in front
//   setTimeout(() => {
//     console.log("move the gun in first place")
//     setPlayer((prev: Player) => {
//       return {
//         ...prev,
//         gun: {
//           ...prev.gun,
//           isInHand: false
//         },
//         isShooting: true
//       };
//     });
//   }, 2000);
//   // after some time make the gun move
//   setTimeout(() => {
//     console.log("make the gun move")
//     setPlayer((prev: Player) => {
//       return {
//         ...prev,
//         gun: {
//           ...prev.gun,
//           isInHand: false,
//           isMoving: true
//         },
//         isShooting: true
//       };
//     });
//   }, 4000);
//   // set the rain
//   setTimeout(() => {
//     console.log("rain")
//     setPlayer((prev: Player) => {
//       return {
//         ...prev,
//         gun: {
//           ...prev.gun,
//           isInHand: false,
//           isMoving: true,
//           showRain: true
//         },
//         isShooting: true
//       };
//     });
//   }, 6000);

//   // After a while hide everything
//   setTimeout(() => {
//     console.log("rain")
//     setPlayer((prev: Player) => {
//       return {
//         ...prev,
//         gun: {
//           ...prev.gun,
//           isInHand: false,
//           isMoving: false,
//           showRain: false
//         },
//         isShooting: false
//       };
//     });
//   }, 8000);
// }

// useEffect(() => {
//   setTimeout(() => {
//     // First: set the type of gun
//     setPlayerTwo((prev) => {
//       return {
//         ...prev,
//         gun: {
//           ...prev.gun,
//           type: GunType.SMALL
//         }
//       }
//     })
//     // Second: calculate the delta
//     let delta = Math.abs(playerOne.position - playerTwo.position); // TODO: get this from backend
//     setPlayerOne((prev) => {
//       return {
//         ...prev,
//         gun: {
//           ...prev.gun,
//           delta: delta
//         }
//       }
//     })
//     setPlayerTwo((prev) => {
//       return {
//         ...prev,
//         gun: {
//           ...prev.gun,
//           delta: delta
//         }
//       }
//     })
//     // Third: render the animation
//     shoot(setPlayerOne);
//     shoot(setPlayerTwo);
//   }, 2000);
// }, [])


// const handleDirection = (player: number, direction: 'left' | 'right') => {
//   const newEntry = `Player ${player} moves ${direction}`;
//   // setHistory([...history, newEntry]);
//   console.log(newEntry);
//   // Implement API call or logic for handling direction
// };

// const handleSubmit = (player: number) => {
//   const newEntry = `Player ${player} submits`;
//   setHistory([...history, newEntry]);
//   console.log(newEntry);
//   // Implement API call or logic for handling submit
// };

// const handleMove = (player: number, steps: number, direction: 'left' | 'right') => {
//   if (player === 1) {
//     setPlayerOne((prev) => {
//       let newPosition = 3;
//       let direction = Direction.RIGHT;
//       return { ...prev, position: newPosition, direction };
//     });
//   } else {
//     setPlayerTwo((prev) => {
//       let newPosition = Math.floor(Math.random() * 4);
//       let direction = Math.random() > 0.5 ? Direction.LEFT : Direction.RIGHT;
//       return { ...prev, position: newPosition, direction };
//     });
//   }
// };