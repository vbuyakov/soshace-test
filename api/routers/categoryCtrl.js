var mongoose = require('mongoose');
var Category = require('../models/category');
var Product = require('../models/product');

module.exports = {

    getCategories: function (req, res) {

        Category.find({}, function (err, categories) {
            if (err)
                res.status(500).send(err);

            res.json(categories);

        })
    },

    getCategory: function (req, res) {
        var id = req.params.id;

        Category.findById(id,
            function (err, category) {
            if (err)
                    res.status(500).send(err);

                res.json(category);
            });
    },

    addCategory(req, res)
    {
        var categoryData = req.body;
        var category = new Category();
        category.name = categoryData['name'];

        category.save(function (err) {
            if (err)
                res.status(400).json({'err': err});

            res.status(201).json({id: category._id});
        })

    },

    saveCategory(req, res, CategoryData)
    {
        var categoryData = req.params.CategoryData;
        if (!categoryData)  return res.status(400).json({'err': 'Empty data'});

        Category.findById(id,
            function (err, category) {
                if (err)
                    res.status(400).send(err);

                category.name = categoryData['name'];
                category.save(function (err) {
                    if (err)
                        res.status(400).json({'err': err});

                    res.status(201).json({id: category._id});
                })
            });
    },

    deleteCategory(req, res, id)
    {
        var id = req.params.id;

        Product.update({"categoryId":id},{"categoryId":null},{ multi: true }, function (err,raw) {
            if (err)
                res.status(500).json({'err': err});


            Category.remove({_id: id}, function (err) {
                if (err)
                    res.status(500).json({'err': err});

                res.json({
                    status: 'ok'
                });
            })
            
        })


    }

}