const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'inbox.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};

// console.log(JSON.parse(solc.compile(JSON.stringify(input))).contracts['inbox.sol']);

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts['inbox.sol'].Inbox;