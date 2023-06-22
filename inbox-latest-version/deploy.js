require('dotenv').config({ path: __dirname + '/settings.env' });
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');

const { abi, evm } = require('./compile');

const provider = new HDWalletProvider({
    mnemonic: {
        phrase: process.env.ACCOUNT_MNEMONIC,
    },

    providerOrUrl: process.env.INFURA_SEPOLIA_URL,
});

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(abi)
        .deploy({ data: evm.bytecode.object, arguments: ['Hi There!'] })
        .send({ gas: '1000000', from: accounts[0] });
    
    console.log('Contract deployed to', result.options.address);
    provider.engine.stop();
};

deploy();