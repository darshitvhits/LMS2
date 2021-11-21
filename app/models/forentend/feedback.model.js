const sql = require("../db.js");
const moment=require('moment');

// constructor
const Feedback = function(feedback) {
    this.email = feedback.email;
    this.issue = feedback.issue;
    this.screenshot=feedback.screenshot
  };

  Feedback.create = (newfeedback, result) => {
    sql.query("INSERT INTO feedback SET ?",newfeedback, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created user: ", { id: res.insertId, ...newfeedback});
      result(null, { id: res.insertId, ...newfeedback });
    });
  };
  module.exports = Feedback;