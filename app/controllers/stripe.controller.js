const Stripe=require('../models/stripe.model');

// Create and Save a new system
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
    const stripe = new Stripe({
        active:req.body.active,
        mode:req.body.mode,
        stripe_currency:req.body.stripe_currency,
        test_secret_key:req.body.test_secret_key,
        test_public_key:req.body.test_public_key,
        live_secret_key:req.body.live_secret_key,
        live_public_key:req.body.live_public_key,
    });


    // Save stripe in the database
    Stripe.create(stripe, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        else res.send(data);
    });
}



// Retrieve all stripe from the database.
exports.findAll = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
    //console.log({darshit:req.user.id});
    Stripe.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};


// Find a single stripe with a StripeId
exports.findOne = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
    Stripe.findById(req.params.stripeId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found stripe with id ${req.params.stripeId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving stripe with id " + req.params.stripeId
                });
            }
        } else res.send(data);
    });
};


// Update a stripe identified by the stripeId in the request
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
    const stripe = new Stripe({
        active:req.body.active,
        mode:req.body.mode,
        stripe_currency:req.body.stripe_currency,
        test_secret_key:req.body.test_secret_key,
        test_public_key:req.body.test_public_key,
        live_secret_key:req.body.live_secret_key,
        live_public_key:req.body.live_public_key,
    });


    Stripe.updateById(
        req.params.stripeId,
        stripe,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found stripe with id ${req.params.stripeId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Smtp with id " + req.params.stripeId
                    });
                }
            } else res.send(data);
        }
    );
};


// Delete a stripe with the specified sripeId in the request
exports.delete = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
    Stripe.remove(req.params.stripeId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found stripe with id ${req.params.stripeId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete stripe with id " + req.params.stripeId
                });
            }
        } else res.send({ message: `stripe was deleted successfully!` });
    });
};