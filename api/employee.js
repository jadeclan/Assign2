/**
 * Created by nwalker on 3/10/16.
 *
 * API ENDPOINTS
 *
 * GET      /employeeDetails                get authenticated employee information
 *
 * GET      /employees              get a list of employees
 *
 * GET      /employees/:username    get employee details
 * PUT      /employees/:username    update user details
 * DELETE   /employees/:username    delete employee
 */

var router = require('express').Router();
var authenticate = require('../middleware/authentication');
var Employee = ('../models/employee');


/**
 * Get profile of authenticated user.
 */
router.get('/employeeDetails', authenticate, function(req, res, next) {
    Employee.findById(req.employee)
        .then( function(employee) { res.send(employee) })
        .catch(next);
});


/**
 *get list of employees
 */
router.get('/employees', function(req, res, next) {
    Employee.findById(req.employee)
        .then( function(employee){ res.send(employee) } )
        .catch(next);
});

module.exports = router;