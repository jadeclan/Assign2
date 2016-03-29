/**
 * Created by nwalker on 3/10/16.
 *
 * API ENDPOINTS
 *
 * GET      /

/**
 * employeeDetails                get authenticated employee information
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


router.post('/todo', authenticate, function(req, res, next) {
	// create new todo

    // alert(req.body.task) // this will not work in node, use console.log

    console.log(req.body.task);

    Employee.findById(req.employee)
        .then(function(employee) {
            // todo: this should be found by looping through employee.todo and looking for the next available id
            req.body.task.id = 999;

            employee.todo.push(req.body.task);

            return employee.save();
        })
        .then(function(employee) {
            res.send(employee.todo);
        })
        .catch(next);

    /*
	Employee.findOneAndUpdate(req.employee, {$push: {'todo': req.body.task}}, {new: true})
		.then(function(employee) { res.send(employee) })
		.catch(next);
    */
});

router.put('/todo', authenticate, function(req, res, next) {
  	// update todo
});

router.delete('/todo', authenticate, function(req, res, next) {
	// delete todo
    console.log("got to here");
    /*Employee.findById(req.employee)
        .then(function(employee){
            console.log("got to this point");
            console.log(employee);
        })
        .then(function(employee){
            res.send(req.employee);
        })
        .catch(next);*/
});


/*router.post('/messages', authenticate, function(req, res, next) {
    Employee.findById(req.body.employee)
        .then(function(employee) {
            // todo: this should be found by looping through employee.messages and looking for the next available id

            var numMessages = employee.messages;
            console.log(numMessages);
            console.log(employee.messages);

            employee.messages.push({
                id: (numMessages.length + 1),
                messages: req.body.message
            });

            return employee.save();
        })
        .then(function(employee) {
            res.send(employee.message);
        })
        .catch(next);
});*/

module.exports = router;