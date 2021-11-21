const Category = require("../models/category.model.js");


// Retrieve all Category from the database.
exports.findAll = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  Category.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Category."
      });
    else {
      let promise = []
      data.map((cv, i) => {
        let pro = new Promise(function (resolve, reject) {
          Category.findnumber(cv.id, (err, data2) => {
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
            //if(data2.Total_section!==undefined){
              //data[i].Total_section=data2.Total_section.toString();
           // }
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

// Create and Save a new Category
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
  if(req.files !== undefined){
    if(req.files.demo_image!==undefined){
    var img = req.files.demo_image[0].path;
    if (img === undefined) {
      img = null;
    } else {
      imagepath=`D:/Darshit/lmsapi/${img}`;
      img=imagepath.replace("\\","/");
    }}else{
      img = null;
    }}
  // Create a Category
  const category = new Category({
    code : req.body.code,
    name : req.body.name,
    parent : req.body.parent,
    slug : req.body.slug,
    status:req.body.status,
    //created_at : req.body.created_at,
    //modified_at : req.body.modified_at,
    //thumbnail : req.body.thumbnail
    thumbnail : img
  });

  Category.findByName(req.body.name,(err, data) => {
    if (err) {
      // Save course in the database
      Category.create(category, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Category."
          });
        else res.send(data);
      });
      //res.status(500).send({message:'user all redy exist'});
    }else{
      res.status(500).send({message:'user all redy exist'});
    }
  })
  // Save Category in the database
  /*Category.create(category, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Category."
      });
    else res.send(data);
  });*/
};


// Find a single Category with a CategoryId
exports.findOne = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  Category.findById(req.params.categoryId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Category with id ${req.params.categoryId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Category with id " + req.params.categoryId
        });
      }
    } else res.send(data);
  });
};

// Update a Category identified by the categoryId in the request
exports.update = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:multipart/form-data"
    );
    res.header("Content-Type", "multipart/form-data");
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);
  if(req.files !== undefined){
    if(req.files.demo_image!==undefined){
    var img = req.files.demo_image[0].path;
    if (img === undefined) {
      img = null;
    } else {
      imagepath=`D:/Darshit/lmsapi/${img}`;
      img=imagepath.replace("\\","/");
    }}else{
      img = null;
    }
    }
  Category.updateById(
    req.params.categoryId,
    new Category(req.body),img,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Category with id ${req.params.categoryId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Category with id " + req.params.categoryId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Category with the specified categoryId in the request
exports.delete = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  Category.remove(req.params.categoryId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Category with id ${req.params.categoryId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Category with id " + req.params.categoryId
        });
      }
    } else res.send({ message: `Category was deleted successfully!` });
  });
};

//count lession and session.
exports.course=(req, res) => {
  Category.findnumber(req.params.categoryId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Course with id ${req.params.courseId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Course with id " + req.params.courseId
        });
      }
    } else res.send(data);
  });
};