const sql = require("../db.js");
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
