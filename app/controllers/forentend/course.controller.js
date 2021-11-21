const { resolveContent } = require("nodemailer/lib/shared");
const Course = require("../../models/forentend/course.model");
const Rate=require("../../models/forentend/rate.model");
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
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.files)
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
    }
  }
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
      res.status(500).send({ message: 'user all redy exist' });
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
  // Validate Request
  //console.log(req.body);
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  //console.log(req.files.demo_image!==undefined);
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


exports.filter=(req,res)=>{
  let id={};
  if(req.body.id_topic!==undefined){
    id['id_topic']=`course.id_topic=${req.body.id_topic}`;
  }else{
    id['id_topic']=`TRUE`;
  }
  //console.log(id);
  if(req.body.id_level!==undefined){
    id['id_level']=`course.id_level=${req.body.id_level}`;
  }else{
    id['id_level']=`TRUE`;
  }
  //console.log(id);
  if(req.body.id_price!==undefined){
    id['id_price']=`course.id_price=${req.body.id_price}`;
  }else{
    id['id_price']=`TRUE`;
  }
  //console.log(id);
  if(req.body.id_language!==undefined){
    id['id_language']=`course.id_language=${req.body.id_language}`;
  }else{
    id['id_language']=`TRUE`;
  }
  //console.log(id);
  if(req.body.id_duration!==undefined){
    id['id_duration']=`course.id_duration=${req.body.id_duration}`;
  }else{
    id['id_duration']=`TRUE`;
  }
  //console.log(id);
  if(req.body.id_features!==undefined){
    id['id_features']=`course.id_features=${req.body.id_features}`;
  }else{
    id['id_features']=`TRUE`;
  }
 // console.log(id);
  if(req.body.id_subtitles!==undefined){
    id['id_subtitles']=`course.id_subtitles=${req.body.id_subtitles}`;
  }else{
    id['id_subtitles']=`TRUE`;
  }
  //console.log(id);
  Course.filter(id, (err, data) => {
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
}

exports.category= (req, res) => {
  Course.findBycategoryId(req.params.id_category, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Course with category_id ${req.params.id_category}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Course with category_id " + req.params.id_category
        });
      }
    } else res.send(data);
  });
};


exports.rating = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
    filed1=parseFloat(req.body.filed1);
    filed2=parseFloat(req.body.filed2);
    filed3=parseFloat(req.body.filed3);
    filed4=parseFloat(req.body.filed4);
    filed5=parseFloat(req.body.filed5);
    var totalrate=(filed1+filed2+filed3+filed4+filed5)/5;
    console.log(`totalrate:${totalrate}`);
  const rate= new Rate({
    user_id: req.body.user_id,
    course_id: req.body.course_id,
    filed1:req.body.filed1,
    filed2:req.body.filed2,
    filed3:req.body.filed3,
    filed4:req.body.filed4,
    filed5:req.body.filed5,
    total:totalrate,
  });

  Rate.findById(req.body.user_id,req.body.course_id, (err, data) => {
    if (err) {
      // Save course in the database
      Rate.create(rate, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Course."
          });
        else res.send(data);
      });
      //res.status(500).send({message:'user all redy exist'});
    } else {
      res.status(500).send({ message: 'you are already reted this course' });
    }
  })
}


// Find a Course list with a InstructerId
exports.instructerlist = (req, res) => {
  Course.instructerlist(req.params.id_instructer, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Course with id ${req.params.id_instructer}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Course with id " + req.params.id_instructer
        });
      }
    } else res.send(data);
  });
};


// Find a purchase Course list 
exports.purchaselist = (req, res) => {
  Course.purchaselist(req.params.user_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Course with id ${req.params.user_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Course with id " + req.params.user_id
        });
      }
    } else res.send(data);
  });
};


exports.adddiscount = (req, res) => {
  // Validate request
  if (req.body.title===undefined||req.body.start_discount_date===undefined||req.body.end_discount_date===undefined) {
    res.status(400).send({
      message: "All field are required!"
    });
  }
  req.body.start_discount_date= req.body.start_discount_date.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");
  req.body.end_discount_date=req.body.end_discount_date.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");
  req.body.start_discount_date = new Date(req.body.start_discount_date);
  req.body.end_discount_date = new Date(req.body.end_discount_date);
  
  console.log(req.body.start_discount_date.getTime());
  console.log(Date.now());
  const course= new Course({
    discounted_price: req.body.discounted_price,
    start_discount_date:req.body.start_discount_date,
    end_discount_date:req.body.end_discount_date,
  });

  Course.updatediscount(
    req.body.title,
    course,
    (err, data) => {
      //console.log(data);
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Course with id ${req.body.title}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Course with id " + req.body.title
          });
        }
      } else res.send(data);
    }
  );
}


// Find a discount Course list 
exports.discountlist = (req, res) => {
  Course.discountlist(req.params.user_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Course with id ${req.params.user_id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Course with id " + req.params.user_id
        });
      }
    } else res.send(data);
  });
};