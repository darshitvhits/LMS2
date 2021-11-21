const Publicinsructer=require('../models/public_instructer.model');

// Create and Save a new public instructer
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
    const publicinstucter = new Publicinsructer({
        allow_public_instructor:req.body.allow_public_instructor,
        Instructor_application_note:req.body.Instructor_application_note,
    });


    // Save instructer in the database
    Publicinsructer.create(publicinstucter, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the publicinstucter."
            });
        else res.send(data);
    });
}


// Retrieve all publicinstructer from the database.
exports.findAll = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
    //console.log({darshit:req.user.id});
    Publicinsructer.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving publicinstructer."
            });
        else res.send(data);
    });
};



// Find a single publicinstructer with a publicinstructerId
exports.findOne = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
    Publicinsructer.findById(req.params.publicinstructerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found publicinstructer with id ${req.params.publicinstructerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving instructer with id " + req.params.publicinstructerId
                });
            }
        } else res.send(data);
    });
};




// Update a publicinstructer identified by the publicinstructerId in the request
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
    const publicinstucter = new Publicinsructer({
        allow_public_instructor:req.body.allow_public_instructor,
        Instructor_application_note:req.body.Instructor_application_note,
    });

    Publicinsructer.updateById(
        req.params.publicinstructerId,
        publicinstucter ,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found instructer with id ${req.params.publicinstructerId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating instructer with id " + req.params.publicinstructerId
                    });
                }
            } else res.send(data);
        }
    );
};


// Delete a publicinstructer with the specified publicinstructerId in the request
exports.delete = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
    Publicinsructer.remove(req.params.publicinstructerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found publicinstructer with id ${req.params.publicinstructerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete publicinstructer with id " + req.params.publicinstructerId
                });
            }
        } else res.send({ message: `publicinstructer was deleted successfully!` });
    });
};