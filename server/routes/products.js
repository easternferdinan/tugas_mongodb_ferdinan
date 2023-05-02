const express = require('express');
const productsController = require('../controller/products');
const router = express.Router();

router.get('/', productsController.getAll);
router.post('/add-product', productsController.insertOne);
router.put('/update-product', productsController.updateOne);
router.delete('/delete-product/:id', productsController.deleteOne);

module.exports = router;