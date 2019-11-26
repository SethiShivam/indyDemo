'use strict';

//===============================Load Modules Start========================

const express = require("express"),
    bodyParser = require("body-parser");

module.exports = function (app, env) {

    // parses application/json bodies
    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({
        extended: false
    }));

};