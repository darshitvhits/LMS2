const sql = require("./db.js");
const moment=require('moment');

// constructor
const Smtp = function(smtp) {
    this.protocol=smtp.protocol;
    this.smtp_host=smtp.smtp_host;
    this.smtp_port=smtp.smtp_port;
    this.smtp_username=smtp.smtp_username;
    this.smtp_password=smtp.smtp_password;
};

Smtp.create = (newsmtp, result) => {
    sql.query("INSERT INTO smtpsetting SET ?", newsmtp, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created smtp: ", { id: res.insertId, ...newsmtp });
        result(null, { id: res.insertId, ...newsmtp });
    });
};


Smtp.getAll = result => {
    sql.query("SELECT * FROM  smtpsetting", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Smtp: ", res);
        result(null, res);
    });
};


Smtp.findById = (SmtpId, result) => {
    sql.query(`SELECT * FROM smtpsetting WHERE id = ${SmtpId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found smtp: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found User with the id
        result({ kind: "not_found" }, null);
    });
};


Smtp.updateById = (id, smtp, result) => {
    sql.query(
        "UPDATE smtpsetting SET ? WHERE id = ?",
        [smtp, id],
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

            console.log("updated Smtp: ", { id: id, ...smtp });
            result(null, { id: id, ...smtp });
        }
    );
};


Smtp.remove = (id, result) => {
    sql.query("DELETE FROM smtpsetting WHERE id = ?", id, (err, res) => {
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

        console.log("deleted smtp with id: ", id);
        result(null, res);
    });
};
module.exports=Smtp;