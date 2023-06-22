const assert = require('assert');
const ganache = require('ganache-cli');
const { Web3 } = require('web3');
const { interface, bytecode } = require('../compile');

const web3 = new Web3(ganache.provider());

const INITIAL_MSG = 'Hi There!'

// class Car {
//     park() {
//         return 'stopped';
//     }

//     drive() {
//         return 'vroom';
//     }
// }

// let car;

// beforeEach(() => {
//     car = new Car();
// })

// describe('Car', () => {
//     it('can park', () => {
//         assert.equal(car.park(), 'stopped');
//     });

//     it('can drive', () => {
//         assert.equal(car.drive(), 'vroom');
//     });
// });


// beforeEach(() => {
//     // get a list of all accounts
//     web3.eth.getAccounts().then(fetchedAccounts => {
//             console.log(fetchedAccounts);
//         });

//     // use one of those accounts to deploy the contract

// });

let accounts;

beforeEach(async () => {
    // get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [INITIAL_MSG] })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
        // console.log(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_MSG);
    });

    it('can change the message', async () => {
        const newMessageString = "Message Updated!";
        await inbox.methods.setMessage(newMessageString).send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, newMessageString);
    });
});