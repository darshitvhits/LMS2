const sql = require("../db");
const moment=require('moment');
var dateFormat = require('dateformat');
// constructor
const Course = function(course) {

  this.id_user = course.id_user;
  this.id_category = course.id_category;
  this.id_topic = course.id_topic;
  this.id_level = course.id_level;
  this.id_price = course.id_price;
  this.id_language = course.id_language;
  this.id_duration = course.id_duration;
  this.id_features = course.id_features;
  this.id_subtitles = course.id_subtitles;
  this.title = course.title;
  this.short_description = course.short_description;
  this.description = course.description;
  this.outcomes = course.outcomes;
  this.section = course.section;
  this.requirements = course.requirements;
  this.price = course.price;
  this.discount_flag = course.discount_flag;
  this.discounted_price = course.discounted_price;
  this.thumbnail = course.thumbnail;
  this.video_url = course.video_url;
  this.is_top_course = course.is_top_course;
  this.is_admin = course.is_admin;
  this.status = course.status;
  this.meta_keywords = course.meta_keywords;
  this.meta_description = course.meta_description;
  this.start_discount_date = course.start_discount_date;
  this.end_discount_date = course.end_discount_date;
};



Course.getAll = result => {
  //sql.query("SELECT * FROM course", (err, res) => {
    sql.query(`SELECT course.id,course.id_user,course.id_category,course.id_topic,course.id_level,course.id_price,course.id_language,course.id_duration,course.id_features,course.id_subtitles,course.title,course.short_description,course.description,course.outcomes,course.section,course.requirements,course.price,course.discount_flag,course.discounted_price,course.thumbnail,course.video_url,course.is_top_course,course.is_admin,course.status,course.meta_keywords,course.meta_description,course.created_at,course.modified_at,users.first_name,price.name AS price_name,category.name AS category_name,topic.name AS topic_name,level.name AS level_name,language.name AS language_name,duration.name AS duration_name,features.name AS features_name,subtitles.name AS subtitles_name FROM course LEFT JOIN users ON course.id_user=users.id LEFT JOIN price ON course.id_price=price.id LEFT JOIN category ON course.id_category=category.id LEFT JOIN topic ON course.id_topic=topic.id  LEFT JOIN level ON course.id_level=level.id  LEFT JOIN language ON course.id_language=language.id  LEFT JOIN duration ON course.id_duration=duration.id LEFT JOIN features ON course.id_features=features.id  LEFT JOIN subtitles ON course.id_subtitles=subtitles.id`,(err, res) => { 
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    res.map((element,index)=>{
      var modifydate = new Date(element.modified_at);
      var now = moment(modifydate).format('l');
      element.modified_at=now
      var createdate = new Date(element.created_at);
      var now = moment(createdate).format('l');
      element.created_at=now
      //console.log(element.modified_at);
    })
    
    console.log("Course: ", res);
    result(null, res);
  });
};

Course.create = (newCourse, result) => {
  sql.query("INSERT INTO course SET ?", newCourse, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    
    console.log("created course: ", { id: res.insertId, ...newCourse });
    result(null, { id: res.insertId, ...newCourse });
  });
};




Course.findByName = async(CourseId, result) => {
  console.log(CourseId);
  await sql.query(`SELECT * FROM course WHERE course.title = '${CourseId}'`,(err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }if (res.length) {
      console.log("found Course: ", res[0]);
      result(null, res[0]);
      return;
    }else{
      result(err='err', null);
    }
})}




Course.findById = (CourseId, result) => {
  //sql.query(`SELECT * FROM course WHERE id = ${CourseId}`, (err, res) => {
    sql.query(`SELECT course.id,course.id_user,course.id_category,course.id_topic,course.id_level,course.id_price,course.id_language,course.id_duration,course.id_features,course.id_subtitles,course.title,course.short_description,course.description,course.outcomes,course.section,course.requirements,course.price,course.discount_flag,course.discounted_price,course.thumbnail,course.video_url,course.is_top_course,course.is_admin,course.status,course.meta_keywords,course.meta_description,course.created_at,course.modified_at,users.first_name,price.name AS price_name,category.name AS category_name,topic.name AS topic_name,level.name AS level_name,language.name AS language_name,duration.name AS duration_name,features.name AS features_name,subtitles.name AS subtitles_name FROM course LEFT JOIN users ON course.id_user=users.id LEFT JOIN price ON course.id_price=price.id LEFT JOIN category ON course.id_category=category.id LEFT JOIN topic ON course.id_topic=topic.id  LEFT JOIN level ON course.id_level=level.id  LEFT JOIN language ON course.id_language=language.id  LEFT JOIN duration ON course.id_duration=duration.id LEFT JOIN features ON course.id_features=features.id  LEFT JOIN subtitles ON course.id_subtitles=subtitles.id WHERE course.id = ${CourseId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      var modifydate = new Date(res[0].modified_at);
      var now = moment(modifydate).format('l');
      res[0].modified_at=now;
      var createdate = new Date(res[0].created_at);
      var now = moment(createdate).format('l');
      res[0].created_at=now;
      console.log("found Course: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Course with the id
    result({ kind: "not_found" }, null);
  });
};



Course.updateById = (id,newCourse, result) => {
  //sql.query("UPDATE course SET ? WHERE id = ?",[newCourse,id],
  sql.query(
    "UPDATE course SET id_user = ?,id_category= ?,id_topic= ?,id_level=?,id_price=?,id_language=?,id_duration=?,id_features=?,id_subtitles=?,title=?,short_description=?,course.description=?,course.outcomes=?,course.section=?,course.requirements=?,course.price=?,course.discount_flag=?,course.discounted_price=?,course.thumbnail=?,course.video_url=?,course.is_top_course=?,course.is_admin=?,course.status=?,course.meta_keywords=?,course.meta_description=? WHERE id = ?",
    [newCourse.id_user,newCourse.id_category,newCourse.id_topic,newCourse.id_level,newCourse.id_price,newCourse.id_language,newCourse.id_duration,newCourse.id_features,newCourse.id_subtitles,newCourse.title,newCourse.short_description,newCourse.description,newCourse.outcomes,newCourse.section,newCourse.requirements,newCourse.price,newCourse.discount_flag,newCourse.discounted_price,newCourse.thumbnail,newCourse.video_url,newCourse.is_top_course,newCourse.is_admin,newCourse.status,newCourse.meta_keywords,newCourse.meta_description, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Course with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Course: ", { id: id, ...newCourse });
      result(null, { id: id, ...newCourse });
    }
  );
};

Course.remove = (id, result) => {
  sql.query(`SELECT * FROM section WHERE section.course_id =${id}`,(err, res) => {
    if(res[0]!==undefined){
      console.log(res[0]===undefined);
      result(null,{message:'plese first delate all section'});
      return;
      //console.log('yes');
    }
    sql.query("DELETE FROM course WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
//
      if (res.affectedRows == 0) {
      // not found Course with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted Course with id: ", id);
      result(null,{ message: `Course was deleted successfully!` });
    });
  });
}




Course.removeAll = result => {
  sql.query("DELETE FROM course", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Courses`);
    result(null, res);
  });
};


Course.findByCourseId=(Id,result)=>{
  console.log(Id);
  sql.query(`SELECT COUNT(*) AS totalsection FROM section WHERE section.course_id = ${Id}`,(err,deta)=>{
    sql.query(`SELECT COUNT(*) AS totallesson FROM lesson WHERE lesson.course_id = ${Id}`,(err,res)=>{
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        
        //console.log(total);
        result(null, {Total_lesson:res[0].totallesson,Total_section:deta[0].totalsection});
        //data={Total_lesson:res[0].totallesson};
        return 
      }
      console.log(total);
      console.log(deta);
    })
    //console.log(deta);
  });
  //console.log(dell);
}


Course.filter =(Id,result)=> {
  //sql.query("SELECT * FROM course", (err, res) => {
    console.log(Id.id_level);
    sql.query(`SELECT course.id,course.id_user,course.id_category,course.id_topic,course.id_level,course.id_price,course.id_language,course.id_duration,course.id_features,course.id_subtitles,course.title,course.short_description,course.description,course.outcomes,course.section,course.requirements,course.price,course.discount_flag,course.discounted_price,course.thumbnail,course.video_url,course.is_top_course,course.is_admin,course.status,course.meta_keywords,course.meta_description,course.created_at,course.modified_at,users.first_name,price.name AS price_name,category.name AS category_name,topic.name AS topic_name,level.name AS level_name,language.name AS language_name,duration.name AS duration_name,features.name AS features_name,subtitles.name AS subtitles_name FROM course LEFT JOIN users ON course.id_user=users.id LEFT JOIN price ON course.id_price=price.id LEFT JOIN category ON course.id_category=category.id LEFT JOIN topic ON course.id_topic=topic.id  LEFT JOIN level ON course.id_level=level.id  LEFT JOIN language ON course.id_language=language.id  LEFT JOIN duration ON course.id_duration=duration.id LEFT JOIN features ON course.id_features=features.id  LEFT JOIN subtitles ON course.id_subtitles=subtitles.id WHERE ${Id.id_topic} AND ${Id.id_level} AND ${Id.id_price} AND ${Id.id_language} AND ${Id.id_duration} AND ${Id.id_features} AND ${Id.id_subtitles}`,(err, res) => { 
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    res.map((element,index)=>{
      var modifydate = new Date(element.modified_at);
      var now = moment(modifydate).format('l');
      element.modified_at=now
      var createdate = new Date(element.created_at);
      var now = moment(createdate).format('l');
      element.created_at=now
      //console.log(element.modified_at);
    })
    
    console.log("Course: ", res);
    result(null, res);
  });
};



Course.findBycategoryId = (CategoryId, result) => {
  //sql.query(`SELECT * FROM course WHERE id = ${CourseId}`, (err, res) => {
    sql.query(`SELECT course.id,course.id_user,course.id_category,course.id_topic,course.id_level,course.id_price,course.id_language,course.id_duration,course.id_features,course.id_subtitles,course.title,course.short_description,course.description,course.outcomes,course.section,course.requirements,course.price,course.discount_flag,course.discounted_price,course.thumbnail,course.video_url,course.is_top_course,course.is_admin,course.status,course.meta_keywords,course.meta_description,course.created_at,course.modified_at,users.first_name,price.name AS price_name,category.name AS category_name,topic.name AS topic_name,level.name AS level_name,language.name AS language_name,duration.name AS duration_name,features.name AS features_name,subtitles.name AS subtitles_name FROM course LEFT JOIN users ON course.id_user=users.id LEFT JOIN price ON course.id_price=price.id LEFT JOIN category ON course.id_category=category.id LEFT JOIN topic ON course.id_topic=topic.id  LEFT JOIN level ON course.id_level=level.id  LEFT JOIN language ON course.id_language=language.id  LEFT JOIN duration ON course.id_duration=duration.id LEFT JOIN features ON course.id_features=features.id  LEFT JOIN subtitles ON course.id_subtitles=subtitles.id WHERE course.id_category= ${CategoryId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }


    if (res.length) {
      var modifydate = new Date(res[0].modified_at);
      var now = moment(modifydate).format('l');
      res[0].modified_at=now;
      var createdate = new Date(res[0].created_at);
      var now = moment(createdate).format('l');
      res[0].created_at=now;
      console.log("found Course: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Course with the id
    result({ kind: "not_found" }, null);
  });
};


Course.instructerlist = (InstructerId, result) => {
  sql.query(`SELECT course.id,course.title,course.status,course.created_at,course.modified_at,category.name AS Category FROM course LEFT JOIN category ON course.id_category=category.id WHERE course.id_user = ${InstructerId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    let promise = []
    res.map((element,index)=>{
      let pro = new Promise(function (resolve, reject) {
      sql.query(`SELECT COUNT(*) AS total FROM orders_course WHERE course_title='${element.title}'`,(err,res2)=>{
        res[index].Sales=res2[0].total;
        resolve(res)
      })
    })
    let pro1 = new Promise(function (resolve, reject) {
    sql.query(`SELECT COUNT(*) AS section FROM section WHERE section.course_id='${element.id}'`,(err,res2)=>{
      res[index].section=res2[0].section;
      resolve(res)
    })
  })
    promise.push(pro)
    promise.push(pro1)
      console.log(`date=${element.modified_at}`)
      var modifydate = new Date(element.modified_at);
      var now = moment(modifydate).format('l');
      element.modified_at=now
      var createdate = new Date(element.created_at);
      var now = moment(createdate).format('l');
      element.created_at=now
      console.log(element);
    })
    Promise.all(promise).then(value => {
      console.log("Course: ", res);
      result(null, res);
    })
  });
};



Course.purchaselist = (user_id, result) => {
  sql.query(`SELECT id,id_users,created_at FROM orders WHERE orders.id_users = ${user_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    var responce = []
    let promise = []
    res.map((element, index) => {
      var createdate = new Date(element.created_at);
      var now = moment(createdate).format('l');
      element.created_at = now
      let pro = new Promise(function (resolve, reject) {
        sql.query(`SELECT course_title,course_price	 FROM orders_course WHERE orders_course.id_oders='${element.id}'`, (err, res2) => {
          res2.map((element1, index) => {
            res2[index].Purchase_Date = element.created_at;
          })
          responce.push(res2);
          resolve(responce)
        })
      })
      promise.push(pro)
    })
    Promise.all(promise).then(value => {
      var res = []
      let promise = []
      responce.map((element, index) => {
        element.map((inerelement, index) => {
          let pro = new Promise(function (resolve, reject) {
            sql.query(`SELECT duration.name AS durationname,category.name,users.first_name,users.last_name FROM course LEFT JOIN category ON course.id_category=category.id LEFT JOIN users ON course.id_user=users.id LEFT JOIN duration ON course.id_duration=duration.id WHERE course.title = '${inerelement.course_title}'`, (err, res3) => {
              if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
              }
              inerelement.Category = res3[0].name;
              inerelement.Instructor = `${res3[0].first_name} ${res3[0].last_name}`;
              inerelement.Duration = res3[0].durationname;
              res.push(inerelement);
              resolve(res)
            })
          })
          promise.push(pro)
        })
      })
      Promise.all(promise).then(value => {
        console.log("Course: ", res);
        result(null, res);
      })
    })
  })
};

Course.updatediscount = (id,discount, result) => {
  sql.query("UPDATE course SET course.discounted_price=?,course.start_discount_date=?,course.end_discount_date=? WHERE  course.title= ?",[discount.discounted_price,discount.start_discount_date,discount.end_discount_date,id],
  //sql.query(
    //"UPDATE course SET id_user = ?,id_category= ?,id_topic= ?,id_level=?,id_price=?,id_language=?,id_duration=?,id_features=?,id_subtitles=?,title=?,short_description=?, WHERE id = ?",
    //[Course.email, Course.name, Course.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Course with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated discount: ", { id: id, ...discount});
      result(null, { id: id, ...discount});
    }
  );
};


Course.discountlist = (userId, result) => {
  sql.query(`SELECT course.title,course.discounted_price,course.start_discount_date,course.end_discount_date FROM course WHERE course.id_user= ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    res.map((element, index) => {
      if (element.start_discount_date.getTime() < Date.now() && element.end_discount_date.getTime() > Date.now()) {
        element.status = 'Active';
      }else {
        element.status = 'Inactive'
      }
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      element.start_discount_date = element.start_discount_date.getDate() + " " + months[element.start_discount_date.getMonth()] + ' ' + element.start_discount_date.getFullYear();
      element.end_discount_date = element.end_discount_date.getDate() + " " + months[element.end_discount_date.getMonth()] + ' ' + element.end_discount_date.getFullYear();
    })
    console.log("Course: ", res);
    result(null, res);
  });
};


module.exports = Course;
