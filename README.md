# Web3Auth (`@web3auth/modal`) x EVM x React - EthBrussels 2024

[![Web3Auth](https://img.shields.io/badge/Web3Auth-SDK-blue)](https://web3auth.io/docs/sdk/pnp/web/modal)
[![Web3Auth](https://img.shields.io/badge/Web3Auth-Community-cyan)](https://community.web3auth.io)

[Join our Community Portal](https://community.web3auth.io/) to get support and stay up to date with the latest news and updates.

This example demonstrates how to use Web3Auth with EVM in React for the EthBrussels 2024 hackathon.

## Front-end

The front-end was developed using React and Tailwind CSS. We integrated Web3Auth to provide seamless interaction for our game. The game features monkeys as HTML elements that move around the page. When an action is performed, bananas (images contained in a div) will appear and move to their designated positions using absolute positioning. The animation is synchronized using JavaScript to ensure a smooth experience.

## Smart Contracts

The smart contracts for ApeCoins and the PlatanoPlomo Game are deployed and verified on Arbitrum Sepolia. These contracts utilize Chainlink VRF for randomization, ensuring fair gameplay.

- [ApeCoins Contract](https://arbitrum-sepolia.blockscout.com/address/0x3590490a548854a2ecdd335b50dc9ee945197db7?tab=contract)
- [PlatanoPlomo Game Contract](https://arbitrum-sepolia.blockscout.com/address/0x22c0B8189E5f0277AF27F5E988eb2837C5a777C7?tab=contract)
- [PlatanoPlomo Game Live Demo](https://res.zurini.dev/ethbrussels2024)

## How to Use

### One-Click Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FWeb3Auth%2Fweb3auth-pnp-examples%2Ftree%2Fmain%2Fweb-modal-sdk%2Fblockchain-connection-examples%2Fevm-modal-example&project-name=w3a-evm-modal&repository-name=w3a-evm-modal)

### Download Manually

```bash
npx degit Web3Auth/web3auth-pnp-examples/web-modal-sdk/blockchain-connection-examples/evm-modal-example w3a-example
```

Install & Run:

```bash
cd w3a-example
npm install
npm run start
# or
cd w3a-example
yarn
yarn start
```

## Important Links

- [Website](https://web3auth.io)
- [Docs](https://web3auth.io/docs)
- [Guides](https://web3auth.io/docs/guides)
- [SDK / API References](https://web3auth.io/docs/sdk)
- [Pricing](https://web3auth.io/pricing.html)
- [Community Portal](https://community.web3auth.io)