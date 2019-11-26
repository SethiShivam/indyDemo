
var wallet = require('../util/wallet')
var indy = require("indy-sdk")


async function onboarding(poolHandle, senderWalletHandle,  targetWalletHandler) {
    //console.log(`\"${From}\" > Create and store in Wallet \"${From} ${to}\" DID`);

        let senderDID =await indy.getMyDidWithMeta(senderWalletHandle)
        console.log("senderDID is ------------------>",senderDID)
        let senderVerKey = await indy.keyForDid(poolHandle, senderWalletHandle, senderDID); 

        let targetDID =await indy.getMyDidWithMeta(targetWalletHandler)
        console.log("targetDID is ------------------>",targetDID)
    let targetVerKey  = await indy.keyForDid(poolHandle, targetWalletHandler, targetDID); 
    // // ################ getting Steward DID and Verykey 
    // let [fromToDid, fromToKey] = await indy.createAndStoreMyDid(senderWalletHandle, {});




    // // from : refers to steward , to refers to governemnt 

    // console.log(`\"${From}\" > Send Nym to Ledger for \"${From} ${to}\" DID`);
    // // Here  steward is sending NYM to ledger for STEWARD-government DID
    // await sendNym(poolHandle, senderWalletHandle, senderDID, fromToDid, fromToKey, null);

    // console.log(`\"${From}\" > Send connection request to ${to} Government with \"${From} ${to} Government\" DID and nonce`);
    //     // Here  steward iSend connection request to Government with  STEWARD-government DID

    //        //toFrom DID = govenment DID
    // // toFromVerkey = governmentVerkey 

    // //fromToDID = steward did
    // //fromToVerkey = steward verkey 
    // let connectionRequest = {
    //     did: fromToDid,  //steward did
    //     nonce: 123456789
    // };


    // if (!targetWalletHandler) {
    //     console.log(`\"${to}\" > Create wallet"`);
    //     try {
    //         await indy.createWallet(targetWalletHandlerConfig, targetWalletHandlerCredentials) // to = government 
    //     } catch(e) {
    //         if(e.message !== "WalletAlreadyExistsError") {
    //             throw e;
    //         }
    //     }
    //     targetWalletHandler = await indy.openWallet(targetWalletHandlerConfig, targetWalletHandlerCredentials); //government wallet opened
    // }

    // console.log(`\"${to}\" > Create and store in Wallet \"${to} ${From}\" DID`);
    // let [tosenderDID, toFromKey] = await indy.createAndStoreMyDid(targetWalletHandler, {});  //getting government did and verkey 


 
    // console.log(`\"${to}\" > Get key for did from \"${From}\" connection request`);


    // here governemnt is getting verkey of steward 
    // before sending request to governement  ...steward is getting verify Key for the governement 
    


  return   await wallet.sendNym(poolHandle, senderWalletHandle, senderDID, targetDID, targetVerKey, "TRUST_ANCHOR");
    
   
    //targetWalletHandler =  wallet of government means jo wallet request kar raaha ha verkey
    //did  yaha pe steward did ki verykey ke liye government requet kar rhi hi so that wo usko connecction req bhej sake 
    // now government apni did and apni verkey se ek connection response bana rhi hai


// finally got key for government . now we can connect with steward 
    // console.log(`\"${to}\"steward verkey > Anoncrypt connection response for \"${From}\" with \"${to} ${From}\" DID, verkey and nonce`);
    // let connectionResponse = JSON.stringify({
    //     'did': tosenderDID,  //goivernment ki did
    //     'verkey': toFromKey,  // government ki verKey
    //     'nonce': connectionRequest['nonce']  //nounce 
    // });

    // Here government is sending connection to steward 
//connnection response ban gya ab government usko encrypt kar rahi hai 
// ab connection response ko encrypy karana hai government ke verKey ke saath 
// means government ne isko steward ki public key se encrypt kar diya so that
// steward isko apni private key se hi khol sake 

//     let anoncryptedConnectionResponse = await indy.cryptoAnonCrypt(fromToVerkey, Buffer.from(connectionResponse, 'utf8'));
//                                 // government yaha message bhej rhi hai steward ko 
                                
//     console.log(`\"${to}\" > Send anoncrypted connection response to \"${From}\"`);

//     console.log(`\"${From}\" > Anondecrypt connection response from \"${to}\"`);

//     // ab ye oisko decrypt karega with fgovernemnt ki public key and apne wallet ko use kar ke (private key)
//     let decryptedConnectionResponse = JSON.parse(Buffer.from(await indy.cryptoAnonDecrypt(senderWalletHandle, fromToKey, anoncryptedConnectionResponse)));
// //

// agar nounces match hue to means phishing nahi hai 
// otherwise phishing hai 

    // console.log(`\"${From}\" > Authenticates \"${to}\" by comparision of Nonce`);
    // if (connectionRequest['nonce'] !== decryptedConnectionResponse['nonce']) {
    //     throw Error("nonces don't match!");
    // }

    console.log(`\"${From}\" > Send Nym to Ledger for \"${to} ${From}\" DID`);
    await sendNym(poolHandle, senderWalletHandle, senderDID, decryptedConnectionResponse['did'], decryptedConnectionResponse['verkey'], null);

    return [targetWalletHandler, fromToKey, tosenderDID, toFromKey, decryptedConnectionResponse];
    // fromToKey = steward ver Key , targetWalletHandler = government wallet , tosenderDID= government ki did ,  toFromKey = government ki key 
    // decryptedConnectionResponse = jo message aya decrypt form me 
}


module.export = {
    onboarding
}