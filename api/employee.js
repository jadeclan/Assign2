/**
 * Created by nwalker on 3/10/16.
 *
 * API ENDPOINTS
 *
 * GET      /account        get authenticated employee's details
 * PUT      /account        set authenticated employee's details
 *
 * GET      /employees      get list of employees
 *
 * GET      /employees/:username        get employee details
 * PUT      /employees/:username        update employee details
 * DELETE   /employees/:username        delete employee
 *
 */

var router = require('express').Router();
var ensure

/**
 * API ENDPOINTS
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
 *get list of employees
 */
router.get('/employees', function(req, res, next) {
    Employee.findById(req.employee)
        .then( function(employee){ res.send(employee) } )
        .catch(next);
});