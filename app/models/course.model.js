const sql = require("./db.js");
const moment=require('moment');
const fs = require('fs');
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
  //this.created_at = course.created_at;
  //this.modified_at = course.modified_at;
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
    sql.query("SELECT course.title FROM course WHERE id = ?", id, (err, res1) => {
      console.log(res1[0]);
    sql.query("DELETE FROM course WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      fs.rmdir(`D:/Darshit/lmsapi/uploads/course/${res1[0].title}`, { recursive: true }, (err) => {
        if (err) {
          throw err;
        }
        console.log(`D:/Darshit/lmsapi/uploads/course/${res1[0].title} is deleted!`);
        });
      if (res.affectedRows == 0) {
      // not found Course with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted Course with id: ", id);
      result(null,{ message: `Course was deleted successfully!` });
    });
  }) 
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

Course.discount=()=>{
  sql.query(`SELECT * FROM course WHERE course.end_discount_date IS NOT NULL`,(err,res)=>{
    res.map((element,index)=>{
      if(element.end_discount_date.getTime() < Date.now()){
        console.log('done');
        sql.query("UPDATE course SET course.discounted_price=?,course.start_discount_date=?,course.end_discount_date=? WHERE  course.title= ?",[0,null,null,element.title]);
      }
    })
  })
}

module.exports = Course;
