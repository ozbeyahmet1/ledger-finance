# Ledger | Financial Dashboard Dapp

Ledger Financial Fashboard project is a blockchain based personal finance application.Made with NextJS, Typescript, Solidity,Ethers.js and Hardhat. This project includes:

-Sign In With Ethereum (SIWE)

-Server Side Authentication

-Smart Contract / Front End Integration

-Server Side Rendering

## Build

The site is a hybrid SPA built with Next.js.

To build the application yourself, you'll need to:

1.Install Node

2.Clone this repo

3.create .env.local and add

    NEXTAUTH_URL=http://localhost:3000

    NEXTAUTH_SECRET= # Linux: `openssl rand -hex 32` or go to https://generate-secret.now.sh/32

    PRIVATE_KEY= # metamask account private to deploying contract

    ALCHEMY_API=

4.yarn install

5.yarn dev