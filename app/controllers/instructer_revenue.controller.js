const Insructer=require('../models/instructer_revenue.model');

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


    // Create a instructer
    const instucter = new Insructer({
        Instructor_revenue_percentage:parseInt(req.body.Instructor_revenue_percentage),
        Admin_revenue_percentage:parseInt(req.body.Admin_revenue_percentage),
    });


    // Save instructer in the database
    Insructer.create(instucter, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the instructer."
            });
        else res.send(data);
    });
}


// Retrieve all instructer from the database.
exports.findAll = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
    //console.log({darshit:req.user.id});
    Insructer.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Instructer."
            });
        else res.send(data);
    });
};


// Find a single instructer with a instructerId
exports.findOne = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
    Insructer.findById(req.params.instructerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found instructer with id ${req.params.instructerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving instructer with id " + req.params.instructerId
                });
            }
        } else res.send(data);
    });
};


// Update a instructer identified by the instructerId in the request
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


    // Create a instructer
    const instucter = new Insructer({
        Instructor_revenue_percentage:parseInt(req.body.Instructor_revenue_percentage),
        Admin_revenue_percentage:parseInt(req.body.Admin_revenue_percentage),
    });

    Insructer.updateById(
        req.params.instructerId,
        instucter,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found instructer with id ${req.params.instructerId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating instructer with id " + req.params.instructerId
                    });
                }
            } else res.send(data);
        }
    );
};



// Delete a instructer with the specified instructerId in the request
exports.delete = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
    Insructer.remove(req.params.instructerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found instructer with id ${req.params.instructerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete instructer with id " + req.params.instructerId
                });
            }
        } else res.send({ message: `instructer was deleted successfully!` });
    });
};