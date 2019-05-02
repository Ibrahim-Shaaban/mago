const express = require('express') ;
const app = express();
const cors = require('cors');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi); // add id validation to Joi
const users = require('./routers/users');
const brands = require('./routers/brands') ;
const categories = require('./routers/categories') ;
const products = require('./routers/products') ;
const carts = require('./routers/carts') ;
const mongoose = require('mongoose');
const config = require('config') ;
const auth = require('./routers/auth') ;


// check if (jwtPrivateKey)  is set or not
// must set value for  env varaible mago_jwtPrivateKey 
if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
  }

app.use(express.json()) ;
app.use(cors()) ;
app.use('/api/users' , users) ;
app.use('/api/auth' , auth) ;
app.use('/api/brands' , brands) ;
app.use('/api/categories' , categories) ;
app.use('/api/products' , products) ;
app.use('/api/carts' ,carts) ;
require('./middleware/production')(app) ;


// connect to database
mongoose.connect('mongodb://localhost/mago' ,{ useNewUrlParser: true } )
.then(() => console.log("connected to database")) 
.catch(console.log);


const port = 5000 || process.env.PORT ;

app.get('/api/test', (req, res) => res.send('Hello World!')) ;

app.listen(port, () => console.log(`Example app listening on port ${port}!`))