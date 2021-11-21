const sql = require("./db.js");
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
  this.biography = user.biography;
  this.watch_history = user.watch_history;
  this.wishlist = user.wishlist;
  this.title = user.title;
  this.verification_code = user.verification_code;
  this.image = user.image;
  this.status = user.status;
  this.is_instructor = user.is_instructor;
  //this.created_at = user.created_at;
  //this.modified_at = user.modified_at;
  this.last_login_at = user.last_login_at;
  this.last_login_ip = user.last_login_ip;
  this.id_company=user.id_company;
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



User.getAll = result => {
  sql.query("SELECT * FROM users  where is_instructor = '0'", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    res.map((element,index)=>{
      var modifydate = new Date(element.modified_at);
      var now = moment(modifydate).format('l');
      element.modified_at=now;
      console.log(element.modified_at);
      var createdate = new Date(element.created_at);
      var now = moment(createdate).format('l');
      element.created_at=now;
    })
    console.log("Users: ", res);
    result(null, res);
  });
};



User.getAllInstructor = result => {
  sql.query("SELECT * FROM users where is_instructor = '1'", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Users: ", res);
    result(null, res);
  });
};

/*User.getAll = result => {
  sql.query("SELECT * FROM users  where is_instructor = '0'", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Users: ", res);
    result(null, res);
  });
};*/

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET ? WHERE id = ?",
    [user, id],
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

      console.log("updated User: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
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

    console.log("deleted User with id: ", id);
    result(null, res);
  });
};

User.removeAll = result => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Users`);
    result(null, res);
  });
};

User.login=(useremail,password1,result)=>{
  sql.query(`SELECT * FROM users WHERE users.id_group=1  AND users.email = '${useremail}' `,async(err, res) => {
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


User.passawordresate=(id,passwordold,passwordnew,result)=>{
  sql.query(`SELECT * FROM users WHERE users.id = '${id}'`,async(err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      const exist=await bcrypt.compare(passwordold,res[0].password);
      if(exist){
        const salt=await bcrypt.genSalt(15);
        newpassword=await bcrypt.hash(passwordnew,salt);
        // Create a User
        const user = new User({
          id_group : res[0].id_group,
          first_name : res[0].first_name,
          last_name : res[0].last_name,
          email : res[0].email,
          password : newpassword,
          biography : res[0].biography,
          watch_history : res[0].watch_history,
          wishlist : res[0].wishlist,
          title : res[0].title,
          verification_code : res[0].verification_code,
          image : res[0].image,
          status : res[0].status,
          is_instructor : res[0].is_instructor,
          created_at :res[0].created_at,
          modified_at : res[0].modified_at,
          last_login_at : res[0].last_login_at,
          last_login_ip :res[0].last_login_ip,
          id_company:res[0].id_company,
        });
        const done=sql.query("UPDATE users SET ? WHERE id = ?",[user, id]);
        if(done){
          result(null,{ kind: "password resate successfully"});
          return;
        }
       
      }
        result(null,{ kind: "password not match" });
        return;    
      
    }
      result({ kind: "user not exist" }, null);
  })
}



User.findByToken = (token, result) => {
  sql.query(`SELECT * FROM users WHERE users.token = '${token}'`, (err, res) => {
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
      const exist=res[0].token_time>Date.now();
      console.log(exist);
      if(exist===false){
        result(null,{ kind: "not_found" });
        return;
      }
      console.log("found User: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};


User.getAlladmin = result => {
  sql.query("SELECT * FROM users where users.id_group = 1", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Users: ", res);
    result(null, res);
  });
};



User.findNumberOfCourse = (UserId, result) => {
  sql.query(`SELECT COUNT(*) AS numberofcourse FROM course WHERE course.id_user = ${UserId} AND course.status='1'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.dashbord = result => {
  sql.query("SELECT * FROM users WHERE users.status=1", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    total_instructer=0;
    total_student=0;
    res.map((element,index)=>{
      if(element.id_group===2){
        total_student++
      }
      if(element.id_group===3){
        total_instructer++
      }
    })
    sql.query("SELECT COUNT(*) AS total_company FROM company WHERE company.status=1", (err, res) => {
    console.log(res[0].total_company);
    let total_company=res[0].total_company;
    sql.query("SELECT COUNT(*) AS total_course FROM course WHERE course.status=1", (err, res) => {
    let total_course=res[0].total_course;
    res={};
    res.total_instructer=total_instructer;
    res.total_student=total_student;
    res.total_company=total_company;
    res.total_course=total_course;
    result(null, res);
    })
    
    })
  });
};

module.exports = User;




