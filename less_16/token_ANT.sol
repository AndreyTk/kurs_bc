// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v5.0.0) (token/ERC20/ERC20.sol)

pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ANTToken is ERC20{
    uint8 constant DECIMALS=8;
    uint constant SUPPLY = 9800000;
    
    constructor() ERC20("ANTCoin", "ANT"){
        uint256 _supply = SUPPLY*10**DECIMALS;
        _mint(msg.sender,_supply);
    }

    function decimals() public override pure returns (uint8) {
        return DECIMALS;
    }
}