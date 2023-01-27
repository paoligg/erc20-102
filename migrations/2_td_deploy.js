
var TDErc20 = artifacts.require("ERC20TD.sol");
var ERC20Claimable = artifacts.require("ERC20Claimable.sol");
var evaluator = artifacts.require("Evaluator.sol");
var exerciceSolution = artifacts.require("ExerciceSolution.sol");
var token= artifacts.require("ExerciceSolutionToken.sol");


module.exports = (deployer, network, accounts) => {
    deployer.then(async () => {
        await deployTDToken(deployer, network, accounts); 
        await deployEvaluator(deployer, network, accounts); 
        await setPermissionsAndRandomValues(deployer, network, accounts); 
        await testsolution(deployer, network, accounts);
		await deployRecap(deployer, network, accounts); 
		
    });
};

async function deployTDToken(deployer, network, accounts) {
	TDToken = await TDErc20.new("TD-ERC20-101","TD-ERC20-101",web3.utils.toBN("20000000000000000000000000000"))
	ClaimableToken = await ERC20Claimable.new("ClaimableToken","CLTK",web3.utils.toBN("20000000000000000000000000000"))
}

async function deployEvaluator(deployer, network, accounts) {
	Evaluator = await evaluator.new(TDToken.address, ClaimableToken.address)
}

async function setPermissionsAndRandomValues(deployer, network, accounts) {
	await TDToken.setTeacher(Evaluator.address, true)
}

async function testsolution(deployer, network, accounts) {

    myToken=await token.new()
    mySolution = await exerciceSolution.new(ClaimableToken.address, myToken.address)
    console.log("mySolution " + mySolution.address)
    await Evaluator.submitExercice(mySolution.address)
    myBalance = await TDToken.balanceOf(accounts[0])
    console.log("my balance " + myBalance)
    await Evaluator.ex2_claimedFromContract()
    myBalance = await TDToken.balanceOf(accounts[0])
    console.log("my balance " + myBalance)
    await Evaluator.ex3_withdrawFromContract()
    myBalance = await TDToken.balanceOf(accounts[0])
    console.log("my balance " + myBalance)
    await Evaluator.ex6_depositTokens()
    myBalance = await TDToken.balanceOf(accounts[0])
    console.log("my balance " + myBalance)
    await Evaluator.ex7_createERC20()
    myBalance = await TDToken.balanceOf(accounts[0])
    console.log("my balance " + myBalance)
}
async function deployRecap(deployer, network, accounts) {
	console.log("TDToken " + TDToken.address)
	console.log("ClaimableToken " + ClaimableToken.address)
	console.log("Evaluator " + Evaluator.address)
	console.log("ExerciceSolution " + mySolution.address)
}


