const Lesson=require('../models/lesson.model');

// Create and Save a new lession
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
    
    if(req.files !== undefined){
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
      
    // Create a User
    const lesson = new Lesson({
        title : req.body.title,
        duration: req.body.duration,
        course_id : req.body.course_id,
        section_id : req.body.section_id,
        video_type : req.body.video_type,
        video_url : video,
        //created_at : req.body.created_at,
        //modified_at : req.body.modified_at,
        lesson_type : req.body.lesson_type,
        summary : req.body.summary,
        order : req.body.order,
    });
  

     // Save lesson in the database
     Lesson.create(lesson, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the lesson."
          });
        else res.send(data);
      });
  
    /*Lesson.findByName(req.body.email,(err, data) => {
      if (err) {
        // Save lesson in the database
      Lesson.create(lesson, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the lesson."
          });
        else res.send(data);
      });
        //res.status(500).send({message:'user all redy exist'});
      }else{
        res.status(500).send({message:'lesson all redy exist'});
      }
    })*/
}  



// Find a single lession with a LessionId
exports.findOne = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  Lesson.findById(req.params.lessonId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.lessonId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.lessonId
        });
      }
    } else res.send(data);
  });
};




// Retrieve all Lession from the database.
exports.findAll = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  Lesson.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving lesson."
      });
    else res.send(data);
  });
};



// Update a Lession identified by the LessionId in the request
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

  if(req.files !== undefined){
    if(req.files.course_video!==undefined){
    var video=req.files.course_video[0].path
    if (video === undefined) {
      video= null;
    } else {
      videopath=`D:/Darshit/lmsapi/${video}`;
      video=videopath.replace("\\","/");
    }}else{
      video= null;
    }}
  // Create a User
  const lesson = new Lesson({
    title : req.body.title,
    duration: req.body.duration,
    course_id : req.body.course_id,
    section_id : req.body.section_id,
    video_type : req.body.video_type,
    video_url : req.body.video_url,
    //created_at : req.body.created_at,
    //modified_at : req.body.modified_at,
    lesson_type : req.body.lesson_type,
    summary : req.body.summary,
    order : req.body.order,
});
  console.log(req.body);

  Lesson.updateById(
    req.params.lessonId,
    lesson,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.lessonId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.lessonId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Lession with the specified LessionId in the request
exports.delete = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  Lesson.remove(req.params.lessonId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found lesson with id ${req.params.lessonId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete lesson with id " + req.params.userId
        });
      }
    } else res.send({ message: `lesson was deleted successfully!` });
  });
};



// Retrieve all Lession for given  courseid from the database.
exports.findByCourseId = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  Lesson.findByCourseId(req.params.courseId,req.params.sessionId,(err, data) => {
    if (err){
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Section with id ${req.params.courseId}.`
        });}else{
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving section."
      });
    }
    }
    else res.send(data);
  });
};



//lession sorteorder.
exports.setorder = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  Lesson.setorder(req.body.arrayofIndex,req.body.arrayofID,(err, data) => {
    if (err){
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Section with id ${req.params.courseId}.`
        });}else{
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving section."
      });
    }
    }
    else res.send(data);
  });
};