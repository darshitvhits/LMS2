const { resolveContent } = require("nodemailer/lib/shared");
const Course = require("../models/course.model.js");
const fs = require('fs');
const path = require('path');
const uplode=require('../middlewares/uplodeimage');
// Retrieve all Course from the database.
exports.findAll = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type:application/x-www-form-urlencoded"
  );
  res.header("Content-Type", "application/x-www-form-urlencoded");

  Course.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Course."
      });
    else {
      let promise = []
      data.map((cv, i) => {
        let pro = new Promise(function (resolve, reject) {
          Course.findByCourseId(cv.id, (err, data2) => {
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
              if(data2.Total_lesson!==undefined){
              data[i].Total_lesson=data2.Total_lesson.toString();
            }
            if(data2.Total_section!==undefined){
              data[i].Total_section=data2.Total_section.toString();
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


// Create and Save a new Course
exports.create =(req, res) => {
  // Validate request
  console.log(req.body.title);
 if (req.body.title===undefined) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }else{
  console.log(req.body)
  //uplode(req,res,function(err) {
    //if(err) {
       // return res.end("Error uploading file.");
    //}
    //res.end("File is uploaded");
//})
  if(req.files !== undefined){
    if(req.files.demo_image!==undefined){
    var img = req.files.demo_image[0].path;
    if (img === undefined) {
      img = null;
    } else {
      imagepath=`D:/Darshit/lmsapi/${img}`;
      //img=imagepath.replace("\\","/");
      img=imagepath;
    }}else{
      img = null;
    }
    if(req.files.course_video!==undefined){
    var video=req.files.course_video[0].path
    if (video === undefined) {
      video= null;
    } else {
      videopath=`D:/Darshit/lmsapi/${video}`;
      video=videopath;
      //video=videopath.replace("\\","/");
    }}else{
      video= null;
    }}
  const course = new Course({
    id_user: req.body.id_user,
    id_category: req.body.id_category,
    id_topic: req.body.id_topic,
    id_level: req.body.id_level,
    id_price: req.body.id_price,
    id_language: req.body.id_language,
    id_duration: req.body.id_duration,
    id_features: req.body.id_features,
    id_subtitles: req.body.id_subtitles,
    title: req.body.title,
    short_description: req.body.short_description,
    description: req.body.description,
    outcomes: req.body.outcomes,
    section: req.body.section,
    requirements: req.body.requirements,
    price: req.body.price,
    discount_flag: req.body.discount_flag,
    discounted_price: req.body.discounted_price,
    //thumbnail: req.body.thumbnail,
    thumbnail: img,
    video_url: video,
    is_top_course: req.body.is_top_course,
    is_admin: req.body.is_admin,
    status: req.body.status,
    meta_keywords: req.body.meta_keywords,
    meta_description: req.body.meta_description,
    //created_at: req.body.created_at,
    //modified_at: req.body.modified_at,
  });

  Course.findByName(req.body.title, (err, data) => {
    if (err) {
      // Save course in the database
      Course.create(course, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Course."
          });
        else res.send(data);
      });
      //res.status(500).send({message:'user all redy exist'});
    } else {
      res.status(500).send({ message: 'course name all redy exist' });
    }
  })

  // Save course in the database
  /*Course.create(course, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Course."
      });
    else res.send(data);
  });*/
}
};

// Find a single Course with a CourseId
exports.findOne = (req, res) => {
  Course.findById(req.params.courseId, (err, data) => {
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

// Update a Course identified by the CourseId in the request
exports.update = (req, res) => {
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
      img=imagepath;
      //img=imagepath.replace("\\","/");
    }}else{
      img = null;
    }
    if(req.files.course_video!==undefined){
    var video=req.files.course_video[0].path
    if (video === undefined) {
      video= null;
    } else {
      videopath=`D:/Darshit/lmsapi/${video}`;
      video=videopath;
      //video=videopath.replace("\\","/");
    }}else{
      video= null;
    }}
  const course = new Course({
    id_user: req.body.id_user,
    id_category: req.body.id_category,
    id_topic: req.body.id_topic,
    id_level: req.body.id_level,
    id_price: req.body.id_price,
    id_language: req.body.id_language,
    id_duration: req.body.id_duration,
    id_features: req.body.id_features,
    id_subtitles: req.body.id_subtitles,
    title: req.body.title,
    short_description: req.body.short_description,
    description: req.body.description,
    outcomes: req.body.outcomes,
    section: req.body.section,
    requirements: req.body.requirements,
    price: req.body.price,
    discount_flag: req.body.discount_flag,
    discounted_price: req.body.discounted_price,
    //thumbnail: req.body.thumbnail,
    thumbnail: img,
    video_url: video,
    is_top_course: req.body.is_top_course,
    is_admin: req.body.is_admin,
    status: req.body.status,
    meta_keywords: req.body.meta_keywords,
    meta_description: req.body.meta_description,
    //created_at: req.body.created_at,
    //modified_at: req.body.modified_at,
  });

  Course.updateById(
    req.params.courseId,
    course,
    (err, data) => {
      //console.log(data);
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Course with id ${req.params.courseId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Course with id " + req.params.courseId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Course with the specified courseId in the request
exports.delete = (req, res) => {
  Course.remove(req.params.courseId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Course with id ${req.params.courseId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Course with id " + req.params.courseId
        });
      }
    } else res.send(data);
  });
};

// Find a single Course with a CourseId
exports.findByCourseId = (req, res) => {
  Course.findByCourseId(req.params.courseId, (err, data) => {
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

exports.createfolder= (req, res) => {
  console.log(req.body.title);
  fs.mkdir(`./uploads/course/${req.body.title}`,
      { recursive: true }, (err) => {
      if (err) {
        return console.error(err);
      }
    console.log('Directory created successfully!');
  });
  res.send('folder created!')
};