const sql = require("./db.js");
const moment=require('moment');


// constructor
const System = function(system) {
    this.name=system.name;
    this.title=system.title;
    this.keywords=system.keywords;
    this.description=system.description;
    this.Author=system.Author;
    this.Slogan=system.Slogan;
    this.email=system.email;	
    this.address=system.address;
    this.phone=system.phone;
    this.youtube_api_key=system.youtube_api_key;
    this.vimeo_api_key=system.vimeo_api_key;
    this.student_email_verification=system.student_email_verification;
    this.footer_text=system.footer_text;
    this.footer_link=system.footer_link;	
};

System.create = (newsystem, result) => {
    sql.query("INSERT INTO system_seting SET ?", newsystem, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created user: ", { id: res.insertId, ...newsystem });
        result(null, { id: res.insertId, ...newsystem });
    });
};


System.getAll = result => {
    sql.query("SELECT * FROM  system_seting", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("System: ", res);
        result(null, res);
    });
};
  


System.findById = (SystemId, result) => {
    sql.query(`SELECT * FROM system_seting WHERE id = ${SystemId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found system: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found User with the id
        result({ kind: "not_found" }, null);
    });
};
  

System.updateById = (id, system, result) => {
    sql.query(
        "UPDATE system_seting SET ? WHERE id = ?",
        [system, id],
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

            console.log("updated System: ", { id: id, ...system });
            result(null, { id: id, ...system });
        }
    );
};



System.remove = (id, result) => {
    sql.query("DELETE FROM system_seting WHERE id = ?", id, (err, res) => {
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

        console.log("deleted system with id: ", id);
        result(null, res);
    });
};
  
module.exports=System;