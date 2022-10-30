# Ledger | Financial Dashboard Dapp

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

#Build

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