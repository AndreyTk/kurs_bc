/*
    Згенерую 5 токенів.
    Передам два рази по 2 і один раз по 1
    Потім спалю 4 + 1
 */

const truffleAssert = require('truffle-assertions');
//const web3ToHex = web3.utils.toHex;

var ANTToken = artifacts.require("ANTToken");

const TOKEN_NAME = "ANTCoin";
const TOKEN_SYMBOL = "ANT";
const TOKEN_DECIMALS = 8;
//const TOKEN_SUPPLY = 9800000; // for less 16
const TOKEN_SUPPLY = 0; // for less 17

const LARGE_AMOUNT= 10*10**TOKEN_DECIMALS;
const MEDIUM_AMOUNT = 5*10**TOKEN_DECIMALS;
const SMALL_AMOUNT = 2*10**TOKEN_DECIMALS;
const MINIMAL_AMOUNT = 1*10**TOKEN_DECIMALS;

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
    var account3 = accounts[2];

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

    it("Zero token on accounts.",async()=> {
        let balance1 = await antToken.balanceOf(account1);
        let balance2 = await antToken.balanceOf(account2);
        assert.equal(balance1, 0, "Error balance tokens for acc1");
        assert.equal(balance2, 0, "Error balance tokens for acc2");
    });

    it("Mint token on Acc1.",async()=> {
        let addres = account1;
        let startBalance = toNumber(await antToken.balanceOf(addres));

        await antToken.mint(addres, MEDIUM_AMOUNT);

        let endBalance = toNumber(await antToken.balanceOf(addres));

        assert.equal(startBalance + MEDIUM_AMOUNT, endBalance, "Error mint 2 tokens for Acc1");
    });

    it("Transfer SMALL_AMOUNT token from Acc1 to Acc2.",async()=> {
        let startAcc1Balance = toNumber(await antToken.balanceOf(account1));
        let startAcc2Balance = toNumber(await antToken.balanceOf(account2));

        await antToken.transfer(account2, SMALL_AMOUNT, {from:account1});

        let endAcc1Balance = toNumber(await antToken.balanceOf(account1));
        let endAcc2Balance = toNumber(await antToken.balanceOf(account2));

        assert.equal(endAcc1Balance + SMALL_AMOUNT, startAcc1Balance, "Acc1 balance not change");
        assert.equal(endAcc2Balance - SMALL_AMOUNT, startAcc2Balance, "Acc2 balance not change");
    });

    it("Approve - Allowance",async()=> {
        await antToken.approve(account2, SMALL_AMOUNT);
        let result = await antToken.allowance(account1, account2);

        assert.equal(result, SMALL_AMOUNT, "Allowance not corect");
    });

    it("TranferFrom",async()=> {
        await antToken.approve(account1, SMALL_AMOUNT);
        await antToken.allowance(account1, account2);

        let startAcc1Balance = toNumber(await antToken.balanceOf(account1));
        let startAcc2Balance = toNumber(await antToken.balanceOf(account2));

        await antToken.transferFrom(account1, account2, SMALL_AMOUNT);

        let endAcc1Balance = toNumber(await antToken.balanceOf(account1));
        let endAcc2Balance = toNumber(await antToken.balanceOf(account2));

        assert.equal(endAcc1Balance + SMALL_AMOUNT, startAcc1Balance, "Acc1 balance not change");
        assert.equal(endAcc2Balance - SMALL_AMOUNT, startAcc2Balance, "Acc2 balance not change");
    });

    it("Minimal TranferFrom",async()=> {
        await antToken.approve(account1, MINIMAL_AMOUNT);
        await antToken.allowance(account1, account3);

        /*try{
            await antToken.transferFrom(account1, account3, SMALL_AMOUNT)
        } catch (e) {
            console.log('\x1b[32m%s\x1b[0m',"Cann not transfer more that MINIMAL_AMOUNT: "+MINIMAL_AMOUNT);
        }*/
        await truffleAssert.reverts(
            antToken.transferFrom(account1, account3, SMALL_AMOUNT),
            "Custom error (could not decode)"
        );

        await antToken.transferFrom(account1, account3, MINIMAL_AMOUNT);

        let startAcc3Balance = toNumber(await antToken.balanceOf(account3));

        assert.equal(startAcc3Balance, MINIMAL_AMOUNT, "Acc3 balance not change");
    });

    it("Burn 1 for Acc3",async()=> {
        await antToken.burn(MINIMAL_AMOUNT, {from: account3});

        let endAcc3Balance = toNumber(await antToken.balanceOf(account3));
        assert.equal(endAcc3Balance, 0, "Acc3 not burned");
    });

    it("Burn 4 for Acc2",async()=> {
        await antToken.burn(SMALL_AMOUNT * 2, {from: account2});

        let endAcc2Balance = toNumber(await antToken.balanceOf(account2));
        assert.equal(endAcc2Balance, 0, "Acc2 not burned");
    });

    it("Check supply after burn",async()=> {
        let value = await antToken.totalSupply();

        assert.equal(value, 0, "Supply is not correct");
    });

    it("Check owner",async()=> {
        let value = await antToken.owner();

        assert.equal(value, account1, "Owner is not correct");
    });

    it("Only owner cann mint",async()=> {
        await truffleAssert.reverts(
            antToken.mint(account2, MEDIUM_AMOUNT, {from: account2}),
            "Custom error (could not decode)"
        );
    });

    it("Mint more then cap",async()=> {
        let cap = toNumber(await antToken.cap());

        await truffleAssert.reverts(
            antToken.mint(account1, cap+1),
            "Custom error (could not decode)"
        );
    });
});