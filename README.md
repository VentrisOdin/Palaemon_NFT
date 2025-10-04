# Palaemon NFT on Binance Smart Chain

## Overview
Palaemon NFT is a project that allows users to create, manage, and trade non-fungible tokens (NFTs) on the Binance Smart Chain (BSC). This project implements the ERC721 standard and provides a set of utilities for minting and managing NFTs.

## Project Structure
The project consists of the following main components:

- **contracts/**: Contains the smart contracts for the Palaemon NFT.
  - `PalaemonNFT.sol`: The main NFT contract implementing the ERC721 standard.
  - **interfaces/**: Contains the ERC721 interface.
    - `IERC721.sol`: Defines the required functions and events for NFT contracts.
  - **utils/**: Contains utility contracts.
    - `Ownable.sol`: Implements ownership functionality.

- **scripts/**: Contains scripts for deploying and interacting with the NFT contract.
  - `deploy.js`: Script to deploy the PalaemonNFT contract to BSC.
  - `mint.js`: Script to mint new NFTs based on provided images.
  - `verify.js`: Script to verify the deployed contract on BscScan.

- **test/**: Contains test cases for the PalaemonNFT contract.
  - `PalaemonNFT.test.js`: Tests to ensure all functionalities work as expected.

- **metadata/**: Contains metadata files for the NFTs.
  - `1.json`: Metadata for the first NFT.
  - `2.json`: Metadata for the second NFT.
  - `collection.json`: Metadata for the entire NFT collection.

- **images/**: Contains the images used for the NFTs.

- **hardhat.config.js**: Configuration file for Hardhat, specifying network settings and compiler options.

- **package.json**: Configuration file for npm, listing dependencies and scripts.

- **.env.example**: Template for environment variables.

- **.gitignore**: Specifies files and directories to be ignored by Git.

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   cd palaemon-nft-bsc
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env` and fill in the required values.

4. Deploy the contract:
   ```
   npx hardhat run scripts/deploy.js --network bsc
   ```

5. Mint NFTs:
   ```
   npx hardhat run scripts/mint.js --network bsc
   ```

6. Verify the contract:
   ```
   npx hardhat run scripts/verify.js --network bsc
   ```

## Usage
After deploying the contract, you can mint NFTs using the provided images. The metadata files in the `metadata/` directory can be updated to reflect the attributes of each NFT.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.