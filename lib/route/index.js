const hospitalRoutr = require('../modules/hospital/hospitalRoute');
const patientRoutr = require('../modules/patient/patientRoute')
const insuranceRoutr = require('../modules/insurance/insuranceRoute');
const poolRoutr = require('../modules/indyPool/poolRoute')

module.exports = function (app) {
    app.use('/api/v1', hospitalRoutr);
    app.use('/api/v1', patientRoutr);
    app.use('/api/v1', insuranceRoutr);
    app.use('/api/v1', poolRoutr);
    //app.use(responseHandler.hndlError);
}
