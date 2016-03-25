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
var Employee = require('../models/employee');


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

/**
 * Get Unique Priority Types
 */
router.get('/priorityList', function(request, response, next){
    Employee.distinct(request.todo.priority)
        .then(function(data){
            console.log(data);
            respond.send(data) } )
        .catch(next);
});

/**
 * Get Unique Status Types
 */
router.get('/statusList', function(request, response, next){
    Employee.distinct(request.todo.status)
        .then(function(data){
            console.log(data);
            respond.send(data) } )
        .catch(next);
});

module.exports = router;