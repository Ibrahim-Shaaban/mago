const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schemaObject = {
    customer : {
        type :new mongoose.Schema({
            firstname :{
                type :String,
                required :true ,
                minlength : 4 ,
                maxlength :50
            } ,
            lastname :{
                type :String,
                required :true ,
                minlength : 4 ,
                maxlength :50
            } ,
            email :{
                type :String,
                required :true ,
                unique :true,
                minlength : 7 ,
                maxlength :100
            } ,
        }),
        required :true ,
        minlength : 5 ,
        maxlength :50
    } ,

    products : {
        type : [
            new mongoose.Schema({
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
                quantityDemand :{
                    type: Number,
                    required :true ,
                    min : 1 ,
                    max : 10
                }
            })
        ] ,
        required:true
    } ,
    totalAmount : {
        type: Number,
        required :true ,
        min: 0
    }
}

const cartSchema = new Schema(schemaObject);


const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart ;