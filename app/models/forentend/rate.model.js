const sql = require("../db");
const moment=require('moment');

// constructor
const Rate = function(rate) {

    this.user_id = rate.user_id;
    this.course_id = rate.course_id;
    this.filed1 = rate.filed1;
    this.filed2 = rate.filed2;
    this.filed3 = rate.filed3;
    this.filed4 = rate.filed4;
    this.filed5 = rate.filed5;
    this.total=rate.total;
  };
  
  Rate.findById = async(UserId,CourseId, result) => {
    console.log(CourseId);
    await sql.query(`SELECT * FROM rateoncourse WHERE rateoncourse.user_id = ${UserId} AND rateoncourse.course_id=${CourseId}`,(err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }if (res.length) {
        console.log("found Course: ", res[0]);
        result(null, res[0]);
        return;
      }else{
        result(err='err', null);
      }
  })}

  Rate.create = (rate, result) => {
    sql.query("INSERT INTO rateoncourse SET ?", rate, async(err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      await sql.query(`SELECT AVG(rateoncourse.total) AS total FROM rateoncourse WHERE rateoncourse.course_id=${rate.course_id}`,(err,res)=>{
          console.log(res[0].total);
        sql.query(`UPDATE course SET course.rate=${res[0].total} WHERE course.id =${rate.course_id}`,(err,res)=>{
            console.log('update')
        })
      })
      console.log("created rate: ", { id: res.insertId, ...rate });
      result(null, { id: res.insertId, ...rate });
    });
  };

  module.exports = Rate;