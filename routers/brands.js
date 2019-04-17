const express = require('express') ;
const {authMiddleware} = require('../middleware/auth') ;
const {adminMiddleware} = require('../middleware/admin') ;
const router = express.Router();
const {
    getBrands,
    getBrand,
    addBrand,
    editBrand,
    deleteBrand
} = require('../controllers/brand') ;


router.get('/', getBrands) ;

router.get('/:id', getBrand) ;

router.post('/' ,[authMiddleware ,adminMiddleware], addBrand)

router.put('/:id' ,[authMiddleware ,adminMiddleware] ,editBrand)

router.delete('/:id' , [authMiddleware ,adminMiddleware] ,deleteBrand)

module.exports = router ;