const sql = require("./db.js");
const moment=require('moment');
// constructor
const Features = function(features) {
  this.name = features.name;
  this.status = features.status;
  //this.created_at = features.created_at;
  //this.modified_at = features.modified_at;
};

Features.getAll = result => {
  sql.query("SELECT * FROM features", (err, res) => {
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
    console.log("Features: ", res);
    result(null, res);
  });
};

Features.create = (newFeatures, result) => {
  sql.query("INSERT INTO features SET ?", newFeatures, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created features: ", { id: res.insertId, ...newFeatures });
    result(null, { id: res.insertId, ...newFeatures });
  });
};



Features.findByName = async(FeaturesId, result) => {
  //console.log(CourseId);
  await sql.query(`SELECT * FROM features WHERE features.name = '${FeaturesId}'`,(err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }if (res.length) {
      console.log("found features: ", res[0]);
      result(null, res[0]);
      return;
    }else{
      result(err='err', null);
    }
})}



Features.findById = (FeaturesId, result) => {
  sql.query(`SELECT * FROM features WHERE id = ${FeaturesId}`, (err, res) => {
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
      console.log("found features: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

Features.updateById = (id, Features, result) => {
  sql.query(
    "UPDATE features SET name = ?, status = ? WHERE id = ?",
    [Features.name, Features.status, id],
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
      console.log("updated features: ", { id: id, ...Features });
      result(null, { id: id, ...Features });
    }
  );
};

Features.remove = (id, result) => {
  sql.query("DELETE FROM features WHERE id = ?", id, (err, res) => {
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
    console.log("deleted features with id: ", id);
    result(null, res);
  });
};

Features.findByCourseId=(Id, result) => {
  //console.log(Id);
  sql.query(`SELECT COUNT(*) AS totalcourse FROM course WHERE course.id_features = ${Id}`, (err, res) => {
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

module.exports = Features;
