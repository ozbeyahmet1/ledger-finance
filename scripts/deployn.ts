import { ethers } from "hardhat";
import fs from "fs";

async function main() {
  const LedgerContract = await ethers.getContractFactory("LedgerContract");
  const ledgerContract = await LedgerContract.deploy();

  await ledgerContract.deployed();

  console.log("LedgerContract deployed to:", ledgerContract.address);
  fs.writeFileSync(
    "./config.ts",
    `export const ledgerContractAddress = "${ledgerContract.address}"`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});