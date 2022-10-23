const jwt = require('jsonwebtoken');
require('dotenv').config()

const JWT_TOKEN = process.env.JWT_TOKEN

function generate_jwt(username){
    return jwt.sign(username, JWT_TOKEN, {expiresIn: '10800s'})
}

module.exports = generate_jwt