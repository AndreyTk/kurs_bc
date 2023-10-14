//SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

abstract contract Animal{
    string public name;

    constructor(string memory _name){
        name = _name;
    }

    function eat(string calldata _food) virtual view public returns(string memory){
        return "Animals eats";
    }

    function speak() virtual view public returns (string memory){
        return "Animal speaks";
    }

    function compare(string memory str1, string memory str2) public pure returns (bool) {
        return keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2));
    }

    function sleep() virtual view public returns (string memory){
        return "Z-z-z...";
    }

}

abstract contract Herbivore is Animal{
    string canEat = "plant";

    function eat(string calldata _food) override virtual view public returns(string memory){
        require(Animal.compare(_food,canEat), string.concat("Herbivore cannot eat ", _food));
        return string.concat("Non-nom ", _food);
    }
}

abstract contract Carnivore is Animal{
    string canEat = "meat";

    function eat(string calldata _food) override virtual view public returns(string memory){
        require(Animal.compare(_food,canEat), string.concat("Carnivore cannot eat ", _food));
        return string.concat("Non-nom ", _food);
    }
}

abstract contract Omnivore is Animal{
    function eat(string calldata _food) override virtual view public returns(string memory){
        if (Animal.compare(_food, "plant") || Animal.compare(_food, "meat")){
            return string.concat("Non-nom ", _food);
        }
        revert(string.concat("Omnivore cannot eat ", _food));
    }
}

contract Horse is Herbivore{
    constructor(string memory _name) Animal(_name){
    }

    function speak() override pure public returns (string memory){
        return "Igogo";
    }
}

contract Cow is Herbivore{
    constructor(string memory _name) Animal(_name){
    }

    function speak() override pure public returns (string memory){
        return "Mooo";
    }
}

contract Wolf is Carnivore{
    constructor(string memory _name) Animal(_name){
    }

    function speak() override pure public returns (string memory){
        return "Awoo";
    }
}

contract Dog is Omnivore{
    constructor(string memory _name) Animal(_name){
    }

    function eat(string calldata _food) view override public  returns(string memory){
        require(!Animal.compare(_food,"chocolate"),"Dogs cannot eat chocolate!");

        return Omnivore.eat(_food);
    }

    function speak() override pure public returns (string memory){
        return "Woof";
    }
}

contract Pig is Omnivore{
    constructor(string memory _name) Animal(_name){
    }

    function speak() override pure public returns (string memory){
        return "HruuHruu";
    }
}

contract Farmer {

    address[] animals;

    function addAnimal(address animalAddress) public {
        animals.push(animalAddress);
    }

    function getAnimal(uint256 index) view public returns(Animal){
        return Animal(animals[index]);
    }

    function feedByIndex(uint256 index, string calldata food) view public returns(string memory){
        return getAnimal(index).eat(food);
    }

    function callByIndex(uint256 index) view public returns(string memory){
        return getAnimal(index).speak();
    }

    function feedByAddress(address animal, string calldata food) view public returns(string memory){
        return Animal(animal).eat(food);
    }

    function callByAddress(address animal) view public returns(string memory){
        return Animal(animal).speak();
    }

    function getAnimalsCount() view public returns (uint){
        return animals.length;
    }
}