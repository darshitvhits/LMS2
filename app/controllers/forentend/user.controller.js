const User = require("../../models/forentend/user.model");
const sendEmail=require('../../config/mailconfig/email.config');
const crypto=require('crypto');
const bcrypt=require('bcryptjs');
const Feedback = require("../../models/forentend/feedback.model");
const Subscribe=require('../../models/forentend/subscriber.model');
const Comment=require('../../models/forentend/discussions.model')
//const userRoutes = require("../routes/user.routes.js");
// Create and Save a new User
exports.create = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  // Validate request
  if (req.body.email===undefined||req.body.password===undefined||req.body.id_group===undefined) {
    res.status(400).send({
      message: "email password and id_group required!"
    });
  }
  console.log(req.body);
  const salt=await bcrypt.genSalt(15);
  req.body.password=await bcrypt.hash(req.body.password,salt);
  
  // Create a User
  const user = new User({
    id_group : req.body.id_group,
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email,
    password : req.body.password,
  });

  User.findByName(req.body.email,(err, data) => {
    if (err) {
      // Save User in the database
    User.create(user, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      else res.send(data);
    });
      //res.status(500).send({message:'user all redy exist'});
    }else{
      res.status(500).send({message:'user all redy exist'});
    }
  })
}




//login user
exports.login=(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
      );
      res.header("Content-Type", "application/x-www-form-urlencoded");
      
      User.login(req.body.email,req.body.password,(err,data)=>{
        res.json(data);
      })
  };


  // Find a single User with a UserId
exports.findOne = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.userId
        });
      }
    } else res.send(data);
  });
};




exports.feedback = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type:application/x-www-form-urlencoded"
  );
  res.header("Content-Type", "application/x-www-form-urlencoded");
  // Validate request
  if (req.body.email === undefined) {
    res.status(400).send({
      message: "email is required!"
    });
  }
  let img = req.files.screenshote[0].path;
  if (img === undefined) {
    img = null;
  } else {
    imagepath = `D:/Darshit/lmsapi/${img}`;
    img = imagepath;
  }
  // Create a User
  const feedback = new Feedback({
    email: req.body.email,
    issue: req.body.issue,
    screenshot: img,
  });

  Feedback.create(feedback, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
  //res.status(500).send({message:'user all redy exist'});
}


exports.subscribe = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  // Validate request
  if (req.body.user_id===undefined||req.body.Instructor_id===undefined) {
    res.status(400).send({
      message: "user id and instructer id is required!"
    });
  }
  
  const subscrib = new Subscribe({
    user_id: req.body.user_id,
    Instructor_id : req.body.Instructor_id,  
  });
  Subscribe.exist(subscrib,(err, data) => {
    if (err) {
    Subscribe.create(subscrib, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      else res.send(data);
    });
  }else{
    res.status(500).send({message:'you have already subscribe this Instructor'});
  }
    })
  }


  exports.unsubscribe = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
      );
      res.header("Content-Type", "application/x-www-form-urlencoded");
        const unsubscribeinstructer=new Subscribe({
          user_id: req.body.user_id,
          Instructor_id : req.body.Instructor_id,  
        });

    Subscribe.remove(unsubscribeinstructer, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `you can not unsubsribe this instructer.`
          });
        } else {
          res.status(500).send({
            message: "you can not unsubsribe this instructer."
          });
        }
      } else res.send({ message: `you have unsubsribe instructer successfully!` });
    });
  };


  exports.student_dashbord = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
      );
      res.header("Content-Type", "application/x-www-form-urlencoded");
    Subscribe.student_dashbord(req.params.user_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.user_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving User with id " + req.params.user_id
          });
        }
      } else res.send(data);
    });
  };


  exports.instructer_profile = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
      );
      res.header("Content-Type", "application/x-www-form-urlencoded");
    User.instructer_profile(req.params.instructer_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.instructer_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving User with id " + req.params.instructer_id
          });
        }
      } else res.send(data);
    });
  };


  
  exports.comment = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
      );
      res.header("Content-Type", "application/x-www-form-urlencoded");
    // Validate request
    if (req.body.comment===undefined) {
      res.status(400).send({
        message: "user id and instructer id is required!"
      });
    }
    console.log(req.user);
    const comment = new Comment({
      user_id: req.user.id,
      Instructor_id : req.params.instructer_id, 
      comment:req.body.comment,
    });
    Comment.create(comment, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the comment."
          });
        else res.send(data);
      });
    }


    exports.displaycomment= (req, res) => {
      res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
        res.header(
          "Access-Control-Allow-Headers",
          "Content-Type:application/x-www-form-urlencoded"
        );
        res.header("Content-Type", "application/x-www-form-urlencoded");
      Comment.displaycomment(req.params.instructer_id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${req.params.instructer_id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving User with id " + req.params.instructer_id
            });
          }
        } else res.send(data);
      });
    };


exports.likecomment = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type:application/x-www-form-urlencoded"
  );
  res.header("Content-Type", "application/x-www-form-urlencoded");
  Comment.likecomment(
    req.params.comment_id,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found comment with id ${req.params.comment_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error for like comment with id " + req.params.comment_id
          });
        }
      } else res.send(data);
    }
  );
};


exports.dislikecomment = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type:application/x-www-form-urlencoded"
  );
  res.header("Content-Type", "application/x-www-form-urlencoded");
  Comment.dislikecomment(
    req.params.comment_id,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found comment with id ${req.params.comment_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error for dislike comment with id " + req.params.comment_id
          });
        }
      } else res.send(data);
    }
  );
};