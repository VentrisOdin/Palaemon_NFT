const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
    const [owner] = await ethers.getSigners();
    const nftContractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your deployed contract address
    const nftContract = await ethers.getContractAt("PalaemonNFT", nftContractAddress);

    const imagesDir = path.join(__dirname, "../images");
    const imageFiles = fs.readdirSync(imagesDir);

    for (const imageFile of imageFiles) {
        const tokenId = parseInt(imageFile.split('.')[0]); // Assuming the token ID is derived from the file name
        const imageURI = `https://yourdomain.com/images/${imageFile}`; // Replace with your image hosting URL

        const tx = await nftContract.mint(owner.address, tokenId, imageURI);
        await tx.wait();
        console.log(`Minted NFT with Token ID: ${tokenId} and Image URI: ${imageURI}`);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });