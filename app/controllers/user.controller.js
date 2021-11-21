const User = require("../models/user.model.js");
const sendEmail=require('../config/mailconfig/email.config');
const crypto=require('crypto');
const bcrypt=require('bcryptjs');
const userRoutes = require("../routes/user.routes.js");
const { group } = require("console");
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
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const salt=await bcrypt.genSalt(15);
  req.body.password=await bcrypt.hash(req.body.password,salt);
  let img = req.files.profile[0].path;
  if (img === undefined) {
    img = null;
  } else {
    imagepath=`D:/Darshit/lmsapi/${img}`;
    img=imagepath.replace("\\","/");
  }
  // Create a User
  const user = new User({
    id_group : req.body.id_group,
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email,
    password : req.body.password,
    biography : req.body.biography,
    watch_history : req.body.watch_history,
    wishlist : req.body.wishlist,
    title : req.body.title,
    verification_code : req.body.verification_code,
    image : img,
    status : req.body.status,
    is_instructor : req.body.is_instructor,
    //created_at : req.body.created_at,
    //modified_at : req.body.modified_at,
    last_login_at : req.body.last_login_at,
    last_login_ip : req.body.last_login_ip,
    id_company:req.body.id_company,
  });
  let group=req.body.id_group

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
      console.log(group);
      if(group==3){
        //res.status(500).send({message:'user all redy exist'});
        if(data.id_group==3){
          res.status(500).send({message:'instructor already exist'});
        }else{
          User.updateById(
            data.id,
            user,
            (err, data) => {
              if (err) {
                if (err.kind === "not_found") {
                  res.status(404).send({
                    message: `Not found User with id ${req.params.userId}.`
                  });
                } else {
                  res.status(500).send({
                    message: "Error updating User with id " + req.params.userId
                  });
                }
              } else res.send(data);
            }
          );
          }    
      }else if(group==1){
        if(data.id_group==1){
          res.status(500).send({message:'admin already exist'});
        }else{
          User.updateById(
            data.id,
            user,
            (err, data) => {
              if (err) {
                if (err.kind === "not_found") {
                  res.status(404).send({
                    message: `Not found User with id ${req.params.userId}.`
                  });
                } else {
                  res.status(500).send({
                    message: "Error updating User with id " + req.params.userId
                  });
                }
              } else res.send(data);
            }
          );
        }
      }else res.status(500).send({message:'user already exist'});
     // res.status(500).send({message:'user all redy exist'});
    }
  })



  // Save User in the database
  /*User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });*/
};

// Retrieve all Instructer from the database.
exports.findAllInstructor = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  User.getAllInstructor((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
    //console.log({darshit:req.user.id});
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
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

// Update a User identified by the UserId in the request
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
  const salt=await bcrypt.genSalt(15);
  req.body.password=await bcrypt.hash(req.body.password,salt);
  let img = req.files.profile[0].path;
  if (img === undefined) {
    img = null;
  } else {
    imagepath=`D:/Darshit/lmsapi/${img}`;
    img=imagepath.replace("\\","/");
  }
  // Create a User
  const user = new User({
    id_group : req.body.id_group,
    first_name : req.body.first_name,
    last_name : req.body.last_name,
    email : req.body.email,
    password : req.body.password,
    biography : req.body.biography,
    watch_history : req.body.watch_history,
    wishlist : req.body.wishlist,
    title : req.body.title,
    verification_code : req.body.verification_code,
    image : img,
    status : req.body.status,
    is_instructor : req.body.is_instructor,
    //created_at : req.body.created_at,
    //modified_at : req.body.modified_at,
    last_login_at : req.body.last_login_at,
    last_login_ip : req.body.last_login_ip,
    id_company:req.body.id_company,
  });
  console.log(req.body);

  User.updateById(
    req.params.userId,
    user,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.userId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a User with the specified userId in the request
exports.delete = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  User.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.userId
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    else res.send({ message: `All Users were deleted successfully!` });
  });
};

//login user
exports.login=(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/multipart/form-data"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
    console.log(req.body.email);
    User.login(req.body.email,req.body.password,(err,data)=>{
      res.json(data);
    })
};

//resate password
exports.Resatepass=(req,res)=>{
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");

    console.log({darshit:req.user.id});
    User.passawordresate(req.user.id,req.body.oldpassword,req.body.password,(err,data)=>{
      res.json(data);
    })
};

//forgate password
exports.forgatepass=async(req,res)=>{
  const token=req.token;
    console.log(token);
    const url=`${req.protocol}://${req.get('host')}/resatepassword/${token}`;
    const message=`forgot your password then click ${url} heare`;
    try{
      console.log('halfdone');
    await sendEmail({
        email:req.user.email,
        //email:'44e4e94163-130a61@inbox.mailtrap.io',
        subject:'password resate link',
        message
    });
    console.log('done');
    res.json({mes:'email send'});
}catch(err){
    console.log(err.message);
    res.json({mes:'server error'});
}
}

//set new password
exports.resatepassword=async(req,res)=>{
  const token=await crypto.createHash('sha256').update(req.params.token).digest('hex');
  console.log(token);
  //const user=await User.findOne({passwordResettoken:token,passwordResetExpiar:{$gt:Date.now()}});
  await User.findByToken(token, async(err, user) => {
    console.log(user);
    if (err) {
      if (err.kind === "not_found" ) {
        res.status(404).send({
          message: `this link is time out`
        });
      } else {
        res.status(500).send({
          message: `this link is time out`
        });
      }
    }else{
      if (user.kind === "not_found" ) {
        res.status(404).send({
          message: `this link is time out`
        });
      } 
      const password=req.body.password;
      const salt=await bcrypt.genSalt(15);
      const newpassword=await bcrypt.hash(password,salt);
      console.log(user.password);
      user.password=newpassword;
      user.token=undefined;
      user.token_time=undefined;
      await User.updateById(user.id,user,(err, data) => {
        //res.json({data});
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `this link is time out`
            });
          } else {
            res.status(500).send({
              message: `this link is time out`
            });
          }
        }
        res.json({mes:'password change'});
    })
      //await user.save();
      //res.json({mes:'password change'});
    }
  }
)

}

// Retrieve all admin from the database.
exports.findallAdmin = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  User.getAlladmin((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

//find number of course
exports.findNumberOfCourse = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  User.findNumberOfCourse(req.params.userId, (err, data) => {
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

// show dashbord item.
exports.dashbord= (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
    //console.log({darshit:req.user.id});
  User.dashbord((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

/*User.findById(req.params.userId, (err, data) => {
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
};*/