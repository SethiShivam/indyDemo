const poolRoute = require('express').Router();
var pool = require('./pool');






poolRoute.route('/pool/connectPool').post((req, res) => {
    console.log("connectPool ");
    pool.connectPool(req.body).then((response) => {

        console.log(response);
        res.status(200).send(response);
    }).catch(e => console.log);

});



poolRoute.route('/pool/registerSteward').post((req, res) => {
    console.log("registerSteward ");
    pool.registerSteward(req).then((response) => {

        console.log(response);
        res.status(200).send(response);
    }).catch(e => console.log);

});


poolRoute.route('/pool/onboardAuthority').post((req, res) => {
    console.log("onboardAuthority ");
    pool.onboarding(req).then((response) => {

        console.log(response);
        res.status(200).send(response);
    }).catch(e => console.log);

});


poolRoute.route('/pool/openWallet').post((req, res) => {
    console.log("openWallet ");
    pool.openWallet(req).then((response) => {

        console.log(response);
        res.status(200).send(response);
    }).catch(e => console.log);

});
module.exports = poolRoute