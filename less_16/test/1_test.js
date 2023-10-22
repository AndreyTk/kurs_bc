const truffleAssert = require('truffle-assertions');

var ANTToken = artifacts.require("ANTToken");

const TOKEN_NAME = "ANTToken";
const TOKEN_SYMBOL = "ANT";
const TOKEN_DECIMALS = 8;
const TOKEN_SUPPLY = 9800000;

let antToken;

contract("ANTToken", async(accounts)=>{
    it("Farmer is deployed.",async()=> {
        antToken = await ANTToken.deployed();

        assert.notEqual(antToken, undefined, "ANTToken is not deployed");
    });

    it(TOKEN_NAME + " has name.",async()=> {
        let value = await antToken.name;

        assert(value, TOKEN_NAME, "Name is not correct");
    });

    it(TOKEN_NAME + " has symbol.",async()=> {
        let value = await antToken.symbol;

        assert(value, TOKEN_SYMBOL, "Symbol is not correct");
    });

    it(TOKEN_NAME + " has decimals.",async()=> {
        let value = await antToken.decimals;

        assert(value, TOKEN_DECIMALS, "Decimals is not correct");
    });

    it(TOKEN_NAME + " has supply.",async()=> {
        let value = await antToken.totalSupply;
        let addres = await antToken.address;
        let balance = await antToken.balanceOf(addres);

        assert(value, TOKEN_SUPPLY, "Supply is not correct");
        assert(balance, TOKEN_SUPPLY, "Balance is not correct");
    });
});