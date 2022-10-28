import { ethers } from "hardhat";
import fs from "fs";

async function main() {
  const ToDoDeneme = await ethers.getContractFactory("ToDoDeneme");
  const toDoDeneme = await ToDoDeneme.deploy();

  await toDoDeneme.deployed();

  console.log("ToDoDeneme deployed to:", toDoDeneme.address);
  fs.writeFileSync(
    "./config.ts",
    `export const toDoAddress = "${toDoDeneme.address}"`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});