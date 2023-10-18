async function main() {
  const [owner] = await ethers.getSigners();
  const Token = await hre.ethers.getContractFactory("FT");
  const token = await Token.deploy();
  await token.deployed();
  console.log('owner address:', owner.address);
  await token.safeMint(owner.address, { value: ethers.utils.parseEther("0.001") }); // Updated the value and fixed the space
  console.log('Deployed token address:', token.address);

  const WAIT_BLOCK_CONFIRMATIONS = 6;
  await token.deployTransaction.wait(WAIT_BLOCK_CONFIRMATIONS);
  console.log(`Contract deployed to ${token.address} on ${network.name}`); // Changed the single quotes to backticks for template literals
  await run('verify:verify', {
      address: token.address,
      constructorArguments: [],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exitCode = 1;
  });
