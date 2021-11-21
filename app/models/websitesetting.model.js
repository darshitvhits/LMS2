const sql = require("./db.js");
const moment=require('moment');


// constructor
const Website = function(website) {
    this.recaptcha_sitekey = website.recaptcha_sitekey;
    this.recaptcha_secretkey = website.recaptcha_secretkey;
    this.cookie_status = website.cookie_status;
    this.cookie_note = website.cookie_note;
    this.cookie_policy = website.cookie_policy;
    this.terms_and_condition = website.terms_and_condition;
    this.privacy_policy = website.privacy_policy;
    this.logo=website.logo;
  };


  Website.create = (website, result) => {
    sql.query("INSERT INTO website_seting SET ?", website, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created website_seting: ", { id: res.insertId, ...website });
      result(null, { id: res.insertId, ...website });
    });
  };


  Website.findById = (WebsiteId, result) => {
    sql.query(`SELECT * FROM website_seting WHERE id = ${WebsiteId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found Website_seting: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found User with the id
      result({ kind: "not_found" }, null);
    });
  };


  Website.getAll = result => {
    sql.query("SELECT * FROM website_seting", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("website: ", res);
      result(null, res);
    });
  };


  Website.updateById = (id,website, result) => {
    sql.query(
      "UPDATE website_seting SET ? WHERE id = ?",
      [website, id],
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
  
        console.log("updated Website_setting: ", { id: id, ...website });
        result(null, { id: id, ...website });
      }
    );
  };



  Website.remove = (id, result) => {
    sql.query("DELETE FROM website_seting WHERE id = ?", id, (err, res) => {
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
  
      console.log("deleted website with id: ", id);
      result(null, res);
    });
  };

  module.exports=Website;