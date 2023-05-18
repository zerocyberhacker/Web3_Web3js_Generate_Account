import axios from 'axios';
import Web3 from 'web3';
import * as dov from  'dotenv';

dov.config();

// type Unit =
//     | 'noether'
//     | 'wei'
//     | 'kwei'
//     | 'Kwei'
//     | 'babbage'
//     | 'femtoether'
//     | 'mwei'
//     | 'Mwei'
//     | 'lovelace'
//     | 'picoether'
//     | 'gwei'
//     | 'Gwei'
//     | 'shannon'
//     | 'nanoether'
//     | 'nano'
//     | 'szabo'
//     | 'microether'
//     | 'micro'
//     | 'finney'
//     | 'milliether'
//     | 'milli'
//     | 'ether'
//     | 'kether'
//     | 'grand'
//     | 'mether'
//     | 'gether'
//     | 'tether';

// init web3
const web3 = new Web3(`https://mainnet.infura.io/v3/${process.env.MAINNET_INFURA_PROJECT_ID}`);

getData();

async function getData(){
    const privateKey = generatePrivateKey();
    const publicKey = String(web3.eth.accounts.privateKeyToAccount(privateKey).address);
    let result : any ;
    for(let i = 0 ; i < 1 ; i++){
        result = await Wallet(publicKey,privateKey);  
        if(Number(result.eth) == 0 || Number(result.usdt) == 0){
            console.log();
            getData();
        } else {
            return
        }
    }
}

async function Wallet(address: string,privateKey: string) {
    const balance = await web3.eth.getBalance(address);
    const wallet = {
        publickey : address,
        privatekey : privateKey,
        eth : web3.utils.fromWei(balance, 'ether'),
        usdt : web3.utils.fromWei(balance, 'tether')
    } 
    console.log('Public  Key  :',address);
    console.log('Private Key  :',privateKey);
    console.log('Balance ETH  :',web3.utils.fromWei(balance, 'ether'),'ETH');
    console.log('Balance USDT :',web3.utils.fromWei(balance, 'tether'),'USDT');
    return wallet;
}

function generatePrivateKey(){
    let result = "";
    const characters = "ABCDEFabcdef0123456789";
    for (let i = 0; i < 64; i++) {
        result +=  characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
