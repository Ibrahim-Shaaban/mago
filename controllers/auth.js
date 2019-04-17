const {validateAuth} = require('../validation/auth') ;
const User = require('../models/User') ;
const bcrypt = require('bcrypt') ;




const checkLogIn = async(req, res) => {
    const {error} = validateAuth(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check email
    const person = await User.findOne({email : req.body.email}) ;
    if (!person) return res.status(400).send("Invalid email or password.");

    // check password 
    const validPassword = await bcrypt.compare(req.body.password, person.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const token = person.generateAuthToken();
    return res.send(token);

}

module.exports = {
    checkLogIn
}