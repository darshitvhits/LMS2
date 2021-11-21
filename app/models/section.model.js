const sql = require("./db.js");
const moment=require('moment');
// constructor
const Section = function(section) {
  this.title = section.title;
  this.course_id = section.course_id;
  this.sortorder = section.sortorder;
};

Section.getAll = result => {
  sql.query("SELECT c.id, c.title, c.course_id, c.sortorder, c2.title as Course FROM section AS c LEFT JOIN course AS c2 ON c2.id = c.course_id  ORDER BY c.sortorder", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Section: ", res);
    result(null, res);
  });
};

Section.create = (newSection, result) => {
  sql.query("INSERT INTO section SET ?", newSection, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created section: ", { id: res.insertId, ...newSection });
    result(null, { id: res.insertId, ...newSection });
  });
};

Section.findById = (SectionId, result) => {
  sql.query(`SELECT c.id, c.title, c.course_id, c.sortorder, c2.title as Course FROM section AS c LEFT JOIN course AS c2 ON c2.id = c.course_id where c.id = ${SectionId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found section: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};



Section.findByCourseId = (courseId, result) => {
  sql.query(`SELECT * FROM section where section.course_id = ${courseId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found section: ", res);
      result(null, res);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};



Section.updateById = (id, Section, result) => {
  sql.query(
    "UPDATE section SET ? WHERE id = ?",
    [Section, id],
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
      console.log("updated section: ", { id: id, ...Section });
      result(null, { id: id, ...Section });
    }
  );
};

Section.remove = (id, c_Id,result) => {
  sql.query(`SELECT * FROM lesson where lesson.section_id = ${id} AND lesson.course_id=${c_Id}`,(err, res) => {
    if(res[0]!==undefined){
      console.log(res[0]===undefined);
      result(null,{message:'plese first delate all lesson'});
      return;
      //console.log('yes');
    }
    sql.query("DELETE FROM section WHERE id = ?", id, (err, res) => {
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
      console.log("deleted section with id: ", id);
      result(null,{ message: `Section was deleted successfully!` });
    });
  });
}



Section.setorder=(arrayofIndex,arrayofID,result)=>{
  //console.log(arrayofID);
  let id=[];
  arrayofID.split(',').map((cv,i)=>{
    id.push(parseInt(cv));
  })
  //console.log(id);
  //console.log(typeof(arrayofIndex));
   arrayofIndex.split(',').map((cv,i)=>{
    sql.query(`UPDATE section SET section.sortorder=${cv} WHERE section.id=${id[i]}`,(err,res)=>{
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
   })
   result(null,{message:'sussece fully orderd session.'});
  }
  //console.log(exist);
  /*sql.query("DELETE FROM section WHERE id = ?", id, (err, res) => {
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
    console.log("deleted section with id: ", id);
    result(null, res);
  });
};*/

module.exports = Section;
