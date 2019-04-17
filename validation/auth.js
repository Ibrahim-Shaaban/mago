const Joi = require('joi');


const validateAuth = (user) => {
    const schema = {
        email: Joi.string().required().min(8).max(100),
        password: Joi.string().required().min(5).max(300),
    };

    const result = Joi.validate(user, schema);
    return result;
    
}

module.exports = {
    validateAuth
}