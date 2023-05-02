const mongoose = require("../config/mongoose");
const Schema = mongoose.Schema;

const Products = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        default: false
    }
});

const ProductsModel = mongoose.model("products", Products);

module.exports = ProductsModel;