var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var Category = require('./category');

var CategorySchema = mongoose.model('Category').schema;


var ProductSchema   = new Schema({
	name: {type: String, required: true},
    categoryId :  { type: Schema.ObjectId, ref: 'CategorySchema', default:null },
    buyingPrice : {type:Number, default: 0},
    sellingPrice :  {type:Number, default: 0}
});

module.exports = mongoose.model('Product', ProductSchema);
