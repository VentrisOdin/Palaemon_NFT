const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PalaemonNFT", function () {
    let PalaemonNFT;
    let palaemonNFT;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        PalaemonNFT = await ethers.getContractFactory("PalaemonNFT");
        [owner, addr1, addr2] = await ethers.getSigners();
        palaemonNFT = await PalaemonNFT.deploy("https://example.com/metadata/");
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await palaemonNFT.owner()).to.equal(owner.address);
        });

        it("Should have correct name and symbol", async function () {
            expect(await palaemonNFT.name()).to.equal("Palaemon NFT");
            expect(await palaemonNFT.symbol()).to.equal("PAL");
        });

        it("Should have max supply of 32", async function () {
            expect(await palaemonNFT.MAX_SUPPLY()).to.equal(32);
        });
    });

    describe("Minting", function () {
        it("Should mint a new NFT starting from token ID 0", async function () {
            await palaemonNFT.mint(addr1.address, "1.json");
            expect(await palaemonNFT.ownerOf(0)).to.equal(addr1.address);
            expect(await palaemonNFT.totalSupply()).to.equal(1);
        });

        it("Should fail if the sender is not the owner", async function () {
            await expect(
                palaemonNFT.connect(addr1).mint(addr2.address, "2.json")
            ).to.be.revertedWith("OwnableUnauthorizedAccount");
        });

        it("Should allow public mint with correct payment", async function () {
            await palaemonNFT.connect(addr1).publicMint({
                value: ethers.parseEther("0.01")
            });
            expect(await palaemonNFT.ownerOf(0)).to.equal(addr1.address);
        });

        it("Should fail public mint with insufficient payment", async function () {
            await expect(
                palaemonNFT.connect(addr1).publicMint({
                    value: ethers.parseEther("0.005")
                })
            ).to.be.revertedWith("Insufficient payment");
        });
    });

    describe("Transferring", function () {
        it("Should transfer NFT from one owner to another", async function () {
            await palaemonNFT.mint(addr1.address, "1.json");
            await palaemonNFT.connect(addr1).transferFrom(addr1.address, addr2.address, 0);
            expect(await palaemonNFT.ownerOf(0)).to.equal(addr2.address);
        });
    });

    describe("Admin functions", function () {
        it("Should allow owner to set mint price", async function () {
            await palaemonNFT.setMintPrice(ethers.parseEther("0.02"));
            expect(await palaemonNFT.mintPrice()).to.equal(ethers.parseEther("0.02"));
        });

        it("Should allow owner to withdraw funds", async function () {
            await palaemonNFT.connect(addr1).publicMint({
                value: ethers.parseEther("0.01")
            });
            
            const balanceBefore = await ethers.provider.getBalance(owner.address);
            await palaemonNFT.withdraw();
            const balanceAfter = await ethers.provider.getBalance(owner.address);
            
            expect(balanceAfter).to.be.gt(balanceBefore);
        });
    });
});