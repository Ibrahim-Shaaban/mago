const Joi = require('joi');


const validateCart = (cart) => {
    const schema = {
        customerId : Joi.objectId().required(),
        products : Joi.array().items(
            {
                productId :Joi.objectId().required(),
                quantityDemand: Joi.number().required().min(1).max(10)
            }
        ).required(), 
    };

    const result = Joi.validate(cart, schema);
    return result;
    
}

const validateCartEdit = (cart) => {
    const schema = {
        products : Joi.array().items(
            {
                productId :Joi.objectId().required(),
                quantityDemand: Joi.number().required().min(1).max(10)
            }
        ).required(), 
    };

    const result = Joi.validate(cart, schema);
    return result;
    
}

module.exports = {
    validateCart,
    validateCartEdit
}