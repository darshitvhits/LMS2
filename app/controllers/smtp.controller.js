const Smtp=require('../models/smtp.model');

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
    const smtp = new Smtp({
        protocol:req.body.protocol,
        smtp_host:req.body.smtp_host,
        smtp_port:req.body.smtp_port,
        smtp_username:req.body.smtp_username,
        smtp_password:req.body.smtp_password,
    });


    // Save Smtp in the database
    Smtp.create(smtp, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        else res.send(data);
    });
}


// Retrieve all smtp from the database.
exports.findAll = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
    //console.log({darshit:req.user.id});
    Smtp.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};


// Find a single Smtp with a SystemId
exports.findOne = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
    Smtp.findById(req.params.smtpId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found smtp with id ${req.params.smtpId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving system with id " + req.params.smtpId
                });
            }
        } else res.send(data);
    });
};



// Update a smtp identified by the smtpId in the request
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
    const smtp = new Smtp({
        protocol:req.body.protocol,
        smtp_host:req.body.smtp_host,
        smtp_port:req.body.smtp_port,
        smtp_username:req.body.smtp_username,
        smtp_password:req.body.smtp_password,
    });

    Smtp.updateById(
        req.params.SmtpId,
        smtp,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found smtp with id ${req.params.Smtp}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Smtp with id " + req.params.SmtpId
                    });
                }
            } else res.send(data);
        }
    );
};


// Delete a system with the specified systemId in the request
exports.delete = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
    Smtp.remove(req.params.smtpId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found smtp with id ${req.params.smtpId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete smtp with id " + req.params.smtpId
                });
            }
        } else res.send({ message: `smtp was deleted successfully!` });
    });
};