var wallet = require('../../util/wallet')
var schema = require('../../util/schema')
var credDef = require('../../util/credDefUtil')
var auth  = require('../../util/auth')
var connection = require('../../util/connectPool')




 // PROOF REQUEST JSON EXAMPLE
// let applyLoanProofRequestJson = {
//     'nonce': nonce,
//     'name': 'Loan-Application-Basic',
//     'version': '0.1',
//     'requested_attributes': {
//         'attr1_referent': {
//             'name': 'employee_status',
//             'restrictions': [{'cred_def_id': acmeJobCertificateCredDefId}]
//         }
//     },
//     'requested_predicates': {
//         'predicate1_referent': {
//             'name': 'salary',
//             'p_type': '>=',
//             'p_value': 2000,
//             'restrictions': [{'cred_def_id': acmeJobCertificateCredDefId}]
//         },
//         'predicate2_referent': {
//             'name': 'experience',
//             'p_type': '>=',
//             'p_value': 1,
//             'restrictions': [{'cred_def_id': acmeJobCertificateCredDefId}]
//         }
//     }
// };


async  function createCredentialRequetsForVerification(verifierWalletHandler,verifierVerKey,subjectVeryKey,proofRequestJson){

    let encryptMessage = auth.encryptMessage(verifierWalletHandler,verifierVerKey,subjectVeryKey,proofRequestJson)
        return encryptMessage
}


async function decryptResponseFromSubject(insuranceWalletHandler,insuranceVerKey,encryptedMessage){
let decryptMessage = auth.decryptMessage(insuranceWalletHandler, insuranceVerKey, encryptedMessage)
return decryptMessage
}


async  function decryptCredentialProof(verifierWalletHandler,verifierVerKey,subjectDID,credentialProofJson){
        let subjectVeryKey = wallet.listMyDidsWithMeta(subjectDID)
    let decryptMessage = auth.decryptMessage(verifierWalletHandler,verifierVerKey,subjectVeryKey,credentialProofJson)
        return decryptMessage
}


//jobApplicationProofRequestJson, decryptedJobApplicationProofJson, schemasJson, credDefsJson, revocRefDefsJson, revocRegsJson)
async function verifyProof(medicalProofRequestJson, decryptedMessage, schemasJson, credDefsJson, revocRefDefsJson, revocRegsJson){
  //medicalProofRequestJson json which insurance ocmpany will create while asking for the credentials 
  
    return  await indy.verifierVerifyProof(medicalProofRequestJson, decryptedMessage, schemasJson, credDefsJson, revocRefDefsJson, revocRegsJson)
}


async function verifierGetEntitiesFromLedger(poolHandle, did, medicalPrescriptionProof, actor) {
    let schemas = {};
    let credDefs = {};
    let revRegDefs = {};
    let revRegs = {};
// medicalPrescriptionProof  this is the proof created by subject using indy.proverCreateProof
    for(let referent of Object.keys(medicalPrescriptionProof)) {
        let item = medicalPrescriptionProof[referent];
        console.log(`"${actor}" -> Get Schema from Ledger`);
        let [receivedSchemaId, receivedSchema] = await getSchema(poolHandle, did, item['schema_id']);
        schemas[receivedSchemaId] = receivedSchema;

        console.log(`"${actor}" -> Get Claim Definition from Ledger`);
        let [receivedCredDefId, receivedCredDef] = await getCredDef(poolHandle, did, item['cred_def_id']);
        credDefs[receivedCredDefId] = receivedCredDef;

        if (item.rev_reg_seq_no) {
            // TODO Get Revocation Definitions and Revocation Registries
        }
    }

    return [schemas, credDefs, revRegDefs, revRegs];
}

module.exports = {
    createCredentialRequetsForVerification,
    decryptResponseFromSubject,
    verifyProof,
    decryptCredentialProof,
    verifierGetEntitiesFromLedger


    
}