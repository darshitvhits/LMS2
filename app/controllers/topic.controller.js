const Topic = require("../models/topic.model.js");

// Retrieve all Topic from the database.
exports.findAll = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  Topic.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving topic."
      });
      else {
        let promise = []
        data.map((cv, i) => {
          let pro = new Promise(function (resolve, reject) {
            Topic.findByCourseId(cv.id, (err, data2) => {
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

// Create and Save a new Topic
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

  // Create a Topic
  const topic = new Topic({
    name : req.body.name,
    status : req.body.status,
    //created_at : req.body.created_at,
    //modified_at : req.body.modified_at
  });



  Topic.findByName(req.body.name,(err, data) => {
    if (err) {
      // Save Topic in the database
      Topic.create(topic, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Topic."
          });
        else res.send(data);
      });
      //res.status(500).send({message:'user all redy exist'});
    }else{
      res.status(500).send({message:'topic all redy exist'});
    }
  })


  // Save Topic in the database
  /*Topic.create(topic, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Topic."
      });
    else res.send(data);
  });*/
};


// Find a single Topic with a TopicId
exports.findOne = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  Topic.findById(req.params.topicId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Topic with id ${req.params.topicId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Topic with id " + req.params.topicId
        });
      }
    } else res.send(data);
  });
};

// Update a Topic identified by the topicId in the request
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

  Topic.updateById(
    req.params.topicId,
    new Topic(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Topic with id ${req.params.topicId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Topic with id " + req.params.topicId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Topic with the specified topicId in the request
exports.delete = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  Topic.remove(req.params.topicId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Topic with id ${req.params.topicId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Topic with id " + req.params.topicId
        });
      }
    } else res.send({ message: `Topic was deleted successfully!` });
  });
};


