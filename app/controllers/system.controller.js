const System=require('../models/system.model');



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
    const system = new System({
        name: req.body.name,
        title: req.body.title,
        keywords: req.body.keywords,
        description: req.body.description,
        Author: req.body.Author,
        Slogan: req.body.Slogan,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        youtube_api_key: req.body.youtube_api_key,
        vimeo_api_key: req.body.vimeo_api_key,
        student_email_verification: req.body.student_email_verification,
        footer_text: req.body.footer_text,
        footer_link: req.body.footer_link
    });


    // Save System in the database
    System.create(system, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        else res.send(data);
    });
}


// Retrieve all system from the database.
exports.findAll = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
    //console.log({darshit:req.user.id});
    System.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};



// Find a single System with a SystemId
exports.findOne = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
    System.findById(req.params.systemId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found system with id ${req.params.systemId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving system with id " + req.params.systemId
                });
            }
        } else res.send(data);
    });
};



// Update a system identified by the systemId in the request
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
    const system = new System({
        name: req.body.name,
        title: req.body.title,
        keywords: req.body.keywords,
        description: req.body.description,
        Author: req.body.Author,
        Slogan: req.body.Slogan,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        youtube_api_key: req.body.youtube_api_key,
        vimeo_api_key: req.body.vimeo_api_key,
        student_email_verification: req.body.student_email_verification,
        footer_text: req.body.footer_text,
        footer_link: req.body.footer_link
    });
    console.log(req.body);

    System.updateById(
        req.params.SystemId,
        system,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found system with id ${req.params.SystemId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating System with id " + req.params.SystemId
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
    System.remove(req.params.systemId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found system with id ${req.params.systemId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete system with id " + req.params.systemId
                });
            }
        } else res.send({ message: `system was deleted successfully!` });
    });
};
  