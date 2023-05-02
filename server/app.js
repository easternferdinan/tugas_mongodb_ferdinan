const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());

const productsRouter = require("./routes/products");

app.use('/api/', productsRouter);

const port = 3001;
app.listen(port, () => {
    console.log("Server listening on port " + port);
});