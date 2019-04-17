const {validateBrand} = require('../validation/brands') ;
const Brand = require('../models/Brand') ;
const {capitalize} = require('../functions/general') ;


const getBrands = async(req ,res) => {
    
    try {
        const brands = await Brand.find();
        res.send(brands) ;
    } catch (error) {
        console.log(error) ;
    }
}

const getBrand = async(req, res) => {
    const {id} = req.params;
    try {
        const brand = await Brand.findById(id);
        res.send(brand) ;
    } catch (error) {
        console.log(error) ;
    }
}

const addBrand = async(req, res) => {
    const {error} = validateBrand(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if Brand exist
    req.body.name = capitalize(req.body.name) ;
    const brand = await Brand.findOne({name : req.body.name}) ;
    if (brand) return res.status(400).send("Brand already exist");
    

    try {
        
        const returnedBrand = await Brand.create(req.body) ;
        return res.send(returnedBrand)
    } catch (error) {
        console.log(error) ;
    }
}

const editBrand = async(req, res) => {
    const {error} = validateBrand(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // no error 
    
    try {
        req.body.name = capitalize(req.body.name) ;
        const brand = await Brand.findByIdAndUpdate(req.params.id ,req.body ,{new :true});
        res.send(brand) ;
    } catch (error) {
        console.log(error) ;
    }
}

const deleteBrand = async(req, res) => {
    // res.send(`id : ${req.params.id}`) ;
    try {
        const brand = await Brand.findByIdAndRemove(req.params.id);
        res.send(brand) ;
    } catch (error) {
        console.log(error) ;
    }
}

module.exports = {
    getBrands,
    getBrand,
    addBrand,
    editBrand,
    deleteBrand
}