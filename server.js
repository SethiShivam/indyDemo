var express = require('express');
var envConfig = require('./lib/config');
//var bodyParser = require("body-parser");

var app = express();
var port = envConfig.devConfig.port;




    envConfig.expressConfig(app, envConfig.devConfig.environment);

    // attached route to the app
    require("./lib/route")(app);

    //app.use(bodyParser.json());

    console.log(' ----------- > Initializing express module ');
    app.listen(port, (error) => {
        if (error)
            console.log("Unable to Connect with Server");
        else
            console.log("Server Successfully Running on " + port);

    });

