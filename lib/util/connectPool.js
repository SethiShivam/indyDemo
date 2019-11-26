
"use strict";

const indy = require('indy-sdk');
const assert = require('assert');

/**
 * Method : connnectPool 
 * 
 * Description : To connect with indy local pool
 * 
 * 
 */

async function connectPool(){
console.log("Connecting Local Pool ====================>")
let poolName = 'local-pool'

let poolHandle = await indy.openPoolLedger(poolName);
console.log("Open Pool Ledger Response --------> \n",poolHandle)
return {poolHandle}
}






module.exports = connectPool

