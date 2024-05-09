const { request, response } = require("express");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const config = {
    TOKEN_SECRET: process.env.TOKEN_SECRET
};

const verifyUserToken = async (request, response, next) => {
    let token = request.headers.authorization;

    if (!token) return response.status(401).send("Access Denied / Unauthorized Request");

    try {
        token = token.split(' ')[1]; // Remove Bearer from String

        if (token === 'null' || !token) return response.status(401).send("Unauthorized Request");

        let verifiedUser = jwt.verify(token, config.TOKEN_SECRET);
        if (!verifiedUser) return response.status(401).send("Unauthorized Request");

        request.user = verifiedUser;
        next();
    } catch (error) {
        console.error(error);
        response.status(401).send("Invalid Token");
    }
};

module.exports = verifyUserToken;