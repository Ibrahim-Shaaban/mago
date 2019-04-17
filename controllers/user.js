const {validateUser} = require('../validation/users') ;
const User = require('../models/User') ;
const bcrypt = require('bcrypt') ;
const _ = require('lodash') ;

const getUsers = async(req ,res) => {
    // res.send('get customers')
    try {
        let users = await User.find();
        users = users.map( user => {
            return _.pick(user, [
                '_id', 'firstname', 'lastname' ,'email' ,'address' ,'phone'
            ])
        })

        res.send(users) ;
    } catch (error) {
        console.log(error) ;
    }
}

const getUser = async(req, res) => {
    const {id} = req.params;
    try {
        const user = await User.findById(id);
        res.send(_.pick(user, [
            '_id', 'firstname', 'lastname' ,'email' ,'address' ,'phone'])) ;
    } catch (error) {
        console.log(error) ;
    }
}

const addUser = async(req, res) => {
    const {error} = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if user exist
    const person = await User.findOne({email : req.body.email}) ;
    if (person) return res.status(400).send("user already exist");

    // hash password 
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    try {
        const user = await User.create(req.body) ;
        return res.header('x-authToken' ,user.generateAuthToken() ).send(_.pick(user, [
            '_id', 'firstname', 'lastname' ,'email' ,'address' ,'phone'])) ;
    } catch (error) {
        console.log(error) ;
    }
}

const editUser = async(req, res) => {
    const {error} = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // no error 
    // res.send(req.body) ;
    try {
        const user = await User.findByIdAndUpdate(req.params.id ,req.body ,{new :true});
        res.send(_.pick(user, [
            '_id', 'firstname', 'lastname' ,'email' ,'address' ,'phone'])) ;
    } catch (error) {
        console.log(error) ;
    }
}

const deleteUser = async(req, res) => {
    // res.send(`id : ${req.params.id}`) ;
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        res.send(user) ;
    } catch (error) {
        console.log(error) ;
    }
}

module.exports = {
    getUsers,
    getUser,
    addUser,
    editUser,
    deleteUser
}