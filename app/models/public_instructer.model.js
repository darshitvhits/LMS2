const sql = require("./db.js");
const moment=require('moment');

// constructor
const Publicinsructer = function(publicinsructer) {
   this.allow_public_instructor=publicinsructer.allow_public_instructor;
   this.Instructor_application_note=publicinsructer.Instructor_application_note;
};

Publicinsructer.create = (newinsructer, result) => {
    sql.query("INSERT INTO public_instructer_setting SET ?", newinsructer, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created Insructer: ", { id: res.insertId, ...newinsructer });
        result(null, { id: res.insertId, ...newinsructer });
    });
};



Publicinsructer.getAll = result => {
    sql.query("SELECT * FROM  public_instructer_setting", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("publicinstructer: ", res);
        result(null, res);
    });
};


Publicinsructer.findById = (PublicinstructerId, result) => {
    sql.query(`SELECT * FROM public_instructer_setting WHERE id = ${PublicinstructerId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Publicinstructer: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found stripe with the id
        result({ kind: "not_found" }, null);
    });
};


Publicinsructer.updateById = (id, publicinstructer, result) => {
    sql.query(
        "UPDATE public_instructer_setting SET ? WHERE id = ?",
        [publicinstructer, id],
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

            console.log("updated Stripe: ", { id: id, ...publicinstructer });
            result(null, { id: id, ...publicinstructer });
        }
    );
};


Publicinsructer.remove = (id, result) => {
    sql.query("DELETE FROM public_instructer_setting WHERE id = ?", id, (err, res) => {
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

        console.log("deleted publicinstructer with id: ", id);
        result(null, res);
    });
};
module.exports=Publicinsructer;