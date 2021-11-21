const sql = require("../db.js");
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
