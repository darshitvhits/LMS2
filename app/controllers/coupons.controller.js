const Coupon=require('../models/coupons.model');


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
  req.body.expire_at=req.body.expire_at.split("/").reverse();
  var tmp = req.body.expire_at[2];
  req.body.expire_at[2] = req.body.expire_at[1];
  req.body.expire_at[1] = tmp;
  req.body.expire_at = req.body.expire_at.join("-");
  // Create a course
  const coupon = new Coupon({
    code : req.body.code,
    type : req.body.type,
    amount: req.body.amount,
    expire_at:req.body.expire_at,
    max_allowed:req.body.max_allowed,
    user_allowed:req.body.user_allowed,
    //total_used:req.body.total_used,
    status : req.body.status,
    //created_at : req.body.created_at,
  });


  Coupon.findByName(req.body.code,(err, data) => {
    if (err) {
      // Save course in the database
      Coupon.create(coupon, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Category."
          });
        else res.send(data);
      });
      //res.status(500).send({message:'user all redy exist'});
    }else{
      res.status(500).send({message:'coupons all redy exist'});
    }
  })
};


// Retrieve all coupons from the database.
exports.findAll = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
      );
      res.header("Content-Type", "application/x-www-form-urlencoded");
      //console.log({darshit:req.user.id});
    Coupon.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      else res.send(data);
    });
  };
  


  // Find a single coupon with a UserId
exports.findOne = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
      );
      res.header("Content-Type", "application/x-www-form-urlencoded");
    Coupon.findById(req.params.couponId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found coupon with id ${req.params.couponId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving coupon with id " + req.params.couponId
          });
        }
      } else res.send(data);
    });
  };



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
    
  
  req.body.expire_at=req.body.expire_at.split("/").reverse();
  var tmp = req.body.expire_at[2];
  req.body.expire_at[2] = req.body.expire_at[1];
  req.body.expire_at[1] = tmp;
  req.body.expire_at = req.body.expire_at.join("-");
  // Create a course
  const coupon = new Coupon({
    code : req.body.code,
    type : req.body.type,
    amount: req.body.amount,
    expire_at:req.body.expire_at,
    max_allowed:req.body.max_allowed,
    user_allowed:req.body.user_allowed,
    //total_used:req.body.total_used,
    status : req.body.status,
    //created_at : req.body.created_at,
  });
    console.log(req.body);
  
    Coupon.updateById(
      req.params.couponId,
      coupon,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found coupon with id ${req.params.couponId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating coupon with id " + req.params.copuonId
            });
          }
        } else res.send(data);
      }
    );
  };



  // Delete a coupon with the specified couponId in the request
exports.delete = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
      );
      res.header("Content-Type", "application/x-www-form-urlencoded");
    Coupon.remove(req.params.couponId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found coupon with id ${req.params.couponId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete coupon with id " + req.params.couponId
          });
        }
      } else res.send({ message: `coupon was deleted successfully!` });
    });
  };
  