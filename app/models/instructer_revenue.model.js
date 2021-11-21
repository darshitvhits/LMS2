const sql = require("./db.js");
const moment=require('moment');

// constructor
const Insructer = function(insructer) {
   this.Instructor_revenue_percentage=insructer.Instructor_revenue_percentage;
   this.Admin_revenue_percentage=insructer.Admin_revenue_percentage;
};

Insructer.create = (newinsructer, result) => {
    sql.query("INSERT INTO instructer_commission_setting SET ?", newinsructer, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created Insructer: ", { id: res.insertId, ...newinsructer });
        result(null, { id: res.insertId, ...newinsructer });
    });
};



Insructer.getAll = result => {
    sql.query("SELECT * FROM  instructer_commission_setting", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Instructer: ", res);
        result(null, res);
    });
};


Insructer.findById = (InstructerId, result) => {
    sql.query(`SELECT * FROM instructer_commission_setting WHERE id = ${InstructerId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found instructer: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found stripe with the id
        result({ kind: "not_found" }, null);
    });
};


Insructer.updateById = (id, instructer, result) => {
    sql.query(
        "UPDATE instructer_commission_setting SET ? WHERE id = ?",
        [instructer, id],
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

            console.log("updated Stripe: ", { id: id, ...instructer });
            result(null, { id: id, ...instructer });
        }
    );
};




Insructer.remove = (id, result) => {
    sql.query("DELETE FROM instructer_commission_setting WHERE id = ?", id, (err, res) => {
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

        console.log("deleted instructer with id: ", id);
        result(null, res);
    });
};
module.exports=Insructer;
