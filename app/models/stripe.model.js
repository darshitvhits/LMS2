const sql = require("./db.js");
const moment=require('moment');

// constructor
const Stripe = function(stripe) {
    this.active=stripe.active;
    this.mode=stripe.mode;
    this.stripe_currency=stripe.stripe_currency;
    this.test_secret_key=stripe.test_secret_key;
    this.test_public_key=stripe.test_public_key;
    this.live_secret_key=stripe.live_secret_key;
    this.live_public_key=stripe.live_public_key;
};

Stripe.create = (newstripe, result) => {
    sql.query("INSERT INTO stripe_setting SET ?", newstripe, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created stripe: ", { id: res.insertId, ...newstripe });
        result(null, { id: res.insertId, ...newstripe });
    });
};


Stripe.getAll = result => {
    sql.query("SELECT * FROM  stripe_setting", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Stripe: ", res);
        result(null, res);
    });
};


Stripe.findById = (StripeId, result) => {
    sql.query(`SELECT * FROM stripe_setting WHERE id = ${StripeId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found stripe: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found stripe with the id
        result({ kind: "not_found" }, null);
    });
};


Stripe.updateById = (id, stripe, result) => {
    sql.query(
        "UPDATE stripe_setting SET ? WHERE id = ?",
        [stripe, id],
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

            console.log("updated Stripe: ", { id: id, ...stripe });
            result(null, { id: id, ...stripe });
        }
    );
};


Stripe.remove = (id, result) => {
    sql.query("DELETE FROM stripe_setting WHERE id = ?", id, (err, res) => {
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

        console.log("deleted stripe with id: ", id);
        result(null, res);
    });
};
module.exports=Stripe;