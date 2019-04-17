const {validateCart , validateCartEdit} = require('../validation/carts') ;
const Product = require('../models/Product') ;
const User = require('../models/User') ;
const Cart = require('../models/Cart') ;



const getCarts = async(req ,res) => {
    
    try {
        const carts = await Cart.find();
        res.send(carts) ;
    } catch (error) {
        console.log(error) ;
    }
}

const getCart = async(req, res) => {
    const {id} = req.params;
    try {
        const cart = await Cart.findById(id);
        res.send(cart) ;
    } catch (error) {
        console.log(error) ;
    }
}

const addCart = async(req, res) => {
    const {error} = validateCart(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let {customerId ,products} = req.body
    const customer = await User.findById(customerId);
    if (!customer) return res.status(400).send("customer doesn't exist");

    let productsId = []
    products.forEach(product => {
        productsId.push(product.productId);
    });
    
    try {
        
        // get products by id
        let returnedProducts = await Product.find({_id : {$in : productsId}}) ;
        returnedProducts = returnedProducts.map((product, index )=> {
            return {
                _id : product._id ,
                name : product.name,
                price: product.price,
                quantityDemand : products[index].quantityDemand
            }
        })

        let {firstname ,email , lastname , _id} = customer ;
        let customerObj = {firstname ,email , lastname , _id} ;

        // find total amount of cart
        let totalAmount = 0 ;
        returnedProducts.forEach((product) => {
            totalAmount += product.price * product.quantityDemand ;
        })

        let cartObj = {
            customer : customerObj,
            products : returnedProducts,
            totalAmount

        } 
        
        
        const returnedCart = await Cart.create(cartObj) ;
        // return res.send(req.body.brands)
        return res.send(returnedCart)
    } catch (error) {
        console.log(error) ;
    }
}

const editCart = async(req, res) => {
    const {error} = validateCartEdit(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // no error 

    const cart = await Cart.findById(req.params.id) ;
    if(!cart)return res.status(400).send("cart not found");
    
    try {
        let {products} = req.body ;

        let productsId = []
        products.forEach(product => {
            productsId.push(product.productId);
        });

        // get products by id
        let returnedProducts = await Product.find({_id : {$in : productsId}}) ;
        returnedProducts = returnedProducts.map((product, index )=> {
            return {
                _id : product._id ,
                name : product.name,
                price: product.price,
                quantityDemand : products[index].quantityDemand
            }
        })

        // find total amount of cart
        let totalAmount = 0 ;
        returnedProducts.forEach((product) => {
            totalAmount += product.price * product.quantityDemand ;
        })

        let cartObj = {
            products : returnedProducts,
            totalAmount

        } 
        const returnedCart = await Cart.findByIdAndUpdate(req.params.id ,cartObj ,{new :true});
        res.send(returnedCart) ;
    } catch (error) {
        console.log(error) ;
    }
}

const deleteCart = async(req, res) => {
    // res.send(`id : ${req.params.id}`) ;
    try {
        const cart = await Cart.findByIdAndRemove(req.params.id);
        res.send(cart) ;
    } catch (error) {
        console.log(error) ;
    }
}

module.exports = {
     getCarts,
    getCart,
    addCart,
    editCart,
    deleteCart
}