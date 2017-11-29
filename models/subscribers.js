
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const createdModified = require('mongoose-createdmodified').createdModifiedPlugin;

var SubscriberSchema = new Schema({
    email: String,
});

SubscriberSchema.index({email:1}, {unique:true});

SubscriberSchema.plugin(createdModified, {index: true});

module.exports = mongoose.model('Subscriber', SubscriberSchema);
