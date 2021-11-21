const Level = require("../models/level.model.js");

// Retrieve all Category from the database.
exports.findAll = (req, res) => {
   res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  Level.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Level."
      });
    else {
      let promise = []
      data.map((cv, i) => {
        let pro = new Promise(function (resolve, reject) {
          Level.findByCourseId(cv.id, (err, data2) => {
            if (err) {
              if (err.kind === "not_found") {
                res.status(404).send({
                  message: `Not found Course with id ${cv.id}.`
                });
              } else {
                res.status(500).send({
                  message: "Error retrieving Course with id " + cv.id
                });
              }
            } else {
              if(data2.Total_course!==undefined){
              data[i].Total_course=data2.Total_course.toString();
            }
              resolve(data)
            }
          });
        })
          promise.push(pro)
        })
        Promise.all(promise).then(value => {
          return res.send(data);
        })
    }
  });
};

// Create and Save a new Level
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

  // Create a Level
  const level = new Level({
    name : req.body.name,
    status : req.body.status,
    //created_at : req.body.created_at,
    //modified_at : req.body.modified_at
  });



  Level.findByName(req.body.name,(err, data) => {
    if (err) {
      // Save Level in the database
      Level.create(level, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Level."
          });
        else res.send(data);
      });
      //res.status(500).send({message:'user all redy exist'});
    }else{
      res.status(500).send({message:'level all redy exist'});
    }
  })


  // Save Level in the database
  /*Level.create(level, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Level."
      });
    else res.send(data);
  });*/
};


// Find a single Level with a LevelId
exports.findOne = (req, res) => {
   res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  Level.findById(req.params.levelId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Level with id ${req.params.levelId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Level with id " + req.params.levelId
        });
      }
    } else res.send(data);
  });
};

// Update a Level identified by the levelId in the request
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

  Level.updateById(
    req.params.levelId,
    new Level(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Level with id ${req.params.levelId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Level with id " + req.params.levelId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Level with the specified levelId in the request
exports.delete = (req, res) => {
   res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  Level.remove(req.params.levelId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Level with id ${req.params.levelId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Level with id " + req.params.levelId
        });
      }
    } else res.send({ message: `Level was deleted successfully!` });
  });
};

