const truffleAssert = require('truffle-assertions');

var Farmer = artifacts.require("Farmer");
var Dog = artifacts.require("Dog");
var Horse = artifacts.require("Horse");

let farmer;
let horse;
let dog;

const HORSE_NAME = "Poni";
const ANIMAL_SLEEP = "Z-z-z...";
const ANIMAL_CANEAT = "Non-nom ";
const ANIMAL_H_CAN_NOT_EAT = "Herbivore cannot eat ";
const EAT_PLANT = "plant";
const EAT_MEAT = "meat";
const EAT_CHOCOLATE = "chocolate";
const EAT_NOT_FOOD = "not-food";
const EAT_PLACTIC = "plastic";
const HORSE_CALL = "Igogo";
const DOG_NAME = "Bobik";
const DOG_CALL = "Woof";

const HORSE_INDEX = 1; //Задеплоїний другим по черзі
const DOG_INDEX = 3;

contract("Farmer", async(accounts)=>{
    it("Farmer is deployed.",async()=> {
        farmer = await Farmer.deployed();

        assert.notEqual(farmer, undefined, "Farmer is not deployed");
    });

    it("Farmer has linked animals.",async()=> {
        let animalCount = await farmer.getAnimalsCount();

        assert(animalCount > 0, "Animal is not linked");
    });

    it("Horse is deployed.",async()=> {
        horse = await Horse.deployed();

        assert.notEqual(horse, undefined, "Horse is not deployed");
    });

    it("Horse has index 1 in the farmer.",async()=> {
        let horseAddress = await farmer.getAnimal(HORSE_INDEX);

        assert.equal(horse.address, horseAddress, "Horse has other index than 1");
    });

    it("Dog is deployed.",async()=> {
        dog = await Dog.deployed();

        assert.notEqual(dog, undefined, "Dog is not deployed");
    });

    it("Dog has index 3 in the farmer.",async()=> {
        let dogAddress = await farmer.getAnimal(DOG_INDEX);

        assert.equal(dog.address, dogAddress, "Dog has other index than 3");
    });
});

contract("Horse", async(accounts)=>{
    it("Horse has the correct name.",async()=>{
        let horseName = await horse.name();

        assert.equal(horseName, HORSE_NAME, "Horse name is not correct");
    });

    it("Horse can sleep.",async()=>{
        let horseSleep = await horse.sleep();

        assert.equal(horseSleep, ANIMAL_SLEEP, "Horse is not correct Sleep");
    });

    it("Horse can eat 'plant'.",async()=>{
        let horseCanEat = await horse.eat(EAT_PLANT);

        assert.equal(horseCanEat, ANIMAL_CANEAT+EAT_PLANT, "Horse is not eat "+EAT_PLANT);
    });

    it("Horse cannot eat 'meat', 'not-food', 'plastic'.",async()=>{
        //Використав бібліотеку require('truffle-assertions') щоб відловити екзепшени
        await truffleAssert.reverts(
            horse.eat(EAT_MEAT),
            "Herbivore cannot eat " + EAT_MEAT
        );

        await truffleAssert.reverts(
            horse.eat(EAT_NOT_FOOD),
            "Herbivore cannot eat " + EAT_NOT_FOOD
        );

        await truffleAssert.reverts(
            horse.eat(EAT_PLACTIC),
            "Herbivore cannot eat " + EAT_PLACTIC
        );
    });

    it("Farmer can call Horse, Horse responds correctly",async()=>{
        let farmerCallHorse = await farmer.callByAddress(horse.address);

        assert.equal(farmerCallHorse, HORSE_CALL, "Horse speak other");
    });

    it("Farmer can feed Horse with plant",async()=>{
        let horseCanEat = await farmer.feedByAddress(horse.address, EAT_PLANT);

        assert.equal(horseCanEat, ANIMAL_CANEAT+EAT_PLANT, "Horse is not eat "+EAT_PLANT);
    });

    it("Farmer cannot feed Horse with anything else(”meat”,”plastic”,”fingers”,etc)",async()=>{
        await truffleAssert.reverts(
            farmer.feedByAddress(horse.address, EAT_MEAT),
            "Herbivore cannot eat " + EAT_MEAT
        );

        await truffleAssert.reverts(
            farmer.feedByAddress(horse.address, EAT_NOT_FOOD),
            "Herbivore cannot eat " + EAT_NOT_FOOD
        );

        await truffleAssert.reverts(
            farmer.feedByAddress(horse.address, EAT_PLACTIC),
            "Herbivore cannot eat " + EAT_PLACTIC
        );
    });
});

contract("Dog", async(accounts)=>{
    it("Dog has the correct name.",async()=>{
        let dogName = await dog.name();

        assert.equal(dogName, DOG_NAME, "Horse name is not correct");
    });

    it("Dog can sleep.",async()=>{
        let dogSleep = await dog.sleep();

        assert.equal(dogSleep, ANIMAL_SLEEP, "Dog is not correct Sleep");
    });

    it("Dog can eat 'plant'.",async()=>{
        let dogCanEat = await dog.eat(EAT_PLANT);

        assert.equal(dogCanEat, ANIMAL_CANEAT+EAT_PLANT, "Dog is not eat "+EAT_PLANT);
    });

    it("Dog can eat 'meat'.",async()=>{
        let dogCanEat = await dog.eat(EAT_MEAT);

        assert.equal(dogCanEat, ANIMAL_CANEAT+EAT_MEAT, "Dog is not eat "+EAT_MEAT);
    });

    it("Dog cannot eat ”not-food”, ”plastic”, ”chocolate”.",async()=>{
        await truffleAssert.reverts(
            dog.eat(EAT_NOT_FOOD),
            "Omnivore cannot eat " + EAT_NOT_FOOD
        );

        await truffleAssert.reverts(
            dog.eat(EAT_PLACTIC),
            "Omnivore cannot eat " + EAT_PLACTIC
        );

        await truffleAssert.reverts(
            dog.eat(EAT_CHOCOLATE),
            "Dogs cannot eat chocolate!"
        );
    });

    it("Farmer can call Dog, Dog responds correctly",async()=>{
        let farmerCallDog = await farmer.callByAddress(dog.address);

        assert.equal(farmerCallDog, DOG_CALL, "Dog speak other");
    });

    it("Farmer can feed Dog with ”meat”,”plant”.",async()=>{
        let dogCanEatMeat = await farmer.feedByAddress(dog.address, EAT_MEAT);
        let dogCanEatPlant = await farmer.feedByAddress(dog.address, EAT_PLANT);

        assert.equal(dogCanEatMeat, ANIMAL_CANEAT+EAT_MEAT, "Dog is not eat "+EAT_MEAT);
        assert.equal(dogCanEatPlant, ANIMAL_CANEAT+EAT_PLANT, "Dog is not eat "+EAT_PLANT);
    });

    it("Farmer cannot feed Dog with ”not-food”, ”plastic” and anything else.*",async()=>{
        await truffleAssert.reverts(
            farmer.feedByAddress(dog.address, EAT_NOT_FOOD),
            "Omnivore cannot eat " + EAT_NOT_FOOD
        );

        await truffleAssert.reverts(
            farmer.feedByAddress(dog.address, EAT_PLACTIC),
            "Omnivore cannot eat " + EAT_PLACTIC
        );

        await truffleAssert.reverts(
            farmer.feedByAddress(dog.address, "Fuel"),
            "Omnivore cannot eat Fuel"
        );
    });
});