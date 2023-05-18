import axios from 'axios';
import Web3 from 'web3';
import * as dov from  'dotenv';

dov.config();

// init web3
const web3 = new Web3(`https://mainnet.infura.io/v3/${process.env.MAINNET_INFURA_PROJECT_ID}`);

getData();

async function getData(){
    const privateKey = generatePrivateKey();
    const publicKey = String(web3.eth.accounts.privateKeyToAccount(privateKey).address);
    let result : any = ''; 
    for(let i = 0 ; i < 1 ; i++){
        result = await getBalance(publicKey,privateKey);  
        if(Number(result) == 0){
            console.log();
            getData()
        } else {
            return
        }
    }
}

async function getBalance(address: string,privateKey: string): Promise<string> {
    const balance = await web3.eth.getBalance(address);
    console.log('Public  Key :',address);
    console.log('Private Key  :',privateKey);
    console.log('Balance   :',web3.utils.fromWei(balance, 'ether'),'ETH');
    return String(web3.utils.fromWei(balance, 'ether'));
}

function generatePrivateKey(){
    let result = "";
    const characters = "ABCDEFabcdef0123456789";
    for (let i = 0; i < 64; i++) {
        result +=  characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
