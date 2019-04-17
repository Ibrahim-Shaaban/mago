const {validateCategory} = require('../validation/categories') ;
const Category = require('../models/Category') ;
const Brand = require('../models/Brand') ;
const {capitalize} = require('../functions/general') ;


const getCategories = async(req ,res) => {
    
    try {
        const categories = await Category.find();
        res.send(categories) ;
    } catch (error) {
        console.log(error) ;
    }
}

const getCategory = async(req, res) => {
    const {id} = req.params;
    try {
        const category = await Category.findById(id);
        res.send(category) ;
    } catch (error) {
        console.log(error) ;
    }
}

const addCategory = async(req, res) => {
    const {error} = validateCategory(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if Category exist
    req.body.name = capitalize(req.body.name) ;
    const category = await Category.findOne({name : req.body.name}) ;
    if (category) return res.status(400).send("Category already exist");
    

    try {
        let requestedBrands = req.body.brands ;
        // get brands by id
        let brands = await Brand.find({_id : {$in : requestedBrands}}) ;
        brands = brands.map(brand => {
            return {
                _id : brand._id ,
                name : brand.name
            }
        })

        let categoryObj = {
            name : req.body.name,
            brands : brands
        } 
        
        
        const returnedCategory = await Category.create(categoryObj) ;
        // return res.send(req.body.brands)
        return res.send(returnedCategory)
    } catch (error) {
        console.log(error) ;
    }
}

const editCategory = async(req, res) => {
    const {error} = validateCategory(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // no error 
    
    try {
        req.body.name = capitalize(req.body.name) ;
        let requestedBrands = req.body.brands ;
        // get brands
        let brands = await Brand.find({_id : {$in : requestedBrands}}) ;
        brands = brands.map(brand => {
            return {
                _id : brand._id ,
                name : brand.name
            }
        })

        let categoryObj = {
            name : req.body.name,
            brands : brands
        } 
        const category = await Category.findByIdAndUpdate(req.params.id ,categoryObj ,{new :true});
        res.send(category) ;
    } catch (error) {
        console.log(error) ;
    }
}

const deleteCategory = async(req, res) => {
    // res.send(`id : ${req.params.id}`) ;
    try {
        const category = await Category.findByIdAndRemove(req.params.id);
        res.send(category) ;
    } catch (error) {
        console.log(error) ;
    }
}

module.exports = {
    getCategories,
    getCategory,
    addCategory,
    editCategory,
    deleteCategory
}