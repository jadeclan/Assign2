/**
 * Created by nwalker on 3/10/16.
 */

//var Promise = require('bluebird');
var mongoose = require('mongoose');
var moment = require('moment');
var jwt = require('jsonwebtoken');
var config = require('../config');

/**
 * moment is being use to output a unix timestamp
 */

var employeeSchema = new mongoose.Schema({

    id: Number,
    guid: String,
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    salt: String,

    todo: [{
        id: Number,
        status: String,
        priority: String,
        date: Date,
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

    var token = jwt.sign({
        sub: employee._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    }, config.AUTH_SECRET_KEY );

    //return employee.save()
    //    .then( () => [ employee, token] );
};

/*employeeSchema.statics.Authenticate = function(username, password){
    return this.model('Employee').findOne( {username: username}, '+password')
        .then(employee => {
            if(!employee)
                // needs to throw error here...

            return employee.validatePassword(password);
        });
};*/

module.exports = mongoose.model('Employee', employeeSchema);