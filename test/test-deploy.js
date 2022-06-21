const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleTest", () => {
  let simpleStorageFactory, simpleStorage;

  beforeEach(async () => {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
    await simpleStorage.deployed();
  });

  it("Favourite number should be '0' on initialization", async () => {
    const favNum = await simpleStorage.retrieve();
    assert.equal(favNum.toString(), "0");
  });

  it("favourite number should be updated when store is called", async () => {
    await simpleStorage.store("22");

    const favNum = (await simpleStorage.retrieve()).toString();

    expect(favNum).equal("22");
  });
});
