const Joi = require('joi');


const validateProduct = (product) => {
    const schema = {
        name: Joi.string().required().min(5).max(50),
        price : Joi.number().required().min(0).max(30000),
        quantity : Joi.number().required().min(0).max(3000) ,
        isFeatured : Joi.boolean() ,
        description : Joi.string().required().min(20).max(5000),
        categoryId : Joi.objectId().required(),
        brandId : Joi.objectId().required(),
        
    };

    const result = Joi.validate(product, schema);
    return result;
    
}

module.exports = {
    validateProduct
}