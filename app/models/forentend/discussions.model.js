const sql = require("../db.js");

const Discussions = function(discussions) {
    this.user_id = discussions.user_id;
    this.Instructor_id = discussions.Instructor_id;
    this.comment = discussions.comment;
    this.c_like=discussions.c_like;
    this.dislike=discussions.dislike;
  };

  Discussions.create = (newcomment, result) => {
    sql.query("INSERT INTO discussions SET ?",newcomment, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      
      result(null, {"message":'you have succesfully send comment.'});
    });
  };


  Discussions.displaycomment= (instructer_id, result) => {
    sql.query(`SELECT discussions.id,users.first_name,users.last_name,discussions.comment,discussions.created_at,discussions.c_like,discussions.dislike FROM discussions LEFT JOIN users ON discussions.user_id=users.id WHERE discussions.Instructor_id = ${instructer_id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      res.map((element,index)=>{
          let create=element.created_at.getTime();
          let final=parseInt(Date.now())-parseInt(create);
          var time=final/(60*60*1000);
          console.log(time)
          if(time<1){
            time=time*60;
            element.created_at=`${parseInt(time)} minutes ago`;
          }else if(time>=24){
            time=(time*60)/1440;
            element.created_at=`${parseInt(time)} days ago`;
          }else{
          element.created_at=`${parseInt(time)} hour ago`;
          }
      })
      
        console.log("found comment: ", res);
        result(null, res);
        return;
    });
  };


  Discussions.likecomment= (id,result) => {
    sql.query(
        `UPDATE discussions SET discussions.c_like=c_like+1 WHERE discussions.id =${id}`,
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

            console.log("like comment: ", { id: id, ...id});
            result(null, {"message":"like comment sucessfully"});
        }
    );
};


Discussions.dislikecomment= (id,result) => {
    sql.query(
        `UPDATE discussions SET discussions.dislike=dislike+1 WHERE discussions.id =${id}`,
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

            console.log("dislike comment: ", { id: id, ...id});
            result(null, {"message":"dislike comment sucessfully"});
        }
    );
};
module.exports=Discussions;