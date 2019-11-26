const hospitalRoute = require('express').Router();
var hospitalService = require('./hospital');







hospitalRoute.route('/hospital/createWallet').post((req, res) => {
    console.log("createWallet ");
    hospitalService.createHospitalWallet(req).then((response) => {

        console.log(response);
        res.status(200).send(response);
    }).catch(e => console.log);

});


hospitalRoute.route('/hospital/createSchema').post((req, res) => {
    console.log("createSchema ");
    hospitalService.createSchema(req.body).then((response) => {
        
        console.log(response);
        res.status(200).send(response);
    }).catch(e => console.log);

});


hospitalRoute.route('/hospital/getSchema').post((req, res) => {
    console.log("createSchema ");
    hospitalService.getSchema(req.body).then((response) => {
        
        console.log(response);
        res.status(200).send(response);
    }).catch(e => console.log);

});


hospitalRoute.route('/hospital/createCredDefenation').post((req, res) => {
    console.log("createSchema ");
    hospitalService.createCredDefenation(req.body).then((response) => {
        
        console.log(response);
        res.status(200).send(response);
    }).catch(e => console.log);

});


hospitalRoute.route('/hospital/pushCredToLedger').post((req, res) => {
    console.log("createSchema ");
    hospitalService.pushCredToLedger(req.body).then((response) => {
        
        console.log(response);
        res.status(200).send(response);
    }).catch(e => console.log);

});


hospitalRoute.route('/hospital/createCredOffer').post((req, res) => {
    console.log("createSchema ");
    hospitalService.createCredOffer(req.body).then((response) => {
        
        console.log(response);
        res.status(200).send(response);
    }).catch(e => console.log);

});


hospitalRoute.route('/hospital/createCredentialForSubject').post((req, res) => {
    console.log("createSchema ");
    hospitalService.createCredentialForSubject(req.body).then((response) => {
        
        console.log(response);
        res.status(200).send(response);
    }).catch(e => console.log);

});



hospitalRoute.route('/hospital/createCredentialForSubject').post((req, res) => {
    console.log("createSchema ");
    hospitalService.createCredentialForSubject(req.body).then((response) => {
        
        console.log(response);
        res.status(200).send(response);
    }).catch(e => console.log);

});
module.exports = hospitalRoute