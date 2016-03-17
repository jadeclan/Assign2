/**
 * Created by nwalker on 3/17/16.
 */

var router = require('express').Router();
var auth = require('./auth');
var employee = require('./employee');

router.use(auth);
router.use(employee);

module.exports = router;