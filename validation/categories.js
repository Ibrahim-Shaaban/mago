const Joi = require('joi');


const validateCategory = (category) => {
    const schema = {
        name: Joi.string().required().min(4).max(50),
        brands : Joi.array().items(
            Joi.objectId().required()
        ).required()
        
    };

    const result = Joi.validate(category, schema);
    return result;
    
}

module.exports = {
    validateCategory
}