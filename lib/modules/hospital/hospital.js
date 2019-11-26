var wallet = require('../../util/wallet')
var schema = require('../../util/schema')
var credDef = require('../../util/credDefUtil')
var auth  = require('../../util/auth')
var connection = require('../../util/connectPool')




/**
 * Method : connnectPool 
 * 
 * Description : To connect with indy local pool
 * 
 * 
 */






// STEP 1  Hospital will create wallet  
async function createHospitalWallet(req){

let walletResponse = await wallet.createWallet(req.body.userName,req.body.password)

console.log("wallet Response =========>",walletResponse)
return {"response" : walletResponse}
}



async function createSchema(poolHandle,hospitalWalletHandle,hospitalDid){
console.log("createSchema =================> : \n\n")
let [[transcriptSchemaId,transcriptSchema,sendSchemaResponse]] = await  schema.createAndPublishMedicalPrescriptionSchema(poolHandle,hospitalWalletHandle,hospitalDid)
console.log("[transcriptSchemaId,transcriptSchema,sendSchemaResponse] =====================> \n\n",[transcriptSchemaId,transcriptSchema,sendSchemaResponse])
return [transcriptSchemaId,transcriptSchema,sendSchemaResponse]
}


async function getSchema(poolHandle, requesterDid, schemaId){
console.log("Method: getSchema() ====================> :")
 return await  schema.getSchema(poolHandle, requesterDid, schemaId)
}


async function createCredDefenation(hospitalWalletHandle,hospitalDID,schema){
console.log("createCredDefenation ======================> \n")
let [medicalPrescriptionDefId, medicalPrescriptionCredDefJson] = await credDef.issuerCreateAndStoreCredentialDef(hospitalWalletHandle,hospitalDID,schema)

return [medicalPrescriptionDefId, medicalPrescriptionCredDefJson]
}


async function pushCredToLedger(poolHandle, hospitalWalletHandle, hospitalDid){
    console.log("Method: pushCredToLedger ================>")
    let pushCredResponse = await credDef.sendCredDef(poolHandle, hospitalWalletHandle, hospitalDid)
    return pushCredResponse

}

async function createCredOffer(poolHandle,hospitalWalletHandle, credDefId,subjectDID){
console.log("Method: createCredOffer() ==================>")

let credDefOfferResponse = credDef.createCredentialOffer(hospitalWalletHandle,credDefId)
// we will get credDefId from createCredDefenation() method 
let hospitalDID = await wallet.listMyDidsWithMeta(hospitalWalletHandle)
let subjectVerKey = await indy.keyForDid(poolHandle, hospitalWalletHandle, subjectDID);
let hospitalVerKey = await indy.keyForDid(poolHandle, hospitalWalletHandle, hospitalDID);
let encryptedMedicalPrescriptionOffer = await indy.cryptoAuthCrypt(hospitalWalletHandle, hospitalVerKey, subjectVerKey, Buffer.from(JSON.stringify(credDefOfferResponse),'utf8'));
return encryptedMedicalPrescriptionOffer
}



async function createCredentialForSubject(issuerWalletHandle,medicalPrescriptionCredDefJson,decryptedMessageJson,medicalPrescriptionCredValue){
//decryptedMessageJson we will get this from decrypt message api
// medicalPrescriptionCredValue  this is the json of medical prescription which we will create 

// let transcriptCredValues = {
//     "first_name": {"raw": "Alice", "encoded": "1139481716457488690172217916278103335"},
//     "last_name": {"raw": "Garcia", "encoded": "5321642780241790123587902456789123452"},
//     "degree": {"raw": "Bachelor of Science, Marketing", "encoded": "12434523576212321"},
//     "status": {"raw": "graduated", "encoded": "2213454313412354"},
//     "ssn": {"raw": "123-45-6789", "encoded": "3124141231422543541"},
//     "year": {"raw": "2015", "encoded": "2015"},
//     "average": {"raw": "5", "encoded": "5"}
// };

// for medical prescription we need 'Medication','Timing','Strength','Frequency','Form','Duration','Dosage'
    let [medicalPrescriptionJson] = await indy.issuerCreateCredential(issuerWalletHandle, medicalPrescriptionCredDefJson,
        decryptedMessageJson, medicalPrescriptionCredValue, null, -1);
            return medicalPrescriptionJson
}

module.exports = {
    createHospitalWallet,
    createSchema,
    getSchema,
    createCredDefenation,
    pushCredToLedger,
    createCredOffer,
    createCredentialForSubject ,

}