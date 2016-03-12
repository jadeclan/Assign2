/**
 * Created by nwalker on 3/10/16.
 */

/**
 * Modules
 * TO ADD MODULE:
 *    find module name u are looking to use.
 *    go to settings --> Languages and frameworks --> Node.js and Npm
 *    click the + button and then search / install the module
 *    module will be saved and stored in the node_modules directory
 */

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
//var cors = require('cors');

/**
 * MongoDB
 * Mongoose translates data in the database to JavaScript objects for use in your application
 */
mongoose.connect('mongodb://localhost/comp4513');
mongoose.Promise = require('bluebird');

/**
 *Express is a minimal and flexible Node.js web application framework that
 * provides a robust set of features for web and mobile applications.
 */
var app = express();

/**
 *log statements to stdout showing details of:
 * remote ip, request method, http version, response status, user agent etc.
 * It allows you to modify the log using tokens or add color to them by defining
 * 'dev' or even logging out to an output stream, like a file.
 */
app.use( morgan('dev') );

/**
 * accept application/json in requests
 */
app.use( bodyParser.json() );

/**
 * accept application/x-www-urlencoded in requests
 */
app.use( bodyParser.urlencoded( { extended: true } ) );

/**
 *The CORS standard describes new HTTP headers which provide browsers and servers
 * a way to request remote URLs only when they have permission.
 */
//app.use( cors() );

/**
 * Load the API
 */
//app.use( '/',require('./api') );

/**
 * Angular Application
 */

/**
 * serve static files from the directory "public" (assests, css, js, etc)
 */
app.use( express.static('public') );

/**
 * default route handler for angular Application
 */
app.get('/', function(req, res){
   res.sendFile('./public/index.html');
});

/**
 * module.exports
 * http://www.sitepoint.com/understanding-module-exports-exports-node-js/
 */
module.exports = app;