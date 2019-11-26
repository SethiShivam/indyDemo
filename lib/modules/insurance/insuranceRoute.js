const insuranceRoutr = require('express').Router();
var insurance = require('./insuranceCompany');


insuranceRoutr.route('/insurance/createCredentialRequetsForVerification').post((req, res) => {
    console.log("createCredentialRequetsForVerification");
    insurance.createCredentialRequetsForVerification(req.body).then((response) => {


        console.log(response);
        res.status(200).send(response);
    }).catch(e => console.log);



});



insuranceRoutr.route('/insurance/decryptResponseFromSubject').post((req, res) => {
    console.log("decryptResponseFromSubject");
    insurance.decryptResponseFromSubject(req.body).then((response) => {

        console.log(response);
        res.status(200).send(response);
    }).catch(e => console.log);



});



insuranceRoutr.route('/insurance/decryptCredentialProof').post((req, res) => {
    console.log("decryptCredentialProof");
    insurance.decryptCredentialProof(req.body).then((response) => {

        console.log(response);
        res.status(200).send(response);
    }).catch(e => console.log);



});



insuranceRoutr.route('/insurance/verifyProof').post((req, res) => {
    console.log("verifyProof");
    insurance.verifyProof(req.body).then((response) => {

        console.log(response);
        res.status(200).send(response);
    }).catch(e => console.log);
});


insuranceRoutr.route('/insurance/verifierGetEntitiesFromLedger').post((req, res) => {
    console.log("verifierGetEntitiesFromLedger");
    insurance.verifierGetEntitiesFromLedger(req.body).then((response) => {

        console.log(response);
        res.status(200).send(response);
    }).catch(e => console.log);
});
module.exports =  insuranceRoutr 
