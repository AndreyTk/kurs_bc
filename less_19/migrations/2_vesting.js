function toNumber(string){
    return Number(string.toString());
}

module.exports = async (deployer, network, accounts)=>{
    let vesting = artifacts.require("ANTTokenVesting");

    let token = artifacts.require("ANTToken");
    token = await token.deployed();

    let account1 = accounts[0];
    let beneficiary = accounts[1]; // second account, if exists

    const currentDate = new Date();
    //const timestamp = parseInt(currentDate.getTime() / 1000);
    const MONTH = 60*60*24*30;
    const timestamp = MONTH*7; //7 Month

    await deployer.deploy(
        vesting,//[beneficiary, timestamp, 60*60*24*30*7],
        {overwrite: false}
    );
    vesting = await vesting.deployed();

    let balance =  toNumber(await token.balanceOf(vesting.address));
    if (balance == 0) {
        await token.transfer(vesting.address, 9800000/100, {from:account1}); //1%
    }

    let startTime = toNumber(await vesting.start());

    let vesting1month = await vesting.methods["vestedAmount(address,uint64)"](token.address, startTime + MONTH*1);
    let vesting6month = await vesting.methods["vestedAmount(address,uint64)"](token.address, startTime + MONTH*6);
    let vesting7month = await vesting.methods["vestedAmount(address,uint64)"](token.address, startTime + MONTH*7);

    console.log('\x1b[36m%s\x1b[0m', "After 1 Month: "+ vesting1month);
    console.log('\x1b[36m%s\x1b[0m', "After 6 Month: "+ vesting6month);
    console.log('\x1b[36m%s\x1b[0m', "After End: "+ vesting7month);
}