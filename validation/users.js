const Joi = require('joi');


const validateUser = (user) => {
    const schema = {
        firstname: Joi.string().required().min(4).max(50) ,
        lastname: Joi.string().required().min(4).max(50) ,
        email: Joi.string().required().min(8).max(100),
        password: Joi.string().required().min(5).max(300),
        address : Joi.object({
            street: Joi.string().required().min(4).max(50) ,
            city: Joi.string().required().min(4).max(50) ,
            state: Joi.string().required().min(4).max(50) ,
        }).required() ,
        isAdmin : Joi.boolean() ,
        phone : Joi.string().required().min(8).max(20)
    };

    const result = Joi.validate(user, schema);
    return result;
    
}

const validateUserEdit = (user) => {
    const schema = {
        firstname: Joi.string().required().min(4).max(50) ,
        lastname: Joi.string().required().min(4).max(50) ,
        email: Joi.string().required().min(8).max(100),
        password: Joi.string().required().min(5).max(300),
        address : Joi.object({
            street: Joi.string().required().min(4).max(50) ,
            city: Joi.string().required().min(4).max(50) ,
            state: Joi.string().required().min(4).max(50) ,
        }).required() ,
        // isAdmin : Joi.boolean() ,
        phone : Joi.string().required().min(8).max(20)
    };

    const result = Joi.validate(user, schema);
    return result;
    
}

module.exports = {
    validateUser,
    validateUserEdit
}