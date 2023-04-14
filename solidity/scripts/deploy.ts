import * as hre from "hardhat";

async function main() {
  await hre.run("compile");

  const cf = await hre.ethers.getContractFactory("Airdrop");
  const tx = await cf.deploy();

  await tx.deployed();

  console.log("deployed to:", tx.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
