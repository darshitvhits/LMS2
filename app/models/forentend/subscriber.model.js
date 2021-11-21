const sql = require("../db.js");

const Subscribe = function(subscrib) {
    this.user_id = subscrib.user_id;
    this.Instructor_id = subscrib.Instructor_id;
  };

  Subscribe.create = (newsubscrib, result) => {
    sql.query("INSERT INTO subscriber SET ?",newsubscrib, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created user: ", { id: res.insertId, ...newsubscrib});
      result(null, { id: res.insertId, ...newsubscrib });
    });
  };

  Subscribe.exist = async(newobj, result) => {
    //console.log(CourseId);
    await sql.query(`SELECT * FROM subscriber WHERE subscriber.user_id = ${newobj.user_id} AND subscriber.Instructor_id = ${newobj.Instructor_id}`,(err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }if (res.length) {
        console.log("found User: ", res[0]);
        result(null, res[0]);
        return;
      }else{
        result(err='err', null);
      }
  })}


  Subscribe.remove = (newobj, result) => {
    sql.query(`DELETE FROM subscriber WHERE subscriber.user_id = ${newobj.user_id} AND subscriber.Instructor_id = ${newobj.Instructor_id}`, (err, res) => {
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
  
      console.log("unsubscribe this instructer.");
      result(null, res);
    });
  };


  Subscribe.student_dashbord = async (UserId, result) => {
    await sql.query(`SELECT SUM(orders.total_items) AS Total_Purchased_Courses FROM orders WHERE orders.id_users = ${UserId}`,async (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      
      var date=new Date(Date.now());
      var year = date.getFullYear();
      var month = ("0" + (date.getMonth() + 1)).slice(-2);
      var day = ("0" + date.getDate()).slice(-2);
      var lastdate=new Date(parseInt(Date.now())-2592000000);
      var year1 = lastdate.getFullYear();
      var month1 = ("0" + (lastdate.getMonth() + 1)).slice(-2);
      var day1 = ("0" + lastdate.getDate()).slice(-2);
      const startdate=`${year1}-${month1}-${day1}`;
      const enddate=`${year}-${month}-${day}`;
      
      sql.query(`SELECT SUM(orders.total_items) AS New FROM orders WHERE orders.id_users = ${UserId} AND orders.created_at BETWEEN '${startdate}' AND '${enddate}'`, (err, res1) => {
        res[0].New=res1[0].New;
      })
      var response=[]
      sql.query(`SELECT count(*) AS New FROM subscriber WHERE subscriber.user_id = ${UserId} AND subscriber.created_at BETWEEN '${startdate}' AND '${enddate}'`, (err, res3) => {
        
      sql.query(`SELECT COUNT(*) AS Total_Instrutors_Followe FROM subscriber WHERE subscriber.user_id = ${UserId}`,async (err, res2) => {
        res2[0].New=res3[0].New;
        console.log(res2)
        
        console.log(res2)
        response.push(res[0]);
        response.push(res2[0])
        result(null, response);
        return;
      })
    })
      
    });
  };
  module.exports=Subscribe;