const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schemaObject = {
    name : {
        type :String,
        required :true ,
        minlength : 5 ,
        maxlength :50
    } ,
    brands : {
        type : [
            new mongoose.Schema({
                name : {
                    type :String,
                    required :true ,
                    minlength : 2 ,
                    maxlength :50
                }
            })
        ] ,
        required:true
    }
}

const categorySchema = new Schema(schemaObject);


const Category = mongoose.model('Category', categorySchema);

module.exports = Category ;