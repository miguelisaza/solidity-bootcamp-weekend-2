# Homework Weekend 2 

Make sure that you got Yarn installed in your system

```shell
npm i yarn -g
```

To install the project, run the following commands from the root folder:

```shell
yarn add
yarn hardhat compile
```

And then, run the script: 

```shell
yarn run ballot-script "Cat" "Dog" "Mice"
```

Expected Script ouptut: 

```shell
Ballot contract deployed at 0x5FbDB2315678afecb367f032d93F642f64180aa3 at block 1
----------------------------------------------------
Chairperson is 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
----------------------------------------------------
Giving rights to vote to 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
Voting rights given to 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 done at block 2 with hash 0x6b437d9badcff1cba696c5f9a4ce45bcce9f6e886e6bb702af883a77283027b6
----------------------------------------------------
Giving rights to vote to 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
Voting rights given to 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC done at block 3 with hash 0x701afe81d0101c8ef528faac3e336b97b7fc0f4624051698a260b341be795c7a
----------------------------------------------------
0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 voting for Dog
0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 voted for Dog at block 4 with hash 0xa7c81bc0869001db2cb2eb4a01b22742b4463d3dcb2624419b4215694a039c6d
----------------------------------------------------
Delegating of 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 vote to 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Vote from 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 has been delegated to 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 done at block 5 with hash 0x3885a961fbebf303701cd801a7f59c1996f1fa3fcb2c45f86bfb33eeec4629eb
----------------------------------------------------
0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC voting for Mice
0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC voted for Mice at block 6 with hash 0x10a8dc8ea9a5ea06e9ae874536bdbb6bc92fa509743dff247474560eb5b24507
----------------------------------------------------
The winner is Dog
```
