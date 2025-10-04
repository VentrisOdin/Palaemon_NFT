const { run } = require("hardhat");

async function verify(contractAddress, args) {
    console.log("Verifying contract...");
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (error) {
        console.error("Verification failed:", error);
    }
}

async function main() {
    const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your contract address
    const args = []; // Add constructor arguments if any

    await verify(contractAddress, args);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });