const Menuitem = require("../models/menuitem.model");


// Retrieve all meniitem from the database.
exports.findAll = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
      );
      res.header("Content-Type", "application/x-www-form-urlencoded");
    Menuitem.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving menu."
        });
      else res.send(data);
    });
  };


// Create and Save a new menuitem
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
  
    // Create a menuitem
    const menuitem = new Menuitem({
        id_menu:req.body.id_menu,
        id_page :req.body.id_page,
        title :req.body.title,
        link :req.body.link,
        sortorder:req.body.sortorder,
        status:req.body.status,
        type:req.body.type,
        //modified_at:req.body.modified_at,
        //created_at:req.body.created_at,
    });
  
  
  
    Menuitem.findByName(req.body.title,(err, data) => {
      if (err) {
        // Save Topic in the database
        Menuitem.create(menuitem, (err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the menuitem."
            });
          else res.send(data);
        });
        //res.status(500).send({message:'user all redy exist'});
      }else{
        res.status(500).send({message:'menuitem all redy exist'});
      }
    })
};


// Find a single Menuiotem with a MenuitemId
exports.findOne = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
      );
      res.header("Content-Type", "application/x-www-form-urlencoded");
    Menuitem.findById(req.params.menuitemId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found menuitem with id ${req.params.menuitemId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving menuitem with id " + req.params.menuitemId
          });
        }
      } else res.send(data);
    });
  };



  // Update a Menuitem identified by the MenuitemId in the request
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
    const menuitem = new Menuitem({
        id_menu:req.body.id_menu,
        id_page :req.body.id_page,
        title :req.body.title,
        link :req.body.link,
        sortorder:req.body.sortorder,
        status:req.body.status,
        type:req.body.type,
        //modified_at:req.body.modified_at,
        //created_at:req.body.created_at,
    });

    Menuitem.updateById(
      req.params.menuitemId,
      menuitem,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found menuitem with id ${req.params.menuitemId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating menuitem with id " + req.params.menuitemId
            });
          }
        } else res.send(data);
      }
    );
  };



  // Delete a Menuitem with the specified MenuId in the request
exports.delete = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
      );
      res.header("Content-Type", "application/x-www-form-urlencoded");
    Menuitem.remove(req.params.menuitemId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found menuitem with id ${req.params.menuitemId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete menu with id " + req.params.menuiemId
          });
        }
      } else res.send({ message: `menuitem was deleted successfully!` });
    });
  };