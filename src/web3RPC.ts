import type { IProvider } from "@web3auth/base";
import Web3 from "web3";
import abi from "./abi/main.json";
import erc20 from "./abi/erc20.json";

const gameContract = "0x1d8bCf5422e150509C872d8d375120eA0628AC93";
const apeContract = "0x4A1BCa7001B83eD1ac890b34C4D9aB99B9FdEEdB";

export default class EthereumRpc {
  private provider: IProvider;

  constructor(provider: IProvider) {
    this.provider = provider;
  }

  async getChainId(): Promise<string> {
    try {
      const web3 = new Web3(this.provider as any);

      // Get the connected Chain's ID
      const chainId = await web3.eth.getChainId();

      return chainId.toString();
    } catch (error) {
      return error as string;
    }
  }

  async getAccounts(): Promise<any> {
    try {
      const web3 = new Web3(this.provider as any);

      // Get user's Ethereum public address
      const address = await web3.eth.getAccounts();

      return address;
    } catch (error) {
      return error;
    }
  }

  async getBalance(): Promise<string> {
    try {
      const web3 = new Web3(this.provider as any);

      // Get user's Ethereum public address
      const address = (await web3.eth.getAccounts())[0];

      // Get user's balance in ether
      const balance = web3.utils.fromWei(
        await web3.eth.getBalance(address), // Balance is in wei
        "ether"
      );

      return balance;
    } catch (error) {
      return error as string;
    }
  }

  async sendTransaction(): Promise<any> {
    try {
      const web3 = new Web3(this.provider as any);

      // Get user's Ethereum public address
      const fromAddress = (await web3.eth.getAccounts())[0];

      const destination = "0xBC6dB679B4F43abC493B22b8E67B179bc3f13655";

      const amount = web3.utils.toWei("0.001", "ether"); // Convert 1 ether to wei
      let transaction = {
        from: fromAddress,
        to: destination,
        data: "0x",
        value: amount,
      }

      // calculate gas transaction before sending
      transaction = { ...transaction, gas: await web3.eth.estimateGas(transaction)} as any;

      // Submit transaction to the blockchain and wait for it to be mined
      const receipt = await web3.eth.sendTransaction(transaction);

      return this.toStringJson(receipt);
    } catch (error) {
      return error as string;
    }
  }

  async signMessage() {
    try {
      const web3 = new Web3(this.provider as any);

      // Get user's Ethereum public address
      const fromAddress = (await web3.eth.getAccounts())[0];

      const originalMessage = "YOUR_MESSAGE";

      // Sign the message
      const signedMessage = await web3.eth.personal.sign(
        originalMessage,
        fromAddress,
        "test password!" // configure your own password here.
      );

      return signedMessage;
    } catch (error) {
      return error as string;
    }
  }

  async readContract() {
    try {
      const web3 = new Web3(this.provider as any);

      const contractABI = abi;
      const contractAddress = "0xD38753c53e305147e829F94222bFf18c74A3Bb14";
      const contract = new web3.eth.Contract(JSON.parse(JSON.stringify(contractABI)), contractAddress);

      // Read message from smart contract
      const message = await contract.methods.gameState().call();
      return message;
    } catch (error) {
      return error as string;
    }
  }

  async readFirstPlayerGameContract() {
    try {
      const web3 = new Web3(this.provider as any);

      const contractABI = abi;
      const contractAddress = gameContract;
      const contract = new web3.eth.Contract(JSON.parse(JSON.stringify(contractABI)), contractAddress);

      // Read message from smart contract
      const message = await contract.methods.playerOne().call();
      return message as any;
    } catch (error) {
      return error as string;
    }
  }

  async writeGameContractRegister(name: string) {
    try {
      console.log("trying to register the user to the game contract")
      const web3 = new Web3(this.provider as any);
      const contractABI = abi;
      const contractAddress = gameContract;
      const myContract = new web3.eth.Contract(JSON.parse(JSON.stringify(contractABI)), contractAddress);
      // Send transaction to smart contract to update message
      const receipt = await myContract.methods.createGame(name).send({
        from: `${(await web3.eth.getAccounts())[0]}`,
      });
      console.log(receipt.transactionHash.toString());
      console.log("success")
      return receipt;
    } catch (error) {
      console.log("error");
      console.log(error);
      return error as string;
    }
  }

  async writeApeContractMint() {
    try {
      console.log("Trying to mint Ape token")
      const web3 = new Web3(this.provider as any);
      const contractABI = erc20;
      const contractAddress = apeContract;
      const myContract = new web3.eth.Contract(JSON.parse(JSON.stringify(contractABI)), contractAddress);
      // Send transaction to smart contract to update message
      const receipt = await myContract.methods.mint(`${(await web3.eth.getAccounts())[0]}`, 1000e18).send({
        from: `${(await web3.eth.getAccounts())[0]}`,
      });
      // console.log("Ape token minted for user", receipt.transactionHash.toString());
      console.log("success")
      return receipt;
    } catch (error) {
      console.log("error");
      console.log(error);
      return error as string;
    }
  }

  async writeApeContractApproval() {
    try {
      console.log("Trying to approve the game contract")
      const web3 = new Web3(this.provider as any);
      const contractABI = erc20;
      const contractAddress = apeContract;
      const myContract = new web3.eth.Contract(JSON.parse(JSON.stringify(contractABI)), contractAddress);
      // console.log(myContract);
      // console.log((await web3.eth.getAccounts())[0]);
      // Send transaction to smart contract to update message
      const receipt = await myContract.methods.approve(gameContract, 1000e18).send({
        from: `${(await web3.eth.getAccounts())[0]}`,
      });
      // console.log(receipt.transactionHash.toString());
      console.log("success")
      return receipt;
    } catch (error) {
      console.log("error");
      console.log(error);
      return error as string;
    }
  }

  async readApeContractAllowance() {
    try {
      const web3 = new Web3(this.provider as any);
      const contractABI = erc20;
      const contractAddress = apeContract;
      const contract = new web3.eth.Contract(JSON.parse(JSON.stringify(contractABI)), contractAddress);
      // Read message from smart contract
      const message = await contract.methods.allowance(`${(await web3.eth.getAccounts())[0]}`, gameContract).call();
      console.log("success")
      return message;
    } catch (error) {
      return error as string;
    }
  }

  async getPrivateKey(): Promise<any> {
    try {
      const privateKey = await this.provider.request({
        method: "eth_private_key",
      });

      return privateKey;
    } catch (error) {
      return error as string;
    }
  }

  toStringJson(data: any) {
    // can't serialize a BigInt, so this hack
    return JSON.parse(JSON.stringify(data, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value // return everything else unchanged
    ));
  }
}
