const express = require('express') ;
const {authMiddleware} = require('../middleware/auth') ;
const {adminMiddleware} = require('../middleware/admin') ;
const router = express.Router();
const {
    getCarts,
    getCart,
    addCart,
    editCart,
    deleteCart
} = require('../controllers/cart') ;


router.get('/',[authMiddleware ,adminMiddleware], getCarts) ;

router.get('/:id',authMiddleware , getCart) ;

router.post('/' ,authMiddleware, addCart)
// router.post('/' , (req ,res) => res.send("ojk")) ;

router.put('/:id' ,authMiddleware ,editCart)

router.delete('/:id'  ,authMiddleware ,deleteCart)

module.exports = router ;