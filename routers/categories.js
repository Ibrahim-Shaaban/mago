const express = require('express') ;
const {authMiddleware} = require('../middleware/auth') ;
const {adminMiddleware} = require('../middleware/admin') ;
const router = express.Router();
const {
    getCategories,
    getCategory,
    addCategory,
    editCategory,
    deleteCategory
} = require('../controllers/category') ;


router.get('/', getCategories) ;

router.get('/:id', getCategory) ;

router.post('/' ,[authMiddleware ,adminMiddleware], addCategory)

router.put('/:id' ,[authMiddleware ,adminMiddleware] ,editCategory)

router.delete('/:id' , [authMiddleware ,adminMiddleware] ,deleteCategory)

module.exports = router ;