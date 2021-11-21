const Currency=require('../models/currencysetting.model');


// Create and Save a new currency
exports.create = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }


    // Create a system
    const currency = new Currency({
        system_currency:req.body.system_currency,
        currency_position:req.body.currency_position
    });


    // Save currency in the database
    Currency.create(currency, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        else res.send(data);
    });
}

// Retrieve all currency from the database.
exports.findAll = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
    //console.log({darshit:req.user.id});
    Currency.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};


// Find a single currency with a currencyId
exports.findOne = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
    Currency.findById(req.params.currencyId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found smtp with id ${req.params.currencyId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving system with id " + req.params.currencyId
                });
            }
        } else res.send(data);
    });
};


// Update a currency identified by the currencyId in the request
exports.update = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }


    // Create a system
    const currency = new Currency({
        system_currency:req.body.system_currency,
        currency_position:req.body.currency_position
    });

    Currency.updateById(
        req.params.currencyId,
        currency,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found currency with id ${req.params.currencyId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating currency with id " + req.params.currencyId
                    });
                }
            } else res.send(data);
        }
    );
};


// Delete a currency with the specified currencyId in the request
exports.delete = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
    Currency.remove(req.params.currencyId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found currency with id ${req.params.currencyId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete currency with id " + req.params.currencyId
                });
            }
        } else res.send({ message: `currency was deleted successfully!` });
    });
};