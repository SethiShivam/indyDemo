const indy = require('indy-sdk');
const assert = require('assert');

async function createWallet(walletName, walletPassword) {

    console.log("Creating Identity Wallet ================>")
    
    let stewardWalletUserName = { 'id': walletName }
    let stewardWalletPassword = { 'key': walletPassword }


    // creating identity Wallet
    try {
        return await indy.createWallet(stewardWalletUserName, stewardWalletPassword)
    } catch (e) {
        if (e.message !== "WalletAlreadyExistsError") {
            throw e;
        }
        console.log("Error : ", e)
    }


}

async function openWallet(walletName, walletPassword) {

    console.log("openWallet ================>")

    let stewardWalletUserName = { 'id': walletName }
    let stewardWalletPassword = { 'key': walletPassword }
    // opening Wallet
      return await indy.openWallet(stewardWalletUserName, stewardWalletPassword).catch(e=>{
          console.log("wallet already Opened")
      });

}



async function createAndStoreDIDInWallet(walletName, walletPassword) {

    let stewardWalletUserName = { 'id': walletName }
    let stewardWalletPassword = { 'key': walletPassword }
    // let stewardDidInfo = {
    //     'seed': '000000000000000000000000Steward1'
    // };
    // opening Wallet
    try {



var walletDetails = await indy.openWallet(stewardWalletUserName, stewardWalletPassword);
 let [did, verKey] = await indy.createAndStoreMyDid(walletDetails,{});
        return [did, verKey,walletDetails]

    } catch (e) {
        console.log("E =================+> \n\n",e)
        }     
    }


  



/**
 * sendNYM : build ,sign and submit request  to create new Trust anchor
 * @param {
 * } poolHandle 
 * @param {*} submitterWallet   //Handle (Number) - wallet handle (created by openWallet)  fromWallet (steward's wallet)
 * @param {*} submitterDid       //submitterDid (steward did)
 * @param {*} targetDid    // targetDid (government did)
 * @param {*} targetVerkey        // target did's verkey (government verkey)
 * @param {*} role             //TRUST_ANCHOR role
 * 
 * Description : Here we are using submitter wallet ,submitter did ,targetDiD and targetVerkey to register targetDID as trust_ANCHOR
 * so that it can publish schema  like hospital wants to submit schema
 * we can get target did using target wallet credentials using openApi  and will be hardcoding submitter's credentials
 */



async function sendNym(poolHandle, submitterWallet, submitterDid, targetDid, targetVerkey, role) {
    console.log("Building Request ------------------------.")
    let nymRequest = await indy.buildNymRequest(submitterDid, targetDid, targetVerkey, null, role);
    console.log("Request successfully build ------------------>")
  return   await indy.signAndSubmitRequest(poolHandle, submitterWallet, submitterDid, nymRequest);
  //signAndSubmitRequest ( poolHandle, wh, submitterDid, request ) 
}


/**
 * 
 * @param {*} walletName  // wallet name
 * @param {*} walletPassword  // wallet paswword or key 
 * @param {*} did  // did to resolve and find verkey
 * 
 * Descripion : this method will resolve did and find verKey of did
 */






async function getVerificationKeyForDID(getWalletDetails,did) {
    console.log("Method: getVerificationKeyForDID =========================>",did)


const poolHandle = await indy.openPoolLedger("local-pool").catch(e=>{
    console.log("error to open pool again and again",e)
})              
console.log("poolHandle --------------->",poolHandle)
     let verKey =  await indy.keyForDid( 3, getWalletDetails, did).catch(e=>{
         console.log("ERror while getting key for did ----->",e)
     })
    // await indy.refreshPoolLedger ( poolHandle ) 
   //  await indy.closePoolLedger ( poolHandle ) 
     return verKey
}   






// /async function getVerinym(poolHandle, From, senderWallet, senderDID, senderVerkey, to, targetWallet, targetDID, targetVerkey, role) 

async function getVerinym(poolHandle, senderWallet, senderDID, senderVerkey, targetWallet, targetDID, targetVerkey, role) {
    let [targetDid, targetKey] = await indy.createAndStoreMyDid(targetWallet, {});

    let didInfoJson = JSON.stringify({
        'did': targetDid,
        'verkey': targetKey
    });
    let authcryptedDidInfo = await indy.cryptoAuthCrypt(targetWallet, targetVerkey, senderVerkey, Buffer.from(didInfoJson, 'utf8'));




    let [senderVerkey, authdecryptedDidInfo] =
        await indy.cryptoAuthDecrypt(senderWallet, senderVerkey, Buffer.from(authcryptedDidInfo));

    let authdecryptedDidInfoJson = JSON.parse(Buffer.from(authdecryptedDidInfo));
    let retrievedVerkey = await indy.keyForDid(poolHandle, senderWallet, targetDID);
    if (senderVerkey !== retrievedVerkey) {
        throw Error("Verkey is not the same");
    }       

    await sendNym(poolHandle, senderWallet, senderDID, authdecryptedDidInfoJson['did'], authdecryptedDidInfoJson['verkey'], role);

    return targetDid
}

//getMyDidWithMeta



async function listMyDidsWithMeta(senderWalletHandle){
    return await indy.listMyDidsWithMeta(senderWalletHandle);

}



async function searchCredInWallet(subjectWalletHandler,decryptedProofRequestMessageJson,){

    let searchCredInWalletResponse = await indy.proverSearchCredentialsForProofReq(subjectWalletHandler, decryptedProofRequestMessageJson, null)
return searchCredInWalletResponse
}

async function fetchCredentialsFromWallet(searchCredInWalletResponse){

    //['Medication','Timing','Strength','Frequency','Form','Duration','Dosage'])
    credentials = await indy.proverFetchCredentialsForProofReq(searchCredInWalletResponse, 'attr1_referent', 100)
    credForAttr1 = credentials[0]['cred_info'];
    credForAttr2 = credentials[1]['cred_info'];
    credForAttr3 = credentials[2]['cred_info'];
    credForAttr4 = credentials[3]['cred_info'];
    credForAttr5 = credentials[4]['cred_info'];
    credForAttr6 = credentials[5]['cred_info'];


    await indy.proverCloseCredentialsSearchForProofReq(searchCredInWalletResponse)


    let medicalPrescriptionProof = {};
    medicalPrescriptionProof[`${credForAttr1['referent']}`] = credForAttr1;
    medicalPrescriptionProof[`${credForAttr2['referent']}`] = credForAttr2;
    medicalPrescriptionProof[`${credForAttr3['referent']}`] = credForAttr3;
    medicalPrescriptionProof[`${credForAttr4['referent']}`] = credForAttr4;
    medicalPrescriptionProof[`${credForAttr5['referent']}`] = credForAttr5;
    medicalPrescriptionProof[`${credForAttr6['referent']}`] = credForAttr6;

    return medicalPrescriptionProof
}



// let jobApplicationRequestedCredsJson = {
//     'self_attested_attributes': {
//         'attr1_referent': 'Alice',
//         'attr2_referent': 'Garcia',
//         'attr6_referent': '123-45-6789'
//     },
//     'requested_attributes': {
//         'attr3_referent': {'cred_id': credForAttr3['referent'], 'revealed': true},
//         'attr4_referent': {'cred_id': credForAttr4['referent'], 'revealed': true},
//         'attr5_referent': {'cred_id': credForAttr5['referent'], 'revealed': true},
//     },
//     'requested_predicates': {'predicate1_referent': {'cred_id': credForPredicate1['referent']}}
// };


// above is the JSON format of proof we will be creating after fetching all the data from wallet
async function createProofForVerifier(subjectWallethandle,proofRequestJson,jsonOfProofCreated,subjectMasterSecretId,schemasJson,credDefsJson, revocStatesJson){

// jsonOfProofCreated we will get this by fetching all the required data from wallet and creating a json format as mentioned above
    //proofRequestJson  we will get this after using anoncred method to decrypt the message and get json 
    //alice master secret 
    let medicalPrescriptionProof = await indy.proverCreateProof(subjectWallethandle, proofRequestJson,
        jsonOfProofCreated , subjectMasterSecretId,
        schemasJson, credDefsJson, revocStatesJson);
return medicalPrescriptionProof
}

//    let [stewardDid, stewardKey] = await indy.createAndStoreMyDid(stewardWallet, {stewardDidInfo});s

// ############## CREATE WALLET TESTING ################################


//createWallet("testOrg_wallet","testOrg123","010101010")


// ############## OPEN-WALLET TESTING ################################


//openWallet("test_wallet","test123")

// ############## CREATE & STORE DID IN WALLET TESTING ################################



//createAndStoreDIDInWallet("testOrg_wallet","testOrg123")
//"org_wallet","org123"


// ############## getVerificationKeyForDID TESTING ################################


 //getVerificationKeyForDID(  "org_wallet","org123", 'AXWDp7Pc43Vk1H1kbfMFah')
module.exports = {
    createWallet,
    openWallet,
    createAndStoreDIDInWallet,
    sendNym,
    getVerificationKeyForDID,
    getVerinym,
    listMyDidsWithMeta ,
    searchCredInWallet ,
    fetchCredentialsFromWallet,
    createProofForVerifier
}

