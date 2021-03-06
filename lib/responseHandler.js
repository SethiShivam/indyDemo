"use strict";

// Load exceptions
var constants = require("./constant");
var excep = require("./customExceptions");
var APIResponse = require("./model/APIResponse");

function hndlError(err, req, res, next) {
    // unhandled error
    sendError(res, err);
}

function sendError(res, err) {
    // if error doesn't has sc than it is an unhandled error,
    // log error, and throw intrnl server error
    if (!err.errorCode) {
        console.error(err, "unhandled error");
        err = excep.intrnlSrvrErr(err);
    }
    var result = new APIResponse(constants.STATUS_CODE.ERROR, err);
    _sendResponse(res, result);
}

function sendSuccessWithMsg(res,msg) {
    var rslt = {message:msg};
    var result = new APIResponse(constants.STATUS_CODE.SUCCESS,rslt);
    _sendResponse(res,result);
}

function sendSuccess(res, rslt) {
    var result = new APIResponse(constants.STATUS_CODE.SUCCESS, rslt);
    _sendResponse(res, result);
}

module.exports = {
    hndlError, sendError, sendSuccess,sendSuccessWithMsg
};

function _sendResponse(res, rslt) {
    // send status code 200
    return res.send(rslt);
}
