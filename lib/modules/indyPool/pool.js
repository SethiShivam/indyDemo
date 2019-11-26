var indy = require('indy-sdk')
var wallet = require("../../util/wallet")

async function registerSteward(req){



    let stewardWalletConfig = {'id': req.body.userName}
    let stewardWalletCredentials = {'key': req.body.password}
    try {
        await indy.createWallet(stewardWalletConfig, stewardWalletCredentials)
    } catch(e) {
        if(e.message !== "WalletAlreadyExistsError") {
            throw e;
        }   
    }

    let stewardWallet = await indy.openWallet(stewardWalletConfig, stewardWalletCredentials);

    let stewardDidInfo = {
        'seed': '000000000000000000000000Steward1'
    };
    
    let [stewardDid, stewardKey] = await indy.createAndStoreMyDid(stewardWallet, {stewardDidInfo});
    await indy.closeWallet()
    return {"stewardDid" : stewardDid,"stewardVerKey" : stewardKey, "stewardWalletHandle" : stewardWallet}
}




async function connectPool(){
    console.log("Connecting Local Pool ====================>")
    let poolName = 'local-pool'
    
    let poolHandle = await indy.openPoolLedger(poolName);
    console.log("Open Pool Ledger Response --------> \n",poolHandle)
    return {poolHandle}
    }


    async function onboarding(req) {

        //poolHandle, senderWalletHandle,  targetWalletHandler
        //console.log(`\"${From}\" > Create and store in Wallet \"${From} ${to}\" DID`);
        
            let stewardDID =await indy.listMyDidsWithMeta(2).catch(e=>{
                console.log("error :",e)
            })
            console.log("senderDID is ------------------>",stewardDID)
            let stewardVerKey = await indy.keyForDid(req.body.poolHandle, req.body.stewardWalletHandle, stewardDID); 
    
            let targetDID =await indy.listMyDidsWithMeta(req.body.targetWalletHandler)
            console.log("targetDID is ------------------>",targetDID)
        let targetVerKey  = await indy.keyForDid(req.body.poolHandle, req.body.targetWalletHandler, targetDID); 
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
        
    
    
      return   await wallet.sendNym(req.body.poolHandle, senderWalletHandle, stewardDID, targetDID, targetVerKey, "TRUST_ANCHOR");
        
       
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
    
    


    async function openWallet(req){
        let wallentHandle = await wallet.openWallet(req.body.userName, req.body.password).catch(e=>{

            console.log("ERROR :",e)
                    })
        

return {"wallentHandle" : wallentHandle}
    }
module.exports = {registerSteward,connectPool,onboarding,openWallet}