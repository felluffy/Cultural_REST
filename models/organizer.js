const Joi = require('joi');
const mongoose = require('mongoose');

const organizerSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: false,
        validate: [isEmail, 'invalid email']
    },
    phone: {
        type: String,
        require: true,
        validator: function (v) {
            return /\d{3}-\d{3}-\d{4}/.test(v);
        },
        message: '{VALUE} is not a valid phone number!',
        required: [true, 'User phone number required']
    },
    underRU: {
        type: Boolean,
        required: true
    }
});


const Organizer = mongoose.model('organizer', organizerSchema);

function validateOrganizer(organizer) {
    const schema = {
      name: Joi.string().min(5).max(50).required(),
      phone: Joi.string.phoneNumber().required(),
      email: Joi.isEmail(),
      underRU: Joi.boolean()
    };
  
    return Joi.validate(organizer, schema);
}
    
exports.organizerSchema = organizerSchema;
exports.Organizer = Organizer;
exports.validateOrganizer = validateOrganizer;