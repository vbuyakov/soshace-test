var mongoose = require('mongoose');
var Product = require('../models/product');

module.exports = {

    getProducts: function (req, res) {
        var categoryId = req.params.categoryId;

        var findParams = {};
        if (categoryId != undefined) {
            findParams['categoryId'] = (categoryId == 'empty') ? null : categoryId;


        }

        console.log("categoryID: ", categoryId);
        console.log("findParams",findParams);

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


        var product = new Product();
        product.name = productData['name'];
        product.buyingPrice = parseFloat(productData['buyingPrice']);
        product.sellingPrice = parseFloat(productData['sellingPrice']);
        product.categoryId = productData['categoryId'];

        product.save(function (err) {
            if (err)
                res.status(400).json({'err': err});

            res.status(201).json({id: product._id});


        })


    },

    saveProduct(req, res)
    {
        var id = req.params.id;
        var productData = req.body;

        Product.findById(id,
            function (err, product) {
                if (err)
                    res.status(400).send(err);
                if(product == null)
                {
                  product = new Product();
                }

                product.name = productData['name'];
                product.buyingPrice = parseFloat(productData['buyingPrice']);
                product.sellingPrice = parseFloat(productData['sellingPrice']);
                product.categoryId = productData['categoryId'];

                product.save(function (err) {
                    if (err)
                        res.status(400).json({'err': err});

                    res.status(201).json({id: product._id});
                })
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


    }

}
