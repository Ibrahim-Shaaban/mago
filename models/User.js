const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken') ;
const config = require('config') ;

const schemaObject = {
    
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
    password :{
        type :String,
        required :true ,
        minlength : 5 ,
        maxlength :300
    } ,
    address:{
        type : new mongoose.Schema({
            street : {
                type: String,
                minlength :4 ,
                maxlength : 50 ,
                required :true
            } ,
            city : {
                type: String,
                minlength :4 ,
                maxlength : 50 ,
                required :true
            } ,
            state : {
                type: String,
                minlength :4 ,
                maxlength : 50 ,
                required :true
            }
        }) ,
        required :true
        
    } ,
    phone: {
        type:String ,
        required :true ,
        minlength : 8 ,
        maxlength :20
    } ,
    isAdmin : {
        type :Boolean ,
        default : false
    }
}

const userSchema = new Schema(schemaObject);


userSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
  }

const User = mongoose.model('User', userSchema);

module.exports = User ;