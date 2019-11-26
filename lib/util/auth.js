const indy = require('indy-sdk');
const assert = require('assert');
const wallet = require('./wallet')



/**
 * 
 * @param {*} walletName  // wallet username
 * @param {*} walletPassword  // wallet password/
 * @param {*} did  // target did 
 * 
 * Description : to encrypt message using target did's verification key 
 */



async function encryptMessage(walletName, walletPassword, targetDid) {
    console.log("Method: encryptMessage ===============")
    let [walletDID, walletVerKey, senderWalletDetails] = await wallet.createAndStoreDIDInWallet(walletName, walletPassword)   
   
    let targetDIDVerkey = await wallet.getVerificationKeyForDID(senderWalletDetails, targetDid)
   
//console.log("getVerificationKeyForDID : response \n",targetDIDVerkey    )

    let connectionResponse = JSON.stringify({
        'did': walletDID,                       //goivernment ki did
        'verkey': walletVerKey,                  // government ki verKey
        'nonce': 123456789                      //nounce 
    });

    console.log("\n\n\n\n\n" ,connectionResponse)
 
    let encryptedMessage = await indy.cryptoAnonCrypt(targetDIDVerkey  , Buffer.from(connectionResponse, 'utf8'));
   [decryptionResponse,stewardWalletDetails] = await decryptMessage(targetDIDVerkey, encryptedMessage)
  decryptionResponse = JSON.stringify(decryptionResponse)
  connectionResponse = JSON.parse(connectionResponse)
  decryptionResponse = JSON.parse(decryptionResponse)
  console.log("___________________________________________________________________--",connectionResponse['did'])
    if (connectionResponse['nonce'] !== decryptionResponse['nonce']) {
        throw Error("nonces don't match!");
    }

    await wallet.sendNym(3, stewardWalletDetails, targetDid, decryptionResponse['did'], decryptionResponse['verkey'], null);
    if (decryptionResponse['verkey'] !== connectionResponse['verkey']) {
        throw Error("Verkey is not the same");
    }    
    await wallet.sendNym(3, stewardWalletDetails, targetDid, decryptionResponse['did'], decryptionResponse['verkey'], 'TRUST_ANCHOR');
    
    return [senderWalletDetails, targetDIDVerkey, walletDID, walletVerKey, decryptionResponse];
}



async function encryptMessage(senderWallet,senderVerKey,subjectVerKey,requestJson){


    let encryptedMessage = await indy.cryptoAuthCrypt(senderWallet, senderVerKey,subjectVerKey, Buffer.from(JSON.stringify(requestJson),'utf8'));

        return encryptedMessage
}


// async function decryptMessage(senderWallet,subjectVerKey,encryptedMessage){

//     let decryptedResponseJson;
//    return  [subjectVerKey, decryptedResponseJson] = 
//     await authDecrypt(senderWallet, subjectVerKey, encryptedMessage);
// }

/**
 * 
 * @param {*} walletName  // wallet username
 * @param {*} walletPassword  // wallet password/
 * @param {*} senderDID  // senderDID did 
 * @param {*} encryptMessage  // encryptedMessage
 * 
 * Description : to encrypt message using target did's verification key 
 */
async function decryptMessage(targetDIDVerkey, encryptMessage) {

    let targetWalletDetails = await wallet.openWallet("steward_wallet","steward123")
        console.log("targetWalletDetails==============>",targetWalletDetails)
  //  var did =    await indy.listMyDidsWithMeta(targetWalletDetails)
   // console.log("\n\n\n DID----------------------> \n\n\n",did)
    // let connectionResponse = JSON.stringify({
    //     'did': walletDID,  //goivernment ki did
    //     'verkey': walletVerKey,  // government ki verKey
    //     'nonce': 123456789  //nounce 
    // });

    let jsonData =  JSON.parse(Buffer.from(await indy.cryptoAnonDecrypt(targetWalletDetails, targetDIDVerkey, encryptMessage)));
   // walletDetails = await indy.closeWallet(targetWalletDetails)
    return [jsonData,targetWalletDetails]
}


async function registerAsTrustedClient(){



}

//encryptMessage("testOrg_wallet","testOrg123",'Th7MpTaRZVRYnPiabds81Y')
module.exports = {
    encryptMessage,
    decryptMessage
}