const User = require('../models/users.model').model;

const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');

const validToken = (req, res, next) => {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, jwtConfig.SECRET_TOKEN);
        console.log(`decoded :${decoded.id}`);
        req.userId = decoded.id; // add user id to request : retrieved from token since added to payload
        next();
    } catch (err) {
        console.log(`erreur JWT : ${err.message}`);
        if (req.headers['sec-fetch-dest'] === 'empty') { // req comes from a fetch() ?
            console.log('sec-fetch-dest: EMPTY');
            res.status(401).json({ redirectTo: '/access/login' });
        } else {
            console.log(`sec-fetch-dest: ${req.headers['sec-fetch-dest'].toUpperCase()}`);
            res.status(301).redirect('/access/login');
        }
    }
}


// il serait plus pertinent de mettre le statut "admin" dans le payload du token JWT
// cela est plus conforme à l'approche "stateless" de JWT
const adminAuthentication = async(req, res, next) => {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (user.admin) {
        next();
    } else {
        res.status(401).json({ message: 'Admin : accès refusé' });
    }
}

module.exports.validToken = validToken;
module.exports.isAdmin = adminAuthentication;