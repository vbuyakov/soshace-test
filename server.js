var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');

var productCtrl = require('./api/routers/productCtrl');
var categoryCtrl = require('./api/routers/categoryCtrl');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3055; // set our port

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/soshace');
mongoose.Promise = require('bluebird');

// ROUTES FOR  API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function (req, res, next) {
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({message: 'Welcome to SOSHACE Test API!'});
});

//Products
router.get('/products/category=:categoryId?', productCtrl.getProducts);

router.route('/products')
    .get(productCtrl.getProducts)
    .post(productCtrl.addProduct);


router.route('/products/:id')
    .get(productCtrl.getProduct)
    .put(productCtrl.saveProduct)
    .delete(productCtrl.deleteProduct);

//Categories
router.route('/categories')
    .get(categoryCtrl.getCategories)
    .post(categoryCtrl.addCategory);

router.route('/categories/:id')
    .get(categoryCtrl.getCategory)
    .put(categoryCtrl.saveCategory)
    .delete(categoryCtrl.deleteCategory);

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);
// Add front-end routing
app.use('/', express.static('dist'));
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server started on PORT: ' + port);
