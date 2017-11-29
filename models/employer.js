/*Employers have two types - individuals and organizations
 *Organizations have the following information
 *Name, Address, Photo_url, Email, Phone_number
 *Individuals have the following information
 *Firstname, Lastname, Email, Photo_url, Address, Phone_number
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const createdModified = require('mongoose-createdmodified').createdModifiedPlugin;

var EmployerSchema = new Schema({
    phone_number: String,
    type: String,
    photo_url: String,
    firstname: String,
    lastname: String,
    email:String,
    adress: String,
    phone_number: Number
});

EmployerSchema.index({phone_number:1}, {unique:true});

EmployerSchema.plugin(createdModified, {index: true});

module.exports = mongoose.model('Employeer', EmployerSchema);
