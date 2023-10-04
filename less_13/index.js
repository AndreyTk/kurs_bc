'use strict'
// clear console - cls
const { Web3 } = require("web3");

const web3 = new Web3('http://127.0.0.1:7545');

let contactBookAbi = require("./contactBookAbi.js");

let contactBookAddress = "0x013F32170e2C4153FD682df31323E8880B558c24";

function main(){
    let contract = new web3.eth.Contract(contactBookAbi,contactBookAddress);
    let contactIndex = 0

    new Promise((resolve) => {
        resolve(contract.methods.getContact(contactIndex).call()
            .then((data)=> {
                console.log("First contact address: " + data);
        }));
    })
    .then(() => {
        return contract.methods.callContact(contactIndex).call()
            .then((data)=> {
                console.log("Call owner class : " + data);
        });
    })
    .then(() => {
        return web3.eth.getAccounts().then((accounts) => {
            return(accounts[0]);
        })
    })
    .then((account)=>{
        console.log("Create new contact from account: " + account);
        let newContactName = "bbbb";
        return contract.methods.addContact(newContactName).send({from:account, gas:1000000})
            .then(()=> {
                console.log("Contact '"+newContactName+"' is added OK.");
        });
    })
    .then(() => {
        return contract.methods.callContact(contactIndex+1).call()
            .then((data)=> {
                console.log("Call contact [1] : " + data);
            });
    })
    .then(()=>{
        console.log("All done.")
    });

}

main();