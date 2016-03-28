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


router.post('/todo', authenticate, function(req, res, next) {
	// create new todo
    alert("inside post");
	req.body.task.id = 999;
	//req.body.task.date = new Date(req.body.task.date);
    alert(req.body.task);
	Employee.findOneAndUpdate(req.employee, {$push: {'todo': req.body.task}}, {new: true})
		.then(function(employee) { res.send(employee) })
		.catch(next);
});

router.put('/todo', authenticate, function(req, res, next) {
  	// update todo
});

router.delete('/todo', authenticate, function(req, res, next) {
	// delete todo
    alert("inside DELETE");
    alert(req.body.task);
    res.send(req.employee);
});

module.exports = router;