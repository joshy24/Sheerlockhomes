var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const createdModified = require('mongoose-createdmodified').createdModifiedPlugin;

var EmployeeSchema = new Schema({
    phone_number: String,
    email: String,
    type: String,
    photo_url: String,
    firstname: String,
    lastname: String,
    state: String,
    average_rating: Number,
    employment_status: String,
    current_employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employer'
    },
    gender: String,
    age: Number
});

EmployeeSchema.index({phone_number:1}, {unique:true});

EmployeeSchema.plugin(createdModified, {index: true});

module.exports = mongoose.model('Employee', EmployeeSchema);
