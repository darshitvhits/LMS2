const Section = require("../models/section.model.js");

// Retrieve all Section from the database.
exports.findAll = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  Section.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving section."
      });
    else res.send(data);
  });                                                                                                            
};

// Retrieve all Section for given course id from the database.
exports.findByCourseId = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  Section.findByCourseId(req.params.courseId,(err, data) => {
    if (err){
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Section with id ${req.params.courseId}.`
        });}else{
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving section."
      });
    }
    }
    else res.send(data);
  });
};

// Create and Save a new Section
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

  // Create a Section
  const section = new Section({
    title : req.body.title,
    course_id : req.body.course_id,
    sortorder : req.body.sortorder
  });

  // Save Section in the database
  Section.create(section, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Section."
      });
    else res.send(data);
  });
};


// Find a single Section with a SectionId
exports.findOne = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  Section.findById(req.params.sectionId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Section with id ${req.params.sectionId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Section with id " + req.params.sectionId
        });
      }
    } else res.send(data);
  });
};

// Update a Section identified by the sectionId in the request
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
  const section = new Section({
    title : req.body.title,
    course_id : req.body.course_id,
    sortorder : req.body.sortorder
  });
  console.log(req.body);

  Section.updateById(
    req.params.sectionId,
    section,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Section with id ${req.params.sectionId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Section with id " + req.params.sectionId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Section with the specified sectionId in the request
exports.delete = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  Section.remove(req.params.sectionId,req.params.courseId ,(err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Section with id ${req.params.sectionId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Section with id " + req.params.sectionId
        });
      }
    }else res.send(data);
  });
};

// sort section .
exports.setorder = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  Section.setorder(req.body.arrayofIndex,req.body.arrayofID,(err, data) => {
    if (err){
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Section with id ${req.params.courseId}.`
        });}else{
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving section."
      });
    }
    }
    else res.send(data);
  });
};

