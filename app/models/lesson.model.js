const sql = require("./db.js");
const moment=require('moment');
const fs = require('fs');


const Lesson = function(lesson) {
  this.title = lesson.title;
  this.duration	=lesson.duration	;
  this.course_id=lesson.course_id;
  this.section_id=lesson.section_id;  
  this.video_type = lesson.video_type;
  this.video_url =lesson.video_url;
  //this.created_at=lesson.created_at;
  //this.modified_at=lesson.modified_at;
  this.lesson_type=lesson.lesson_type;
  this.summary=lesson.summary;
  this.order=lesson.order;
};

Lesson.create = (newlesson, result) => {
  sql.query("INSERT INTO lesson SET ?", newlesson, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created lesson: ", { id: res.insertId, ...newlesson });
    result(null, { id: res.insertId, ...newlesson });
  });
};



Lesson.findById = (LessonId, result) => {
  sql.query(`SELECT * FROM lesson WHERE id = ${LessonId}`, (err, res) => {
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
      console.log("found User: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};




Lesson.getAll = result => {
  sql.query("SELECT * FROM lesson ORDER BY lesson.order", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    res.map((element,index)=>{
      var modifydate = new Date(element.modified_at);
      var now = moment(modifydate).format('l');
      element.modified_at=now;
      console.log(element.modified_at);
      var createdate = new Date(element.created_at);
      var now = moment(createdate).format('l');
      element.created_at=now;
    })
    console.log("Lesson: ", res);
    result(null, res);
  });
};


Lesson.updateById = (id, lesson, result) => {
  sql.query(
    "UPDATE lesson SET ? WHERE id = ?",
    [lesson, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Lesson: ", { id: id, ...lesson });
      result(null, { id: id, ...lesson });
    }
  );
};



Lesson.remove = (id, result) => {
  sql.query("SELECT lesson.video_url FROM lesson WHERE id = ?", id, (err, res1) => {

  sql.query("DELETE FROM lesson WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(res1[0])
    if(res1[0]!==undefined){
    fs.rmdir(`${res1[0].video_url}`, { recursive: true }, (err) => {
      if (err) {
        throw err;
      }
      console.log(`${res1[0].video_url} is deleted!`);
      });
    }
    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Lesson with id: ", id);
    result(null, res);
  });
})
};




Lesson.findByCourseId = (courseId,sectionId, result) => {
  console.log(courseId,sectionId);
  sql.query(`SELECT * FROM lesson where lesson.course_id = ${courseId} AND lesson.section_id=${sectionId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found lession: ", res);
      result(null, res);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};



Lesson.setorder=(arrayofIndex,arrayofID,result)=>{
  //console.log(arrayofID);
  let id=[];
  arrayofID.split(',').map((cv,i)=>{
    id.push(parseInt(cv));
  })
  //console.log(id);
  //console.log(typeof(arrayofIndex));
   arrayofIndex.split(',').map((cv,i)=>{
    sql.query(`UPDATE lesson SET lesson.order=${cv} WHERE lesson.id=${id[i]}`,(err,res)=>{
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log('done');
    })
    //result(res,null);
     //console.log(cv);
     //console.log(i);
     //console.log(id[i]);
     //result(null,{message:'sussece fully orderd lesson.'});
   })
   result(null,{message:'sussece fully orderd lesson.'});
}

module.exports=Lesson;