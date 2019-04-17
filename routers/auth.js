const express = require('express') ;
const router = express.Router();
const {checkLogIn} = require('../controllers/auth') ;

// login
router.post('/' , checkLogIn)

module.exports = router ;