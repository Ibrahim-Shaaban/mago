const {validateProduct} = require('../validation/products') ;
const Product = require('../models/Product') ;
const Brand = require('../models/Brand') ;
const Category = require('../models/Category') ;
const {capitalize} = require('../functions/general') ;


const getProducts = async(req ,res) => {
    
    try {
        const products = await Product.find();
        res.send(products) ;
    } catch (error) {
        console.log(error) ;
    }
}

const getProduct = async(req, res) => {
    const {id} = req.params;
    try {
        const product = await Product.findById(id);
        res.send(product) ;
    } catch (error) {
        console.log(error) ;
    }
}

const addProduct = async(req, res) => {
    const {error} = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let{name ,price ,quantity ,description ,categoryId ,brandId} = req.body
    // check if Product exist
    name = capitalize(name) ;
    const product = await Product.findOne({name : name}) ;
    if (product) return res.status(400).send("Product already exist");

    // check if brand exist
    let brand = await Brand.findById(brandId) 
    if (!brand) return res.status(400).send("brand doesn't exist");

    // check if category exist
    let category = await Category.findById(categoryId) 
    if (!category) return res.status(400).send("category doesn't exist");

    brand._id = brandId ;
    category._id = categoryId ;

    let productObj = {
        name ,price ,quantity ,description ,category ,brand
    }
    
    if (req.body.isFeatured) productObj.isFeatured = req.body.isFeatured;

    try {
        
        const returnedProduct = await Product.create(productObj) ;
        return res.send(returnedProduct)
    } catch (error) {
        console.log(error) ;
    }
}

const editProduct = async(req, res) => {
    const {error} = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // no error 
    let{name ,price ,quantity ,description ,categoryId ,brandId} = req.body
    // check if Product exist
    name = capitalize(name) ;
    const product = await Product.findOne({name : name}) ;
    if (product) return res.status(400).send("Product already exist");

    // check if brand exist
    let brand = await Brand.findById(brandId) 
    if (!brand) return res.status(400).send("brand doesn't exist");

    // check if category exist
    let category = await Category.findById(categoryId) 
    if (!category) return res.status(400).send("category doesn't exist");

    brand._id = brandId ;
    category._id = categoryId ;

    let productObj = {
        name ,price ,quantity ,description ,category ,brand
    }
    
    if (req.body.isFeatured) productObj.isFeatured = req.body.isFeatured;
    
    try {
        
        const returnnedProduct = await Product.findByIdAndUpdate(req.params.id ,productObj ,{new :true});
        res.send(returnnedProduct) ;
    } catch (error) {
        console.log(error) ;
    }
}

const deleteProduct = async(req, res) => {
    // res.send(`id : ${req.params.id}`) ;
    try {
        const product = await Product.findByIdAndRemove(req.params.id);
        res.send(product) ;
    } catch (error) {
        console.log(error) ;
    }
}

module.exports = {
    getProducts,
    getProduct,
    addProduct,
    editProduct,
    deleteProduct
}