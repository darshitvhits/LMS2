const Subtitles = require("../models/subtitles.model.js");

// Retrieve all Subtitles from the database.
exports.findAll = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  Subtitles.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Subtitles."
      });
      else {
        let promise = []
        data.map((cv, i) => {
          let pro = new Promise(function (resolve, reject) {
            Subtitles.findByCourseId(cv.id, (err, data2) => {
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
                if (data2.Total_course !== undefined) {
                  data[i].Total_course = data2.Total_course.toString();
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

// Create and Save a new Subtitles
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

  // Create a Subtitles
  const subtitles = new Subtitles({
    name : req.body.name,
    status : req.body.status,
    //created_at : req.body.created_at,
    //modified_at : req.body.modified_at
  });



  Subtitles.findByName(req.body.name,(err, data) => {
    if (err) {
      // Save Subtitles in the database
      Subtitles.create(subtitles, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Subtitles."
          });
        else res.send(data);
      });
      //res.status(500).send({message:'user all redy exist'});
    }else{
      res.status(500).send({message:'subtitel all redy exist'});
    }
  })

  


  // Save Subtitles in the database
  /*Subtitles.create(subtitles, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Subtitles."
      });
    else res.send(data);
  });*/
};


// Find a single Subtitles with a SubtitlesId
exports.findOne = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  Subtitles.findById(req.params.subtitlesId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Subtitles with id ${req.params.subtitlesId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Subtitles with id " + req.params.subtitlesId
        });
      }
    } else res.send(data);
  });
};

// Update a Subtitles identified by the subtitlesId in the request
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

  Subtitles.updateById(
    req.params.subtitlesId,
    new Subtitles(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Subtitles with id ${req.params.subtitlesId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Subtitles with id " + req.params.subtitlesId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Subtitles with the specified subtitlesId in the request
exports.delete = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  Subtitles.remove(req.params.subtitlesId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Subtitles with id ${req.params.subtitlesId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Subtitles with id " + req.params.subtitlesId
        });
      }
    } else res.send({ message: `Subtitles was deleted successfully!` });
  });
};
