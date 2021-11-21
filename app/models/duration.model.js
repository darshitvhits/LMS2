const sql = require("./db.js");
const moment=require('moment');
// constructor
const Duration = function(duration) {
  this.name = duration.name;
  this.status = duration.status;
  //this.created_at = duration.created_at;
  //this.modified_at = duration.modified_at;
};

Duration.getAll = result => {
  sql.query("SELECT * FROM duration", (err, res) => {
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
    console.log("Duration: ", res);
    result(null, res);
  });
};

Duration.create = (newDuration, result) => {
  sql.query("INSERT INTO duration SET ?", newDuration, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created duration: ", { id: res.insertId, ...newDuration });
    result(null, { id: res.insertId, ...newDuration });
  });
};



Duration.findByName = async(DurationId, result) => {
  //console.log(CourseId);
  await sql.query(`SELECT * FROM duration WHERE duration.name = '${DurationId}'`,(err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }if (res.length) {
      console.log("found duration: ", res[0]);
      result(null, res[0]);
      return;
    }else{
      result(err='err', null);
    }
})}


Duration.findById = (DurationId, result) => {
  sql.query(`SELECT * FROM duration WHERE id = ${DurationId}`, (err, res) => {
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
      console.log("found duration: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

Duration.updateById = (id, Duration, result) => {
  sql.query(
    "UPDATE duration SET name = ?, status = ? WHERE id = ?",
    [Duration.name, Duration.status,  id],
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
      console.log("updated duration: ", { id: id, ...Duration });
      result(null, { id: id, ...Duration });
    }
  );
};

Duration.remove = (id, result) => {
  sql.query("DELETE FROM duration WHERE id = ?", id, (err, res) => {
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
    console.log("deleted duration with id: ", id);
    result(null, res);
  });
};



Duration.findByCourseId=(Id, result) => {
  //console.log(Id);
  sql.query(`SELECT COUNT(*) AS totalcourse FROM course WHERE course.id_topic = ${Id}`, (err, res) => {
    console.log(res);
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {

      //console.log(total);
      result(null, { Total_course: res[0].totalcourse });
      return;
    }
    //console.log(total);
    //console.log(deta);
  })
  //console.log(deta);
  //console.log(dell);
}
module.exports = Duration;
