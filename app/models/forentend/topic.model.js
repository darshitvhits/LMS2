const sql = require("../db.js");
const moment=require('moment');
// constructor
const Topic = function(topic) {
  this.name = topic.name;
  this.status = topic.status;
  //this.created_at = topic.created_at;
  //this.modified_at = topic.modified_at;
};

Topic.getAll = result => {
  sql.query("SELECT * FROM topic", (err, res) => {
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
    console.log("Topic: ", res);
    result(null, res);
  });
};




Topic.findByCourseId=(Id, result) => {
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
module.exports = Topic;
