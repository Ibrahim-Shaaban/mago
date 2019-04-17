const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schemaObject = {
    name : {
        type :String,
        required :true ,
        minlength : 2 ,
        maxlength :50
    }
}

const brandSchema = new Schema(schemaObject);


const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand ;