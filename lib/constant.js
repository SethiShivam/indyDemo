const DB_MODEL_REF = {
    USERMASTER: "UserMaster"
};

const STATUS_CODE = {
    ERROR: 0,
    SUCCESS: 1
};

const MESSAGES = {
    intrnlSrvrErr: "Please try after some time.",
    unAuthAccess: "Unauthorized access ",
    tokenGenError: "Error while generating access token",
    invalidEmail: "Please fill valid Email Address",
    invalidMobile: "Please fill valid Mobile No",
    blockedMobile: "Action Blocked for Illegal use of Services.",
    invalidOtp: "Invalid OTP",
    nameCantEmpty: "Name can't be empty",
    invalidZipcode: "please fill valid zip Code",
    invalidNum: "Please fill valid phone number or Do not add country code",
    passCantEmpty: "Password can't be empty",
    validationError : "Validation errors",
    incorrectPass: "Invalid email or passoword",
    userNotFound: "User not found.",
    accessTokenCantEmpty: "Access token cannot be empty",
    tokenSecretCantEmpty: "Secret token cannot be empty",
    incorrectTwToken : "Sorry, we could not contact twitter with the provided token",
    deviceIdCantEmpty : "Device id cannot be empty",
    platformCantEmpty : "Platform cannot be empty or invalid",
    deviceTokenCantEmpty : "Device token cannot be empty",
    ACCOUNT_DEACTIVATED: "Your account is suspended, please contact the SHiNE admin: vishalrana9915@gmail.com.",
};

module.exports = Object.freeze({
    APP_NAME: 'EcoTek',
    STATUS_CODE: STATUS_CODE,
    DB_MODEL_REF: DB_MODEL_REF,
    MESSAGES : MESSAGES,
});