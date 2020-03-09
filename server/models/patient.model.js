const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.promise = Promise;

// Define userSchema
const patientSchema = new Schema({
    firstName: { type: String, unique: false, required: true },
    lastName: { type: String, unique: false , required: true },
    email: {  type: String, unique: true, required: false },
    dob : { type: Date, required: true },
    age: { type: Number, required: true },
    phone: { type: String,
        validate: {
            validator: function(v) {
                return /^[6-9]\d{9}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    },
    gender: { type: String, unique: false, required: true },
    createdBy: { type: String, unique: false, required: true },
    height: { type: Number, required: true },
    bloodType: { type: String, required: true },
    address: {type: Object, required: true},
});

// Define schema methods

// Define hooks for pre-saving


// Create reference to User & export
const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
