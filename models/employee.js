/**
 * Created by nwalker on 3/10/16.
 */

//var Promise = require('bluebird');
var mongoose = require('mongoose');
var moment = require('moment');
var jwt = require('jsonwebtoken');
var config = require('../config');
var APIError = require('../errors/APIError');

/**
 * moment is being use to output a unix timestamp
 */

var employeeSchema = new mongoose.Schema({

    id: Number,
    guid: String,
    firstname: String,
    lastname: String,
    username: String,
    password: { type: String, select: false },
    salt: String,

    todo: [{
        id: Number,
        status: String,
        priority: String,
        date: String,
        description: String
    }],

    messages: [{
        id: Number,
        contact: {
            firstname: String,
            lastname: String,
            university: {
                id: Number,
                name: String,
                address: String,
                city: String,
                state: String,
                zip: String,
                website: String,
                latitude: Number,
                longitude: Number
            },
        date: Date,
        category: String,
        content: String
        }
    }],
    books: [
        {
            id: Number,
            isbn10: Number,
            isbn13: Number,
            title: String,
            category: String
        }
    ]

});

employeeSchema.methods.createToken = function(){
    var employee = this;

    return jwt.sign({
        sub: employee._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    }, config.AUTH_SECRET_KEY );
};

employeeSchema.statics.Authenticate = function(username, password){
    return this.model('Employee').findOne( {username: username}, '+password')
        .then( function(employee){
            if(!employee)
                throw new APIError(403, 'invalid employee');

            if(employee.password !== password)
                throw new APIError(403, 'invalid password');

            return employee;
        });
};

module.exports = mongoose.model('Employee', employeeSchema);