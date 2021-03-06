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
    // Add a new todo

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
            req.body.task.id = newID;

            employee.todo.push(req.body.task);

            return employee.save();
        })
        .then(function(employee){
            res.send(employee.todo);
        })
        .catch(next);
});

router.put('/updateToDo/', authenticate, function(req, res, next){
    //Update a to do
    Employee.findById(req.employee)
        .then(function(employee) {

            var index = -1;

            for(var j = 0; j < employee.todo.length; j++){
                if(req.body.task.id == employee.todo[j].id){
                    index = j;
                }
            }

            var updatedToDo = req.body.task;

            employee.todo.splice(index, 1);  //Delete the old to do

            employee.todo.push(updatedToDo); //Add the updated to do

            return employee.save();
        })
        .then(function(employee) {
            res.send(employee.todo);
        })
        .catch(next);
});

router.delete('/todo/:id', authenticate, function(req, res, next) {
    // delete todo
    Employee.findById(req.employee)
        .then(function(employee) {

            var index = -1;

            for(var j = 0; j < employee.todo.length; j++){
                if(req.params.id == employee.todo[j].id){
                    index = j;
                }
            }

            employee.todo.splice(index, 1);

            return employee.save();
        })
        .then(function(employee) {
            res.send(employee.todo);
        })
        .catch(next);
});
module.exports = router;
