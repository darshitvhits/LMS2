const Language = require("../models/language.model.js");

// Retrieve all Language from the database.
exports.findAll = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type:application/x-www-form-urlencoded"
  );
  res.header("Content-Type", "application/x-www-form-urlencoded");
  Language.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Language."
      });
    else {
      let promise = []
      data.map((cv, i) => {
        let pro = new Promise(function (resolve, reject) {
          Language.findByCourseId(cv.id, (err, data2) => {
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

// Create and Save a new Language
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

  // Create a Language
  const language = new Language({
    name : req.body.name,
    status : req.body.status,
    //created_at : req.body.created_at,
    //modified_at : req.body.modified_at
  });




  Language.findByName(req.body.name,(err, data) => {
    if (err) {
      // Save Language in the database
      Language.create(language, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Language."
          });
        else res.send(data);
      });
      //res.status(500).send({message:'user all redy exist'});
    }else{
      res.status(500).send({message:'language all redy exist'});
    }
  })

  // Save Language in the database
  /*Language.create(language, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Language."
      });
    else res.send(data);
  });*/
};


// Find a single Language with a LanguageId
exports.findOne = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  Language.findById(req.params.languageId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Language with id ${req.params.languageId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Language with id " + req.params.languageId
        });
      }
    } else res.send(data);
  });
};

// Update a Language identified by the languageId in the request
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

  Language.updateById(
    req.params.languageId,
    new Language(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Language with id ${req.params.languageId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Language with id " + req.params.languageId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Language with the specified languageId in the request
exports.delete = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  Language.remove(req.params.languageId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Language with id ${req.params.languageId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Language with id " + req.params.languageId
        });
      }
    } else res.send({ message: `Language was deleted successfully!` });
  });
};
