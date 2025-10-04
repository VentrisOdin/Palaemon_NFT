const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString());

  // Replace with your actual metadata URI (IPFS or web server)
  const baseURI = "https://your-metadata-host.com/metadata/";
  
  const PalaemonNFT = await hre.ethers.getContractFactory("PalaemonNFT");
  const palaemonNFT = await PalaemonNFT.deploy(baseURI);

  console.log("PalaemonNFT deployed to:", await palaemonNFT.getAddress());
  console.log("Owner:", await palaemonNFT.owner());
  console.log("Max Supply:", await palaemonNFT.MAX_SUPPLY());
  console.log("Mint Price:", hre.ethers.formatEther(await palaemonNFT.mintPrice()), "BNB");
  
  console.log("\nContract deployed successfully! 🎉");
  console.log("Save this address for verification and interaction:");
  console.log("Contract Address:", await palaemonNFT.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });