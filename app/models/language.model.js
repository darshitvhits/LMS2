const sql = require("./db.js");
const moment=require('moment');
// constructor
const Language = function(language) {
  this.name = language.name;
  this.status = language.status;
  //this.created_at = language.created_at;
  //this.modified_at = language.modified_at;
};

Language.getAll = result => {
  sql.query("SELECT * FROM language", (err, res) => {
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
    console.log("Language: ", res);
    result(null, res);
  });
};

Language.create = (newLanguage, result) => {
  sql.query("INSERT INTO language SET ?", newLanguage, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created language: ", { id: res.insertId, ...newLanguage });
    result(null, { id: res.insertId, ...newLanguage });
  });
};



Language.findByName = async(LanguageId, result) => {
  //console.log(CourseId);
  await sql.query(`SELECT * FROM language WHERE language.name = '${LanguageId}'`,(err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }if (res.length) {
      console.log("found language: ", res[0]);
      result(null, res[0]);
      return;
    }else{
      result(err='err', null);
    }
})}





Language.findById = (LanguageId, result) => {
  sql.query(`SELECT * FROM language WHERE id = ${LanguageId}`, (err, res) => {
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
      console.log("found language: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

Language.updateById = (id, Language, result) => {
  sql.query(
    "UPDATE language SET name = ?, status = ? WHERE id = ?",
    [Language.name, Language.status, id],
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
      console.log("updated language: ", { id: id, ...Language });
      result(null, { id: id, ...Language });
    }
  );
};

Language.remove = (id, result) => {
  sql.query("DELETE FROM language WHERE id = ?", id, (err, res) => {
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
    console.log("deleted language with id: ", id);
    result(null, res);
  });
};



Language.findByCourseId=(Id, result) => {
  //console.log(Id);
  sql.query(`SELECT COUNT(*) AS totalcourse FROM course WHERE course.id_language = ${Id}`, (err, res) => {
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


module.exports = Language;
