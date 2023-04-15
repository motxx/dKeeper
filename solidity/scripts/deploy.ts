import * as hre from "hardhat";

const conditionsType = [
  { name: "ipfsIds", type: "string[]" },
];

const conditions = {
  ipfsIds: [
    "QmcMtweCSaLS8TiAswcAVFcLUuSCcFgq5LktX8Ebz6Pvry",
    "QmWU8ZUGaTp4LdstmXobZTL8TfuzpFgAojSADwYoxWKF1t",
  ],
};

async function main() {
  await hre.run("compile");

  const cf = await hre.ethers.getContractFactory("Airdrop");
  const tx = await cf.deploy(
    "0x199BD7856801338571d1323503A16aE1b4d52d60",
    conditions,
  );

  await tx.deployed();

  console.log("deployed to:", tx.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
