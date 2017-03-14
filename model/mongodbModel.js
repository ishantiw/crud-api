/**
* Using mongoose which is MongoDB object modeling tool designed to work in an asynchronous environment.
* Please insert your @var{username}, @var{pwd}, and @var{dbName} in order connect with your database
* @author Ishan Tiwari <ishan210788@gmail.com>
*/

const username = 'ishantiw';
const pwd = '54321';
const dbName = 'list-companies';
const mongoURL = `mongodb://${username}:${pwd}@ds123930.mlab.com:23930/${dbName}`;
const mongoose = require('mongoose'),
    celebSchema = new mongoose.Schema({
        id: Number,
        cname: String,
        tvshow: String
    });

module.exports = {mongoose, celebSchema, mongoURL};