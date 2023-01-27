pragma solidity ^0.6.0;
import "./IERC20Mintable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ExerciceSolutionToken is ERC20, IERC20Mintable
{
    mapping(address => bool) public minter;

    constructor() public ERC20("ExerciceSolutionToken", "EST") {
        minter[msg.sender] = false;
    }
	function setMinter(address minterAddress, bool isMinter) override external{
        require(minter[msg.sender] == true, "You are not a minter");
        minter[minterAddress] = isMinter;
    }

	function mint(address toAddress, uint256 amount)  override external{
        require(minter[msg.sender] == true, "You are not a minter");
        _mint(toAddress, amount);
    }

	function isMinter(address minterAddress) override external returns (bool){
        if (minter[minterAddress] == true){
            return true;
        }
        else{
            return false;
        }
    }
}