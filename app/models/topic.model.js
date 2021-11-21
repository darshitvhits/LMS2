const sql = require("./db.js");
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

Topic.create = (newTopic, result) => {
  sql.query("INSERT INTO topic SET ?", newTopic, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created topic: ", { id: res.insertId, ...newTopic });
    result(null, { id: res.insertId, ...newTopic });
  });
};



Topic.findByName = async(TopicId, result) => {
  //console.log(CourseId);
  await sql.query(`SELECT * FROM topic WHERE topic.name = '${TopicId}'`,(err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }if (res.length) {
      console.log("found topic: ", res[0]);
      result(null, res[0]);
      return;
    }else{
      result(err='err', null);
    }
})}



Topic.findById = (TopicId, result) => {
  sql.query(`SELECT * FROM topic WHERE id = ${TopicId}`, (err, res) => {
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
      console.log("found topic: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

Topic.updateById = (id, Topic, result) => {
  sql.query(
    "UPDATE topic SET name = ?, status = ? WHERE id = ?",
    [Topic.name, Topic.status, id],
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
      console.log("updated topic: ", { id: id, ...Topic });
      result(null, { id: id, ...Topic });
    }
  );
};

Topic.remove = (id, result) => {
  sql.query("DELETE FROM topic WHERE id = ?", id, (err, res) => {
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
    console.log("deleted topic with id: ", id);
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
