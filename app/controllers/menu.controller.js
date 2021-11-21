const Menu = require("../models/menu.model");




// Retrieve all menu from the database.
exports.findAll = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
      );
      res.header("Content-Type", "application/x-www-form-urlencoded");
    Menu.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving menu."
        });
      else res.send(data);
    });
  };




// Create and Save a new menu
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
    const menu = new Menu({
        title : req.body.title,
        slug : req.body.slug,
        position:req.body.position,
        status:req.body.status,
        //created_at :req.body.created_at,
        //modified_at :req.body.modified_at,
    });
  
  
  
    Menu.findByName(req.body.title,(err, data) => {
      if (err) {
        // Save Topic in the database
        Menu.create(menu, (err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the menu."
            });
          else res.send(data);
        });
        //res.status(500).send({message:'user all redy exist'});
      }else{
        res.status(500).send({message:'topic all redy exist'});
      }
    })
};
  


// Find a single menu with a MenuId
exports.findOne = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
      );
      res.header("Content-Type", "application/x-www-form-urlencoded");
    Menu.findById(req.params.menuId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Topic with id ${req.params.menuId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Topic with id " + req.params.menuId
          });
        }
      } else res.send(data);
    });
  };



  // Update a Menu identified by the MenuId in the request
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
    const menu = new Menu({
        title : req.body.title,
        slug : req.body.slug,
        position:req.body.position,
        status:req.body.status,
       //created_at :req.body.created_at,
        //modified_at :req.body.modified_at,
    });

    Menu.updateById(
      req.params.menuId,
      menu,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found menu with id ${req.params.menuId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating menu with id " + req.params.menuId
            });
          }
        } else res.send(data);
      }
    );
  };



  // Delete a menu with the specified menuId in the request
exports.delete = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
      );
      res.header("Content-Type", "application/x-www-form-urlencoded");
    Menu.remove(req.params.menuId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found menu with id ${req.params.menuId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete menu with id " + req.params.menuId
          });
        }
      } else res.send({ message: `Topic was deleted successfully!` });
    });
  };