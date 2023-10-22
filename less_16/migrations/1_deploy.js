module.exports = async (deployer)=>{
    let contract = artifacts.require("ANTToken");
    let result = null;
    try{
        result = await contract.deployed();
    }catch(e){
        await deployer.deploy(contract);
        result = await contract.deployed();

        console.log('\x1b[36m%s\x1b[0m', "Contract created");
    }
}
