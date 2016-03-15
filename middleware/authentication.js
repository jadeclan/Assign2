/**
 * Created by Nolan Walker on 2016-03-14.
 */

/**
 *  jwt's are split into 3 sections ( header, payload, signature)
 *  everything to know about josn web tokens can be found here:
 *  https://jwt.io/introduction/
 */

var moment = require('moment');
var jwt = require('jsonwebtoken');
var Employee = require('../models/employee');
var config = require('../config');

module.exports = function(req, res, next){

    if(!req.headers.authorization)
        return res.status(401).send( {message: 'authorization required'} );

    var token = req.headers.authorization.split(' ')[1];

    var payload = null;

    try{
        payload =jwt.decode(token, config.AUTH_SECRET_KEY);
    }catch(err){
        return res.status(401).send( {message: err.message} );
    }

    if( payload.exp < moment().unix() )
        return res.status(401).send( {message: 'token expired'} );

    Employee.findById(payload.sub)
        .then(employee => {
            if(!employee)
                return res.status(401).send( {message: "employee not found"} );
        req.employee = employee;

        next();
    });
};