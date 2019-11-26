let wallet = require('./wallet')
let connection = require('./connectPool')
let auth = require('./auth')
let schema = require('./schema')
let indy = require('indy-sdk')


async function issuerCreateAndStoreCredentialDef(issuerWalletHandle,issuerDID,schema){

    let  [medicalPrescriptionDefId, medicalPrescriptionCredDefJson] = await indy.issuerCreateAndStoreCredentialDef(issuerWalletHandle, issuerDID,schema,'TAG1', 'CL', '{"support_revocation": false}');
    return [medicalPrescriptionDefId, medicalPrescriptionCredDefJson]
}

async function sendCredDef(poolHandle, senderWalletHandle, senderDid, credDef) {
    let credDefRequest = await indy.buildCredDefRequest(senderDid, credDef);
return  await indy.signAndSubmitRequest(poolHandle, senderWalletHandle, senderDid, credDefRequest);
}

async function createCredentialOffer(issuerWalletHandle, credDefId){
console.log("createCredentialOffer: ================> \n\n")
let credOffJson = await indy.issuerCreateCredentialOffer(issuerWalletHandle, credDefId);
return credOffJson
}


async function getCredDefenation(poolHandle, senderDid, credDefIds){
// get credDefId from issuerCreateAndStoreCredentialDef
    let getCredDefRequest = await indy.buildGetCredDefRequest(senderDid, credDefIds);
    let getCredDefResponse = await indy.submitRequest(poolHandle, getCredDefRequest);
    return await indy.parseGetCredDefResponse(getCredDefResponse);

}

module.exports = {
    issuerCreateAndStoreCredentialDef,
    sendCredDef,
    createCredentialOffer,
    getCredDefenation
}