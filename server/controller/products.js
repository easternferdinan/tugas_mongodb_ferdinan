const ProductsModel = require("../model/products");

exports.getAll = async (req, res) => {
    const data = await ProductsModel.find();
    res.send(data);
}

exports.insertOne = (req, res) => {
    const data = {
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        active: req.body.active
    };

    const post = new ProductsModel(data);

    post.save()
        .then(savedData => {
            res.send(savedData);
        })
        .catch(error => {
            console.error(error);
        });
}

exports.updateOne = async (req, res) => {
    const data = {
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        active: req.body.active
    };

    const update = await ProductsModel.updateOne({_id: req.body.id}, data);

    console.log(update.matchedCount + " matched, " + update.modifiedCount + " modified.");
    res.send(data);
}

exports.deleteOne = async (req, res) => {
    ProductsModel.deleteOne({_id: req.params.id})
    .then(data => res.send(data))
    .catch(error => console.error(error));
}