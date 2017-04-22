var mongoose = require('mongoose');
var Promise = require('bluebird');
var Product = require('../models/product');
var Category = require('../models/category');
module.exports = {

  getProducts: function (req, res) {
    var categoryId = req.params.categoryId;

    var findParams = {};
    if (categoryId != undefined) {
      findParams['categoryId'] = (categoryId == 'empty') ? null : categoryId;


    }

    Product.find(findParams, function (err, products) {
      if (err)
        res.status(500).send(err);

      res.json(products);

    })

  },

  getProduct: function (req, res) {
    var id = req.params.id;

    Product.findById(id,
      function (err, product) {

        if (err)
          res.status(500).send(err);

        res.json(product);
      });

  },

  addProduct(req, res)
  {

    var productData = req.body;

    updateProduct(null, productData).then(result => {

      res.status(201).json(result);
    }).catch((err) => {

      res.status(400).json({'err': err});
    });


  },

  saveProduct(req, res)
  {
    var id = req.params.id;
    var productData = req.body;

    updateProduct(id, productData).then((result) => {

      res.status(200).json(result);
    }).catch((err) => {

      res.status(400).json({'err': err});
    });


  },

  deleteProduct(req, res)
  {
    var id = req.params.id;

    Product.remove({_id: id}, function (err) {
      if (err)
        res.status(500).json({'err': err});

      res.json({
        status: 'ok'
      });
    })
  },

}


function updateProduct(productId, productData) {
  return new Promise(function (resolve, reject) {
    Product.findById(productId,
      function (err, product) {
        if (err)
          reject(err);

        if (product == null) {
          product = new Product();
        }

        product.name = productData['name'];
        product.buyingPrice = parseFloat(productData['buyingPrice']);
        product.sellingPrice = parseFloat(productData['sellingPrice']);

        checkCategoryId(productData['categoryId']).then((categoryId) => {
          product.categoryId = categoryId;
          product.save(function (err) {
            if (err)
              reject(err);

            resolve({id: product._id});
          })

        });

      });

  })

}


function checkCategoryId(categoryId) {
  return new Promise(function (resolve, reject) {
    if (categoryId == null) resolve(null);
    else {
      Category.findById(categoryId,
        function (err, category) {
          if (err) {
            resolve(null);
          }
          if (category) resolve(categoryId); else resolve(null);

        });
    }
  });
}

