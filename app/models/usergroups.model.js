const sql = require("./db.js");
const moment=require('moment');
// constructor
const Usergroups = function(usergroups) {
  this.name = usergroups.name;
  this.status = usergroups.status;
  //this.created_at = usergroups.created_at;
};

Usergroups.getAll = result => {
  sql.query("SELECT * FROM usergroups", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    res.map((element,index)=>{
      var createdate = new Date(element.created_at);
      var now = moment(createdate).format('l');
      element.created_at=now
      //console.log(element.modified_at);
    })
    console.log("Usergroups: ", res);
    result(null, res);
  });
};

Usergroups.create = (newUsergroups, result) => {
  sql.query("INSERT INTO usergroups SET ?", newUsergroups, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created usergroups: ", { id: res.insertId, ...newUsergroups });
    result(null, { id: res.insertId, ...newUsergroups });
  });
};



Usergroups.findByName = async(UsergroupsId, result) => {
  //console.log(CourseId);
  await sql.query(`SELECT * FROM usergroups WHERE usergroups.name = '${UsergroupsId}'`,(err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }if (res.length) {
      console.log("found usergroups: ", res[0]);
      result(null, res[0]);
      return;
    }else{
      result(err='err', null);
    }
})}



Usergroups.findById = (UsergroupsId, result) => {
  sql.query(`SELECT * FROM usergroups WHERE id = ${UsergroupsId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      var createdate = new Date(res[0].created_at);
      var now = moment(createdate).format('l');
      res[0].created_at=now;
      console.log("found usergroups: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

Usergroups.updateById = (id, Usergroups, result) => {
  sql.query(
    "UPDATE usergroups SET name = ?, status = ? WHERE id = ?",
    [Usergroups.name, Usergroups.status, id],
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
      console.log("updated usergroups: ", { id: id, ...Usergroups });
      result(null, { id: id, ...Usergroups });
    }
  );
};

Usergroups.remove = (id, result) => {
  sql.query("DELETE FROM usergroups WHERE id = ?", id, (err, res) => {
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
    console.log("deleted usergroups with id: ", id);
    result(null, res);
  });
};

module.exports = Usergroups;
