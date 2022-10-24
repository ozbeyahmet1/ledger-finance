import { ethers } from "hardhat";
import fs from "fs";

async function main() {
  const LedgerToDo = await ethers.getContractFactory("LedgerToDo");
  const ledgerToDo = await LedgerToDo.deploy();

  await ledgerToDo.deployed();

  console.log("LedgerToDo deployed to:", ledgerToDo.address);
  fs.writeFileSync(
    "./config.ts",
    `export const textContractAddress = "${ledgerToDo.address}"`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});