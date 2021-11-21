const Order=require('../models/order.model');
const Cart=require('../models/cart.model')
// Retrieve all menu from the database.
exports.findAll = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
    Order.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving menu."
            });
        else res.send(data);
    });
};



//view order detail
exports.view = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
    Order.view(req.params.orderId,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving menu."
            });
        else res.send(data);
    });
};

