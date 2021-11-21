const sql = require("./db.js");
const moment=require('moment');
// constructor
const Level = function(level) {
  this.name = level.name;
  this.status = level.status;
  //this.created_at = level.created_at;
  //this.modified_at = level.modified_at;
};

Level.getAll = result => {
  sql.query("SELECT * FROM level", (err, res) => {
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
    console.log("Level: ", res);
    result(null, res);
  });
};


Level.create = (newLevel, result) => {
  sql.query("INSERT INTO level SET ?", newLevel, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created level: ", { id: res.insertId, ...newLevel });
    result(null, { id: res.insertId, ...newLevel });
  });
};


Level.findByName = async(LevelId, result) => {
  //console.log(CourseId);
  await sql.query(`SELECT * FROM level WHERE level.name = '${LevelId}'`,(err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }if (res.length) {
      console.log("found level: ", res[0]);
      result(null, res[0]);
      return;
    }else{
      result(err='err', null);
    }
})}



Level.findById = (LevelId, result) => {
  sql.query(`SELECT * FROM level WHERE id = ${LevelId}`, (err, res) => {
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
      console.log("found level: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

Level.updateById = (id, Level, result) => {
  sql.query(
    "UPDATE level SET name = ?, status = ? WHERE id = ?",
    [Level.name, Level.status, id],
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
      console.log("updated level: ", { id: id, ...Level });
      result(null, { id: id, ...Level });
    }
  );
};

Level.remove = (id, result) => {
  sql.query("DELETE FROM level WHERE id = ?", id, (err, res) => {
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
    console.log("deleted level with id: ", id);
    result(null, res);
  });
};


Level.findByCourseId=(Id, result) => {
  //console.log(Id);
  sql.query(`SELECT COUNT(*) AS totalcourse FROM course WHERE course.id_level = ${Id}`, (err, res) => {
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
module.exports = Level;
