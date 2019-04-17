const Joi = require('joi');


const validateBrand = (user) => {
    const schema = {
        name: Joi.string().required().min(2).max(50),
        
    };

    const result = Joi.validate(user, schema);
    return result;
    
}

module.exports = {
    validateBrand
}