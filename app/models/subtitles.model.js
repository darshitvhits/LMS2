const sql = require("./db.js");
const moment=require('moment');
// constructor
const Subtitles = function(subtitles) {
  this.name = subtitles.name;
  this.status = subtitles.status;
  //this.created_at = subtitles.created_at;
  //this.modified_at = subtitles.modified_at;
};

Subtitles.getAll = result => {
  sql.query("SELECT * FROM subtitles", (err, res) => {
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
    console.log("Subtitles: ", res);
    result(null, res);
  });
};

Subtitles.create = (newSubtitles, result) => {
  sql.query("INSERT INTO subtitles SET ?", newSubtitles, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created subtitles: ", { id: res.insertId, ...newSubtitles });
    result(null, { id: res.insertId, ...newSubtitles });
  });
};



Subtitles.findByName = async(SubtitlesId, result) => {
  //console.log(CourseId);
  await sql.query(`SELECT * FROM subtitles WHERE subtitles.name = '${SubtitlesId}'`,(err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }if (res.length) {
      console.log("found subtitles: ", res[0]);
      result(null, res[0]);
      return;
    }else{
      result(err='err', null);
    }
})}



Subtitles.findById = (SubtitlesId, result) => {
  sql.query(`SELECT * FROM subtitles WHERE id = ${SubtitlesId}`, (err, res) => {
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
      console.log("found subtitles: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

Subtitles.updateById = (id, Subtitles, result) => {
  sql.query(
    "UPDATE subtitles SET name = ?, status = ? WHERE id = ?",
    [Subtitles.name, Subtitles.status, id],
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
      console.log("updated subtitles: ", { id: id, ...Subtitles });
      result(null, { id: id, ...Subtitles });
    }
  );
};

Subtitles.remove = (id, result) => {
  sql.query("DELETE FROM subtitles WHERE id = ?", id, (err, res) => {
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
    console.log("deleted subtitles with id: ", id);
    result(null, res);
  });
};


Subtitles.findByCourseId=(Id, result) => {
  //console.log(Id);
  sql.query(`SELECT COUNT(*) AS totalcourse FROM course WHERE course.id_subtitles = ${Id}`, (err, res) => {
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

module.exports = Subtitles;
