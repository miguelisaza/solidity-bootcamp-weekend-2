import { ethers } from "hardhat";
import { Ballot__factory, Ballot } from "../typechain-types";
import * as dotenv from "dotenv";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

dotenv.config();

function convertStringArrayToBytes32(array: string[]) {
  return array.map(ethers.utils.formatBytes32String);
}

function showDividerLine() {
  return console.log("----------------------------------------------------");
}

async function giveRightsToVote(
  contract: Ballot,
  address: string
): Promise<void> {
  console.log(`Giving rights to vote to ${address}`);
  const giveRightToVote = await contract.giveRightToVote(address);
  const rightToVoteTxR = await giveRightToVote.wait();
  console.log(
    `Voting rights given to ${address} done at block ${rightToVoteTxR.blockNumber} with hash ${rightToVoteTxR.blockHash}`
  );
}

async function delegateVotes(
  contract: Ballot,
  signer: SignerWithAddress,
  toAddress: string
): Promise<void> {
  console.log(`Delegating of ${signer.address} vote to ${toAddress}`);
  const contractFromSigner = contract.connect(signer);
  const delegateVote = await contractFromSigner.delegate(toAddress);
  const delegateVoteTxR = await delegateVote.wait();
  console.log(
    `Vote from ${signer.address} has been delegated to ${toAddress} done at block ${delegateVoteTxR.blockNumber} with hash ${delegateVoteTxR.blockHash}`
  );
}

async function castVote(
  contract: Ballot,
  proposals: string[],
  signer: SignerWithAddress,
  proposal: number
): Promise<void> {
  console.log(`${signer.address} voting for ${proposals[proposal]}`);
  const contractFromSigner = contract.connect(signer);
  const vote = await contractFromSigner.vote(proposal);
  const voteTxR = await vote.wait();

  console.log(
    `${signer.address} voted for ${proposals[proposal]} at block ${voteTxR.blockNumber} with hash ${voteTxR.blockHash}`
  );
}

async function main() {
  const PROPOSALS = process.argv.slice(2);
  const [signer1, signer2, signer3] = await ethers.getSigners();
  const ballotFactory = new Ballot__factory(signer1);

  console.log("Proposals: ");
  PROPOSALS.forEach((element, index) => {
    console.log(`Proposal N. ${index + 1}: ${element}`);
  });

  console.log("Deploying Ballot contract");
  const ballotContract = await ballotFactory.deploy(
    convertStringArrayToBytes32(PROPOSALS)
  );

  const deployTxR = await ballotContract.deployTransaction.wait();
  console.log(
    `Ballot contract deployed at ${ballotContract.address} at block ${deployTxR.blockNumber}`
  );

  showDividerLine();

  // getting the chairperson
  const chairperson = await ballotContract.chairperson();
  console.log(`Chairperson is ${chairperson}`);

  showDividerLine();

  // give signer2 rights to vote
  await giveRightsToVote(ballotContract, signer2.address);

  showDividerLine();

  // give signer3 rights to vote
  await giveRightsToVote(ballotContract, signer3.address);

  showDividerLine();

  // signer1 vote
  await castVote(ballotContract, PROPOSALS, signer1, 1);

  showDividerLine();

  // delegate signer2 vote to the chosen proposal of the address of signer1
  await delegateVotes(ballotContract, signer2, signer1.address);

  showDividerLine();

  // signer3 vote
  await castVote(ballotContract, PROPOSALS, signer3, 2);

  showDividerLine();

  const winner = await ballotContract.winnerName();
  console.log(`The winner is ${ethers.utils.parseBytes32String(winner)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
