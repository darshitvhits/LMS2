const sql = require("../db.js");
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
