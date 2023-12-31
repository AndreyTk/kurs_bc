// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v5.0.0) (token/ERC20/ERC20.sol)

pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC20Capped} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import {VestingWallet} from "@openzeppelin/contracts/finance/VestingWallet.sol";

contract ANTToken is ERC20Burnable, Ownable, ERC20Capped{
    uint8 constant DECIMALS=8;
    uint constant SUPPLY = 9800000;
     uint256 private immutable _cap = SUPPLY*10**DECIMALS;
    
    constructor() ERC20("ANTCoin", "ANT") Ownable(msg.sender) ERC20Capped(_cap){
        uint256 _supply = SUPPLY*10**DECIMALS;
        _mint(msg.sender,_supply);
    }

    function decimals() public override pure returns (uint8) {
        return DECIMALS;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function _update(address _account, address _to, uint256 value) internal override(ERC20,ERC20Capped){
        super._update(_account,_to,value);
    }
}

contract ANTTokenVesting is VestingWallet {
    /*address beneficiary = 0x76594609F9b5858e6E53c3E5D18b76863dDF8FD3;
    uint64 startTimestamp = uint64(block.timestamp);
    uint64 durationSeconds = uint64(60*60*24*30*7);*/
    address beneficiary;
    uint64 startTimestamp;
    uint64 durationSeconds;

    constructor() VestingWallet(beneficiary, startTimestamp, durationSeconds){

    }
}