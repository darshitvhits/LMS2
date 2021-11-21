const Website=require('../models/websitesetting.model');





// Create and Save a new website
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
    let img = req.file;
  console.log(img);
  if (img === undefined) {
    img = null;
  } else {
    imagepath=`http://35.203.110.48:3000/${img.path}`;
    img=imagepath.replace("\\","/");
    //img = imagepath;
  }  
  
    // Create a website
    const website = new Website( {
        recaptcha_sitekey :req.body.recaptcha_sitekey,
        recaptcha_secretkey :req.body.recaptcha_secretkey,
        cookie_status :req.body.cookie_status,
        cookie_note :req.body.cookie_note,
        cookie_policy :req.body.cookie_policy,
        terms_and_condition :req.body.terms_and_condition,
        privacy_policy :req.body.privacy_policy,
        logo:img,
      });
    
    // Save website in the database
    Website.create(website, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      else res.send(data);
    });
  };


// Find a single Website with a WebsiteId
exports.findOne = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
      );
      res.header("Content-Type", "application/x-www-form-urlencoded");
    Website.findById(req.params.websiteId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found website with id ${req.params.websiteId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving website with id " + req.params.websiteId
          });
        }
      } else res.send(data);
    });
  };


// Retrieve all website from the database.
exports.findAll = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
      );
      res.header("Content-Type", "application/x-www-form-urlencoded");
      //console.log({darshit:req.user.id});
    Website.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      else res.send(data);
    });
  };
  


  // Update a Website identified by the websiteId in the request
exports.update = async(req, res) => {
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
   
    let img = req.file;
  console.log(img);
  if (img === undefined) {
    img = null;
  } else {
    imagepath=`http://35.203.110.48:3000/${img.path}`;
    img=imagepath.replace("\\","/");
    //img = imagepath;
  }  
  
    // Create a website
    const website = new Website( {
        recaptcha_sitekey :req.body.recaptcha_sitekey,
        recaptcha_secretkey :req.body.recaptcha_secretkey,
        cookie_status :req.body.cookie_status,
        cookie_note :req.body.cookie_note,
        cookie_policy :req.body.cookie_policy,
        terms_and_condition :req.body.terms_and_condition,
        privacy_policy :req.body.privacy_policy,
        logo:img,
      });
  
    Website.updateById(
      req.params.websiteId,
      website,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${req.params.websiteId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating User with id " + req.params.websiteId
            });
          }
        } else res.send(data);
      }
    );
  };



// Delete a website with the specified websiteId in the request
exports.delete = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
      );
      res.header("Content-Type", "application/x-www-form-urlencoded");
    Website.remove(req.params.websiteId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found website with id ${req.params.websiteId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete website with id " + req.params.websiteId
          });
        }
      } else res.send({ message: `website was deleted successfully!` });
    });
  };