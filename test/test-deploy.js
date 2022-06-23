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

  it("people's length should be 0 on initialization", async () => {
    let length = await simpleStorage.totalPeople();
    assert.equal(length, 0);
  });

  it("people's length should be 2 after adding two people", async () => {
    await simpleStorage.addPerson("Blessing", "22");
    await simpleStorage.addPerson("Over", "22");

    let length = await simpleStorage.totalPeople();
    assert.equal(length, 2);
  });

  it("return the person's name that was added", async () => {
    let name = "Blessing";
    await simpleStorage.addPerson(name, "22");
    let person = await simpleStorage.people(0);
    assert.equal(person.name, name);
  });
});
