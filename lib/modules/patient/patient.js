var wallet = require('../../util/wallet')
var schema = require('../../util/schema')
var credDef = require('../../util/credDefUtil')
var auth  = require('../../util/auth')
var connection = require('../../util/connectPool')




async function createPatientWallet(userName,password){
    console.log("Method: createPatientWallet")
    let poolHandle = await connection.connectPool().catch(e=>{
        console.log("check if pool is already opened ")
    })

    let walletResponse = await wallet.createWallet(userName,password)

console.log("wallet Response =========>",walletResponse)
return [walletResponse,poolHandle]


}

async function createMasterSecret(patientWalletHandle){
console.log("Method: createMasterSecret()")

let patientMasterSecretId = await indy.proverCreateMasterSecret(patientWalletHandle, null);

return patientMasterSecretId
}


async function getCredentialDefentaion(poolHandle, senderDid, credentialDefId){
//we will get this from createAndStoreCredentialDefenationId  "createCredDefenation"  this method in hospital
let [medicalPrescriptionCredDefId,medicalPrescriptionCredDef] = await credDef.getCredDefenation(poolHandle, senderDid, credentialDefId)
return [medicalPrescriptionCredDefId,medicalPrescriptionCredDef]
}



//Request will be raised by the patient for
// Medical Prescription once the hospital send him offer for medical Prescription

//aliceWallet, aliceFaberDid, authdecryptedTranscriptCredOfferJson, faberTranscriptCredDef, aliceMasterSecretId
async function patientCreateCredentialRequest(subjectWalletHandle,subjectDID,decryptedMessageJson,medicalPrescriptionCredDef,subjectMasterKeyId ){


    //decryptedMessageJson  we will get it from decryptmessage method
// subjectMasterKeyId we will get it from createMasterSecret() method
//medicalPrescriptionCredDef  we will get it from getCredentialDefenations

    let [medicalPrescriptionRequestJson, medicalPrescriptionRequestMetadataJson] = await indy.proverCreateCredentialReq(subjectWalletHandle, subjectDID, decryptedMessageJson, medicalPrescriptionCredDef, subjectMasterKeyId);
    return [medicalPrescriptionRequestJson, medicalPrescriptionRequestMetadataJson]

}

async function storeCredentialsInWallet(subjectWallethandle,medicalPrescriptionRequestMetadataJson,decryptedCredentialsJson,medicalPrescrtiptionCredDef){

    //medicalPrescriptionRequestMetadataJson  we will get from patientCreateMedicalRequest() method 
    //decryptedCredentialsJson  this we will get from decryptmessage method
    // medicalPrescrtiptionCredDef this we will get from getCredentialDef method 
  var WalletResponse =   await indy.proverStoreCredential(subjectWallethandle , null, medicalPrescriptionRequestMetadataJson,
    decryptedCredentialsJson, medicalPrescrtiptionCredDef, null);
return WalletResponse
}

async function searchCredentialProofInWallet(subjectWalletHandler,decryptedMessageOfProofRequest){

    let searchForJApplyLoanProofRequest = await indy.proverSearchCredentialsForProofReq(subjectWalletHandler, decryptedMessageOfProofRequest, null)
return searchForJApplyLoanProofRequest
}

async function fetchCredentialsFromWallet(searchCredentialProofResponse){
    //searchCredentialProofResponse  we will get this from searchCredentialProofInWallet() method 
let proofResponse = wallet.fetchCredentialsFromWallet()
return proofResponse
}

//poolHandle, aliceFaberDid, credsForJobApplicationProof, 'Alice'
async function createCredentialProofForVerifier(subjectWallethandle,proofRequestJson,jsonOfProofCreated,subjectMasterSecretId,schemasJson,credDefsJson, revocStatesJson,verifierDID) {


    let proofResponse = await wallet.createProofForVerifier(subjectWallethandle,proofRequestJson,jsonOfProofCreated,subjectMasterSecretId,schemasJson,credDefsJson, revocStatesJson)
    let verifierVerKey = await wallet.getVerificationKeyForDID(verifierDID)
    let subjectVerKey = await wallet.listMyDidsWithMeta(subjectWallethandle)
        let encryptMessage = await auth.encryptMessage(subjectWalletHandle,subjectVerKey,verifierVerKey,proofResponse)
        return encryptMessage
}



async function proverGetEntitiesFromLedger(poolHandle, subjectDID, credentialsSearchForWallet, actor) {
    let schemas = {};
    let credDefs = {};
    let revStates = {};

    for(let referent of Object.keys(credentialsSearchForWallet)) {
        let item = credentialsSearchForWallet[referent];
        console.log(`\"${actor}\" -> Get Schema from Ledger`);
        let [receivedSchemaId, receivedSchema] = await getSchema(poolHandle, subjectDID, item['schema_id']);
        schemas[receivedSchemaId] = receivedSchema;

        console.log(`\"${actor}\" -> Get Claim Definition from Ledger`);
        let [receivedCredDefId, receivedCredDef] = await getCredDef(poolHandle, subjectDID, item['cred_def_id']);
        credDefs[receivedCredDefId] = receivedCredDef;

        if (item.rev_reg_seq_no) {
            // TODO Create Revocation States
        }
    }

    return [schemas, credDefs, revStates];
}

module.exports = {
    createPatientWallet,
    createMasterSecret,
    getCredentialDefentaion,
    patientCreateCredentialRequest,
    storeCredentialsInWallet,
    searchCredentialProofInWallet ,
    fetchCredentialsFromWallet,
    createCredentialProofForVerifier,
    proverGetEntitiesFromLedger
}