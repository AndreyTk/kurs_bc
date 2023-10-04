//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

/**
 * @title Contact
 * @dev Lesson 8
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract Contact{
    string _name;

    constructor(string memory name) {
        _name = name;
    }

    function getName() view public returns(string memory){
        return _name;
    }

    function reply() view public returns(string memory){
        return string.concat(_name, " on call!");
    }
}

/**
 * @title ContactBook
 * @dev Lesson 8
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract ContactBook{
    address[] public _contacts;

    function addContact(string memory name) public {
		Contact newContact = new Contact(name);
        _contacts.push(address(newContact));
	}

    function callContact(uint256 index) view public returns(string memory){
        Contact newContact = Contact(_contacts[index]);
        return newContact.reply();
    }

    function getContact(uint256 index) view public returns(address){
        return _contacts[index];
    }
}