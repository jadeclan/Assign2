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
    Employee.distinct("todo.priority")
        .then(function(data){
            response.send(data) } )
        .catch(next);
});

/**
 * Get Unique Status Types
 */
router.get('/statusList', function(request, response, next){
    Employee.distinct('todo.status')
        .then(function(data){
            response.send(data) } )
        .catch(next);
});

router.put('/todo', authenticate, function(req, res, next) {
    // update todo

    Employee.findById(req.employee)
        .then( function(employee){
            // Get the list of taken id numbers that have been used
            var idsTaken = [];
            for(var i=0; i<employee.todo.length; i++){
                idsTaken.push(employee.todo[i].id);
            }
            var newID = 1;
            var idFound=false;
            while(!idFound){
                if(idsTaken.indexOf(newID) >-1){
                    newID++;
                } else {
                    idFound = true;
                }
            }
            console.log("The new ID will be: ");
            console.log(newID);
            req.body.task.id = newID;

            employee.todo.push(req.body.task);

            return employee.save();
        })
        .then(function(employee){
            res.send(employee.todo);
        })
        .catch(next);
});

router.delete('/todo/:id', authenticate, function(req, res, next) {
    // delete todo
    console.log(req.params.id);
    Employee.findById(req.employee)
        .then(function(employee) {
            employee.todo.pop(req.params.id);
            return employee.save();
        })
        .then(function(employee) {
            res.send(employee.todo);
        })
        .catch(next);
});
module.exports = router;
