const Joi = require('joi');
const mongoose = require('mongoose');
//var { isEmail } = require('validator');
//var phoneValidator = require('joi-phone-validator');
//const myCustomJoi = Joi.extend(require('joi-phone-number'));

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
        default: " "
        //validate: [isEmail, 'invalid email']
    },
    phone: {
        type: String,
        require: true,
        //message: '{VALUE} is not a valid phone number!',
        //required: [true, 'User phone number required']
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
        email: Joi.string().email(),
        //phone: Joi.string().required(),//.mobile(),
        //phone: myCustomJoi.string().phoneNumber().required(),
        phone: Joi.string().trim().regex(/^[0-9]{7,10}$/).required(),
        underRU: Joi.boolean()
    };

    return Joi.validate(organizer, schema);
}

exports.organizerSchema = organizerSchema;
exports.Organizer = Organizer;
exports.validateOrganizer = validateOrganizer;