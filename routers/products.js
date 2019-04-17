const express = require('express') ;
const {authMiddleware} = require('../middleware/auth') ;
const {adminMiddleware} = require('../middleware/admin') ;
const router = express.Router();
const {
    getProducts,
    getProduct,
    addProduct,
    editProduct,
    deleteProduct
} = require('../controllers/product') ;


router.get('/', getProducts) ;

router.get('/:id', getProduct) ;

router.post('/' ,[authMiddleware ,adminMiddleware], addProduct)

router.put('/:id' ,[authMiddleware ,adminMiddleware] ,editProduct)

router.delete('/:id' , [authMiddleware ,adminMiddleware] ,deleteProduct)

module.exports = router ;