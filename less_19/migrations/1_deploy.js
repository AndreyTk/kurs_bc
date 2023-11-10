module.exports = async (deployer, network, accounts)=>{
    let token = artifacts.require("ANTToken");

    await deployer.deploy(token, {overwrite: false});
    //token = await token.deployed();
}
