const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret_token = process.env.JWT_SECRET_TOKEN || "DON'T_MESS_WITH_HIPPOS";

const generateToken = (id) => {
    //console.log(process.env.JWT_SECRET_TOKEN);
    return jwt.sign({ id }, secret_token, {
        expiresIn: "10d",
    });
};

module.exports = generateToken;
