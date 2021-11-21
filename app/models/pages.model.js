const sql = require("./db.js");
const moment=require('moment');

const Pages = function(pages) {
    this.title = pages.title;
    this.slug = pages.slug;
    this.description=pages.description;
    this.status=pages.status;
    //this.created_at = pages.created_at;
    //this.modified_at = pages.modified_at;
  };


  Pages.create = (newpage, result) => {
    sql.query("INSERT INTO cms_pages SET ?", newpage, (err, res) => {
        //console.log(res);
        if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      
     // console.log("created pages: ", { id: res.insertId, ...newpage });
     //result(null,'done')
     result(null,newpage);
    });
  };



  Pages.findByName = async(pageId, result) => {
    //console.log(CourseId);
    await sql.query(`SELECT * FROM cms_pages WHERE cms_pages.title = '${pageId}'`,(err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }if (res.length) {
        console.log("found page: ", res[0]);
        result(null, res[0]);
        return;
      }else{
        result(err='err', null);
      }
  })}



  Pages.getAll = result => {
    sql.query("SELECT * FROM cms_pages", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      res.map((element,index)=>{
        var modifydate = new Date(element.modified_at);
        var now = moment(modifydate).format('l');
        element.modified_at=now
        var createdate = new Date(element.created_at);
        var now = moment(createdate).format('l');
        element.created_at=now
        //console.log(element.modified_at);
      })
      console.log("pages: ", res);
      result(null, res);
    });
  };


  Pages.findById = (PagesId, result) => {
    sql.query(`SELECT * FROM cms_pages WHERE id = ${PagesId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        var modifydate = new Date(res[0].modified_at);
        var now = moment(modifydate).format('l');
        res[0].modified_at=now;
        var createdate = new Date(res[0].created_at);
        var now = moment(createdate).format('l');
        res[0].created_at=now;
        console.log("found Pages: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found User with the id
      result({ kind: "not_found" }, null);
    });
  };



  Pages.updateById = (id, Pages, result) => {
    sql.query(
      "UPDATE cms_pages SET ? WHERE id = ?",
      [Pages, id],
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
        console.log("updated pages: ", { id: id, ...Pages });
        result(null, { id: id, ...Pages });
      }
    );
  };




  Pages.remove = (id, result) => {
    sql.query("DELETE FROM cms_pages WHERE id = ?", id, (err, res) => {
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
      console.log("deleted pages with id: ", id);
      result(null, res);
    });
  };

  module.exports = Pages;