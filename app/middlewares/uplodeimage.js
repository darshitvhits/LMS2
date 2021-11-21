const multer=require('multer');
const fs = require('fs');
const sql = require("../config/db.config");
const path = require('path');
var storage = multer.diskStorage({   
    destination: async function (req, file, cb) {
      console.log(req.params.oldtitle)
      if(req.params.oldtitle===undefined){
      await fs.mkdir(`./uploads/course/${req.params.title}`,
      { recursive: true }, (err) => {
      if (err) {
        return console.error(err);
      }
    console.log('Directory created successfully!');
    });
  }else{
    //sql.query(`SELECT course.title FROM course WHERE course.id=${req.params.courseId}`,(err, res) => {
      //console.log(`resofquery:${res}`);
    //})
    await fs.rename(`./uploads/course/${req.params.oldtitle}`,`./uploads/course/${req.params.title}`, function(err) {
      if (err) {
        console.log(err)
      } else {
        console.log("Successfully renamed the directory.")
      }
    })
  }
    if (file.fieldname === "demo_image") { // if uploading resume
      cb(null, `uploads/course/${req.params.title}`);
    }else if (file.fieldname === "demo_category_image") { // if uploading resume
      cb(null, 'uploads/category');
    } else if (file.fieldname === "profile") { // if uploading resume
      cb(null, 'uploads/profile');
    }else if (file.fieldname === "screenshote") { // if uploading resume
    cb(null, 'uploads/screenshote');
  } else { // else uploading image
      cb(null, `uploads/course/${req.params.title}`);
    }
      }, 
    filename: function (req, file, cb) { 
        cb(null ,file.fieldname + '-' + Date.now() + file.originalname); 
    }
 });
var upload = multer({ storage: storage });
module.exports=upload;
