const express = require('express') ;
const {authMiddleware} = require('../middleware/auth') ;
const {adminMiddleware} = require('../middleware/admin') ;
const router = express.Router();
const {
    getUsers,
    getUser,
    addUser,
    editUser,
    deleteUser
} = require('../controllers/user') ;


router.get('/',[authMiddleware ,adminMiddleware] , getUsers) ;

router.get('/:id' ,authMiddleware, getUser) ;

router.post('/' , addUser)

router.put('/:id' , authMiddleware, editUser)

router.delete('/:id' ,[authMiddleware , adminMiddleware] , deleteUser)

module.exports = router ;