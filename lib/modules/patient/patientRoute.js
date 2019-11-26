const patientRoutr = require('express').Router();
var patient = require('./patient');


patientRoutr.route('/patient/createPatientWallet').post((req, res) => {
    console.log("createPatientWallet");
    patient.createPatientWallet(req.body).then((response) => {

        console.log(response);
        res.status(200).send(response);
    }).catch(e => console.log);
});



patientRoutr.route('/patient/createMasterSecret').post((req, res) => {
    console.log("createMasterSecret");
    patient.createMasterSecret(req.body).then((response) => {


        console.log(response);
        res.status(200).send(response);
    }).catch(e => console.log);

});



patientRoutr.route('/patient/getCredentialDefentaion').post((req, res) => {
    console.log("getCredentialDefentaion");
    patient.getCredentialDefentaion(req.body).then((response) => {


        console.log(response);
        res.status(200).send(response);
    }).catch(e => console.log);

});



patientRoutr.route('/patient/patientCreateCredentialRequest').post((req, res) => {
    console.log("patientCreateCredentialRequest");
    patient.patientCreateCredentialRequest(req.body).then((response) => {


        console.log(response);
        res.status(200).send(response);
    }).catch(e => console.log);

});



patientRoutr.route('/patient/storeCredentialsInWallet').post((req, res) => {
    console.log("storeCredentialsInWallet");
    patient.storeCredentialsInWallet(req.body).then((response) => {


        console.log(response);
        res.status(200).send(response);
    }).catch(e => console.log);

});


patientRoutr.route('/patient/searchCredentialProofInWallet').post((req, res) => {
    console.log("searchCredentialProofInWallet");
    patient.searchCredentialProofInWallet(req.body).then((response) => {


        console.log(response);
        res.status(200).send(response);
    }).catch(e => console.log);

});


patientRoutr.route('/patient/fetchCredentialsFromWallet').post((req, res) => {
    console.log("fetchCredentialsFromWallet");
    patient.fetchCredentialsFromWallet(req.body).then((response) => {


        console.log(response);
        res.status(200).send(response);
    }).catch(e => console.log);

});


patientRoutr.route('/patient/createCredentialProofForVerifier').post((req, res) => {
    console.log("createCredentialProofForVerifier");
    patient.createCredentialProofForVerifier(req.body).then((response) => {


        console.log(response);
        res.status(200).send(response);
    }).catch(e => console.log);

});


patientRoutr.route('/patient/proverGetEntitiesFromLedger').post((req, res) => {
    console.log("proverGetEntitiesFromLedger");
    patient.proverGetEntitiesFromLedger(req.body).then((response) => {


        console.log(response);
        res.status(200).send(response);
    }).catch(e => console.log);

});

module.exports = patientRoutr