const Usergroups = require("../models/usergroups.model.js");

// Retrieve all Usergroup from the database.
exports.findAll = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  Usergroups.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving usergroups."
      });
    else res.send(data);
  });
};

// Create and Save a new Usergroups
exports.create = (req, res) => {
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

  // Create a Usergroups
  const usergroups = new Usergroups({
    name : req.body.name,
    status : req.body.status,
    //created_at : req.body.created_at,
    //modified_at : req.body.modified_at
  });


  Usergroups.findByName(req.body.name,(err, data) => {
    if (err) {
      // Save Usergroups in the database
    Usergroups.create(usergroups, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Usergroups."
        });
      else res.send(data);
    });
      //res.status(500).send({message:'user all redy exist'});
    }else{
      res.status(500).send({message:'user all redy exist'});
    }
  })


  // Save Usergroups in the database
 /* Usergroups.create(usergroups, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Usergroups."
      });
    else res.send(data);
  });*/
};


// Find a single Usergroups with a UsergroupsId
exports.findOne = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  Usergroups.findById(req.params.usergroupsId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Usergroups with id ${req.params.usergroupsId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Usergroups with id " + req.params.usergroupsId
        });
      }
    } else res.send(data);
  });
};

// Update a Usergroups identified by the usergroupsId in the request
exports.update = (req, res) => {
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

  console.log(req.body);

  Usergroups.updateById(
    req.params.usergroupsId,
    new Usergroups(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Usergroups with id ${req.params.usergroupsId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Usergroups with id " + req.params.usergroupsId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Usergroups with the specified usergroupsId in the request
exports.delete = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  Usergroups.remove(req.params.usergroupsId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Usergroups with id ${req.params.usergroupsId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Usergroups with id " + req.params.usergroupsId
        });
      }
    } else res.send({ message: `Usergroups was deleted successfully!` });
  });
};


