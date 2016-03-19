/**
 * Created by nwalker on 3/17/16.
 */

/**
 *  API ENDPOINTS
 *
 * POST     /auth/login     validate credentials and generate json web token
 */

var router = require('express').Router();
var config = require('../config');
var Employee = require('../models/employee');


router.post('/auth/login', function (req, res, next) {

    if (!req.body.username) return res.status(400).send({message: 'username is required'});
    if (!req.body.password) return res.status(400).send({message: 'password is required'});

    Employee.Authenticate(req.body.username, req.body.password)
        .then(function(employee) {
            return employee.createToken();
        })
        .then(function(token) {
            res.status(200).location('/employeeDetails').send({ token: token });
        })
        .catch(next);
});

module.exports = router;