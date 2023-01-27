pragma solidity ^0.6.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./IExerciceSolution.sol";
import "./ERC20Claimable.sol";
import "./ExerciceSolutionToken.sol";

contract ExerciceSolution is IExerciceSolution {

    mapping(address => uint256) public balances;
    ERC20Claimable claimableERC20;
    ExerciceSolutionToken minter;

    constructor(ERC20Claimable _claimableERC20, ExerciceSolutionToken _minter) public{
       claimableERC20 = _claimableERC20;
        minter = _minter;
       minter.setMinter(address(this), true);
    }

	function claimTokensOnBehalf() override external{
        balances[msg.sender] += claimableERC20.claimTokens();
    }

	function tokensInCustody(address callerAddress) external override returns (uint256){

        return balances[callerAddress];
    }

	function withdrawTokens(uint256 amountToWithdraw) external override returns (uint256){
        balances[msg.sender] -= amountToWithdraw;
        claimableERC20.transfer(msg.sender, amountToWithdraw);
        return amountToWithdraw;
    }

	function depositTokens(uint256 amountToWithdraw) external override returns (uint256){
        claimableERC20.transferFrom(msg.sender, address(this), amountToWithdraw);
        balances[msg.sender] += amountToWithdraw;   
        return amountToWithdraw;
    }

	function getERC20DepositAddress() external override returns (address){
        return address(this);
    }
}
