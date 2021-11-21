const sql = require("./db.js");
const moment=require('moment');

// constructor
const Currency = function(currency) {
    this.system_currency=currency.system_currency;
    this.currency_position=currency.currency_position;
};

Currency.create = (newcurrency, result) => {
    sql.query("INSERT INTO system_currency_settings SET ?",newcurrency, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created currency: ", { id: res.insertId, ...newcurrency});
        result(null, { id: res.insertId, ...newcurrency});
    });
};


Currency.getAll = result => {
    sql.query("SELECT * FROM  system_currency_settings", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("currency: ", res);
        result(null, res);
    });
};


Currency.findById = (currencyId, result) => {
    sql.query(`SELECT * FROM system_currency_settings WHERE id = ${currencyId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found currency: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found User with the id
        result({ kind: "not_found" }, null);
    });
};


Currency.updateById = (id, currency, result) => {
    sql.query(
        "UPDATE system_currency_settings SET ? WHERE id = ?",
        [currency, id],
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

            console.log("updated cuirrency: ", { id: id, ...currency });
            result(null, { id: id, ...currency });
        }
    );
};


Currency.remove = (id, result) => {
    sql.query("DELETE FROM system_currency_settings WHERE id = ?", id, (err, res) => {
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

        console.log("deleted currency with id: ", id);
        result(null, res);
    });
};
module.exports=Currency;