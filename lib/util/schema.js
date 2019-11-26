var wallet = require('./wallet')
var connect = require('./connectPool')
var auth = require('./auth')
var indy = require('indy-sdk')




/**
 * 
 */


async function createAndPublishMedicalPrescriptionSchema(poolHandle,hospitalWalletHandle,hospitalDid){
console.log("CreateMedicalSchema : ===============================> \n")

let [transcriptSchemaId,transcriptSchema] = await indy.issuerCreateSchema(hospitalDid,"Medical-Prescription","0.1",
['Medication','Timing','Strength','Frequency','Form','Duration','Dosage'])
console.log("[transcriptSchemaId,transcriptSchema] : \n\n",transcriptSchemaId,':','\n\n',transcriptSchema,':','\n\n')
let sendSchemaResponse =  await sendSchema(poolHandle, hospitalWalletHandle, hospitalDid, transcriptSchema);
return [transcriptSchemaId,transcriptSchema,sendSchemaResponse]
}


/**
 * 
 * @param {*} poolHandle            // pool handle or indy pool number
 * @param {*} senderWalletHandle    // sender who is publishing the schema
 * @param {*} senderDid             // DID of the body publishing schema
 * @param {*} schema                // Schema to be published
 */

async function sendSchema(poolHandle, senderWalletHandle, senderDid, schema) {
    console.log("Method: sendSchema() =======================>")
    let schemaRequest = await indy.buildSchemaRequest(senderDid, schema);
  return await indy.signAndSubmitRequest(poolHandle, senderWalletHandle, senderDid, schemaRequest)
}


/**
 * 
 * @param {*} poolHandle  // Indy pool handle
 * @param {*} requesterDid  // Organization requesting for schema
 * @param {*} schemaId     // get schema on the basis of schema id 
 */
async function getSchema(poolHandle, requesterDid, schemaId) {
    let getSchemaRequest = await indy.buildGetSchemaRequest(requesterDid, schemaId);
    let getSchemaResponse = await indy.submitRequest(poolHandle, getSchemaRequest);
    [, jobCertificateSchema] = await indy.parseGetSchemaResponse(getSchemaResponse);
    return jobCertificateSchema
}






module.exports = {
    createAndPublishMedicalPrescriptionSchema,
    sendSchema,
    getSchema
}