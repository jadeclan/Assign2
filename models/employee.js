/**
 * Created by nwalker on 3/10/16.
 */

//var Promise = require('bluebird');
var mongoose = require('mongoose');
var util = require('util');

var employeeSchema = new mongoose.Schema({

    id: Number,
    guid: String,
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    TODO: [{
        id: Number,
        status: String,
        priority: String,
        date: Date,
        description: String
    }]
});






/*

    employee:{
    id:2,
        "guid":"c29cb8f4-d8d5-40e9-8bc8-b054daa2e863",
        "firstname":"Elizabeth",
        "lastname":"Morgan",
        "username":"emorgan1",
        "password":"lLMVck6NjIlu",
        "salt":"velit",
        "todo":[
        {
            "id":1,
            "status":"completed",
            "priority":"low",
            "date":"3/23/2015",
            "description":"Maecenas leo odio, condimentum id, luctus nec"
        },
],
    "messages":[
        {
            "id":1,
            "contact":{
                "firstname":"Anthony",
                "lastname":"Ford",
                "university":{
                    "id":227757,
                    "name":"Rice University",
                    "address":"6100 S Main",
                    "city":"Houston",
                    "state":"Texas",
                    "zip":"77005-1827",
                    "website":"www.rice.edu",
                    "latitude":29.716485,
                    "longitude":-95.403625
                }
            },
            "date":"8/25/2015",
            "category":"Query",
            "content":"Nam dui."
        },
        ...
],
    books:[
        {
            "id":567,
            "isbn10":"0321906365",
            "isbn13":9780321906366,
            "title":"Writing and Reading Across the Curriculum, Brief Edition",
            "category":"English"
        }]


});*/
