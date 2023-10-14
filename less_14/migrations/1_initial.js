/*
1. Виніс деплой контрактів в deployObject
var Farmer = artifacts.require("Farmer");
....

2. Отака конструкція '%s\x1b[32m%s\x1b[0m' дозволяє мені використовувати кольори в консолі
*/

let farmer = null;
let cow = null;
let horse = null;
let wolf = null;
let dog = null;

let globalDeployer;

async function deployObject(contractName, params){
    let object = artifacts.require(contractName);
    let result = null;
    try{
        result = await object.deployed();
    }catch(e){
        await globalDeployer.deploy(object, params.name);
        result = await object.deployed();

        console.log('\x1b[36m%s\x1b[0m', "Object "+contractName+" ("+params.name+")"+" created");
    }

    return result
}

async function addAnimals(animals){
    let count = await farmer.getAnimalsCount();

    if (count > 0){ //farmer.animals.length - не спрацьовує напряму навіть при public - https://docs.soliditylang.org/en/v0.8.4/contracts.html#getter-functions
        return true;
    }
    console.log('\n\x1b[33m%s\x1b[0m', "Links animals");
    for (const animal of animals){
        await farmer.addAnimal(animal.address);
        let animalName = await animal.name();
        console.log('\x1b[36m%s\x1b[0m', "Link ("+animalName+") "+animal.address);
    }
}

async function callAnimals(animals){
    console.log('\n\x1b[33m%s\x1b[0m', "Calls animals");
    for (const animal of animals){
        let result = await farmer.callByAddress(animal.address);
        let type = animal.constructor._json.contractName; //await animal.getName();

        console.log('%s\x1b[32m%s\x1b[0m', "Animal "+"\x1b[36m"+type+"\x1b[0m"+" say ", result);
    }
}

module.exports = async (deployer)=>{
    globalDeployer = deployer; //Щоб добратися до нього в deployObject

    //Create Farmer
    console.log('\x1b[33m%s\x1b[0m', "Create objects");
    farmer = await deployObject("Farmer", {name:""});

    //Create Cow
    cow = await deployObject( "Cow", {name:"Mashka"});

    //Create Horse
    horse = await deployObject( "Horse", {name:"Poni"});

    //Create Wolf
    wolf = await deployObject( "Wolf", {name:"Gray"});

    //Create Dog
    dog = await deployObject( "Dog", {name:"Bobik"});

    //Link animals with Farmer
    await addAnimals([cow, horse, wolf, dog]);
    //let name = await cow.name;
    //console.log(name); //contractName:
    //Call anomals
    await  callAnimals([cow, horse]);

    //Feed
    try{
        await farmer.feedByAddress(wolf.address, "plant");
    }catch(e){
        console.log('\x1b[31m%s\x1b[0m', "Wolf can not eat plant (see error detail):");
        console.log(e);
    }

    let result = await farmer.feedByAddress(wolf.address, "meat");
    console.log('\n\x1b[36m%s\x1b[0m', "Wolf eat: "+result);

    console.log('\n\x1b[32m%s\x1b[0m', "All done!");
}

