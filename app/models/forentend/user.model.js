const sql = require("../db.js");
const moment=require('moment');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
// constructor
const User = function(user) {
  this.id_group = user.id_group;
  this.first_name = user.first_name;
  this.last_name = user.last_name;
  this.email = user.email;
  this.password = user.password;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};



User.findByName = async(UserId, result) => {
  //console.log(CourseId);
  await sql.query(`SELECT * FROM users WHERE users.email = '${UserId}'`,(err, res) => {
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

User.login=(useremail,password1,result)=>{
    sql.query(`SELECT * FROM users WHERE users.email = '${useremail}' `,async(err, res) => {
      //console.log(err);
      if (err!==null) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      
      if (res.length) {
        let user=await bcrypt.compare(password1,res[0].password);
        console.log(user);
        //console.log(res[0].id);
        if(user){
          console.log('done');
          const paylod={
            user:{
              id:res[0].id
            }
          };
          console.log(paylod);
          const token=await jwt.sign(paylod,'asdfghjkl',{expiresIn: '24h'});
          //result({ kind: "user login successfully" },null);
          result(null,{ kind: "user login successfully",token:token,res:res[0] });
          return;    
        }
        
         result(null,{ kind: "Email or Password is wrong" });
          //result(null, res[0].password);
          return;
      }
      
      result(null,{ kind: "user not exist" });
    })
  }


  User.findById = (UserId, result) => {
    sql.query(`SELECT * FROM users WHERE id = ${UserId}`, (err, res) => {
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
        console.log("found User: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found User with the id
      result({ kind: "not_found" }, null);
    });
  };
  

  User.instructer_profile=(UserId, result) => {
    sql.query(`SELECT users.first_name,users.last_name,users.biography,course.title FROM users LEFT JOIN course ON users.id=course.	id_user WHERE users.id = ${UserId}`,async (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      var title=[]
      res.map((element,index)=>{
        title.push(`"${element.title}"`)
      })
      sql.query(`SELECT COUNT(*) AS Subscribers FROM subscriber WHERE subscriber.Instructor_id=${UserId}`,(err,res2)=>{
        res[0].Name=`${res[0].first_name} ${res[0].last_name}`;
        delete res[0].first_name;
        delete res[0].last_name;
        if(parseInt(res2[0].Subscribers)>=1000){
          res[0].Subscribers=`${parseInt(res2[0].Subscribers)/1000}K`;
        }else{
          res[0].Subscribers=res2[0].Subscribers;
        }
        //res[0].Subscribers=res2[0].Subscribers;
        console.log(res[0]);
      })
      sql.query(`SELECT COUNT(orders_course.id) AS Enroll_Students,COUNT(DISTINCT orders_course.course_title) AS Courses FROM orders_course WHERE orders_course.course_title IN (${title})`,(err,res3)=>{
        if(parseInt(res3[0].Enroll_Students)>=1000){
          res[0].Enroll_Students=`${parseInt(res3[0].Enroll_Students)/1000}K`;
        }else{
          res[0].Enroll_Students=res3[0].Enroll_Students;
        }
        //res[0].Enroll_Students=res3[0].Enroll_Students;
        res[0].Courses=res3[0].Courses;
        delete res[0].title;
        console.log(res[0]);
        result(null, res[0]);
        return;
      })
        //console.log(res[0])
        //result(null, res[0]);
        //return;
    });
  };
module.exports=User;