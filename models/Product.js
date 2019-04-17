const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schemaObject = {
    name : {
        type :String,
        required :true ,
        minlength : 5 ,
        maxlength :50
    } ,
    price : {
        type :Number,
        required :true ,
        min : 0 ,
        max :30000
    } ,
    quantity : {
        type :Number,
        required :true ,
        min : 0 ,
        max :3000
    } ,
    isFeatured : {
        type :Boolean,
        required :true ,
        default : false
    } ,
    description : {
        type :String,
        required :true ,
        minlength : 20 ,
        maxlength :5000
    } ,
    category : {
        type : new mongoose.Schema({
                name : {
                    type :String,
                    required :true ,
                    minlength : 5 ,
                    maxlength :50
                } })
        ,
        required:true
    } ,
    brand : {
        type : new mongoose.Schema({
                name : {
                    type :String,
                    required :true ,
                    minlength : 2 ,
                    maxlength :50
                } })
        ,
        required:true
    }
}

const productSchema = new Schema(schemaObject);


const Product = mongoose.model('Product', productSchema);

module.exports = Product ;