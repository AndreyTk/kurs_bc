const truffleAssert = require('truffle-assertions');
const web3ToHex = web3.utils.toHex;

var ANTToken = artifacts.require("ANTToken");

const TOKEN_NAME = "ANTCoin";
const TOKEN_SYMBOL = "ANT";
const TOKEN_DECIMALS = 8;
//const TOKEN_SUPPLY = 9800000; // for less 16
const TOKEN_SUPPLY = 0; // for less 17

const LARGE_AMOUNT= 10*10**TOKEN_DECIMALS;
const MEDIUM_AMOUNT = 5*10**TOKEN_DECIMALS;
const SMALL_AMOUNT = 2*10**TOKEN_DECIMALS;

let antToken;

function toString(number){
    return number.toString();
}
function toNumber(string){
    return Number(string.toString());
}

contract("ANTCoin", async(accounts)=>{
    var account1 = accounts[0]; // first account
    var account2 = accounts[1]; // second account, if exists

    it("ANTCoin is deployed.",async()=> {
        antToken = await ANTToken.deployed();

        assert.notEqual(antToken, undefined, "ANTCoin is not deployed");
    });

    it(TOKEN_NAME + " has name.",async()=> {
        let value = await antToken.name();

        assert.equal(value, TOKEN_NAME, "Name is not correct");
    });

    it(TOKEN_NAME + " has symbol.",async()=> {
        let value = await antToken.symbol();

        assert.equal(value, TOKEN_SYMBOL, "Symbol is not correct");
    });

    it(TOKEN_NAME + " has decimals.",async()=> {
        let value = await antToken.decimals();

        assert.equal(value, TOKEN_DECIMALS, "Decimals is not correct");
    });

    it(TOKEN_NAME + " has supply.",async()=> {
        let value = await antToken.totalSupply();
        let addres = await antToken.address;
        let balance = await antToken.balanceOf(addres);

        assert.equal(value, TOKEN_SUPPLY, "Supply is not correct");
        assert.equal(balance, TOKEN_SUPPLY, "Balance is not correct");
    });

    it("Mint 2 token on contract.",async()=> {
        let addres = await antToken.address;
        let startBalance = toNumber(await antToken.balanceOf(addres));

        await antToken.mint(addres, SMALL_AMOUNT);

        let endBalance = toNumber(await antToken.balanceOf(addres));

        assert.equal(startBalance + SMALL_AMOUNT, endBalance, "Error mint 2 tokens for contract");
    });

    it("Zero token on accounts.",async()=> {
        let balance1 = await antToken.balanceOf(account1);
        let balance2 = await antToken.balanceOf(account2);
        assert.equal(balance1, 0, "Error balance tokens for acc1");
        assert.equal(balance2, 0, "Error balance tokens for acc2");
    });

    /*it("Transfer 1 token to acc1.",async()=> {
        let contractAddres = await antToken.address;
        let startContractBalance = toNumber(await antToken.balanceOf(contractAddres));
        let startAccBalance = toNumber(await antToken.balanceOf(account1));

        //console.log("account1", account1);
        //console.log("contract", contractAddres);
        await antToken.transferFrom(contractAddres, account1, SMALL_AMOUNT, {from:contractAddres});

        let endContractBalance = toNumber(await antToken.balanceOf(contractAddres));
        let endAccBalance = toNumber(await antToken.balanceOf(account1));

        assert.equal(endContractBalance + SMALL_AMOUNT, startContractBalance, "Contract balance not change");
        assert.equal(startAccBalance - SMALL_AMOUNT, endAccBalance, "Acc balance not change");
    });*/
});