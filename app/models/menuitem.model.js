const sql = require("./db.js");
const moment=require('moment');
// constructor
const Menuitem = function(menuitem) {
  this.id_menu = menuitem.id_menu;
  this.id_page = menuitem.id_page;
  this.title = menuitem.title;
  this.link = menuitem.link;
  this.sortorder=menuitem.sortorder;
  this.type=menuitem.type;
  this.status=menuitem.status;
  //this.created_at = menuitem.created_at;
  //this.modified_at = menuitem.modified_at;
};


Menuitem.getAll = result => {
    sql.query("SELECT * FROM cms_menuitems", (err, res) => {
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
      console.log("menuitem: ", res);
      result(null, res);
    });
  };



Menuitem.create = (newmenuitem, result) => {
    sql.query("INSERT INTO cms_menuitems SET ?", newmenuitem, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created menu: ", { id: res.insertId, ...newmenuitem });
      result(null, { id: res.insertId, ...newmenuitem });
    });
  };


  Menuitem.findByName = async(menuitemId, result) => {
    //console.log(CourseId);
    await sql.query(`SELECT * FROM cms_menuitems WHERE cms_menuitems.title = '${menuitemId}'`,(err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }if (res.length) {
        console.log("found menu: ", res[0]);
        result(null, res[0]);
        return;
      }else{
        result(err='err', null);
      }
  })}



  Menuitem.findById = (MenuitemId, result) => {
    sql.query(`SELECT * FROM cms_menuitems WHERE id = ${MenuitemId}`, (err, res) => {
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
        console.log("found menuitem: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found User with the id
      result({ kind: "not_found" }, null);
    });
  };




  Menuitem.updateById = (id,newmenuitem, result) => {
    sql.query(
      "UPDATE cms_menuitems SET ? WHERE id = ?",
      [newmenuitem, id],
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
        console.log("updated menuitem: ", { id: id, ...newmenuitem });
        result(null, { id: id, ...newmenuitem });
      }
    );
  };


  Menuitem.remove = (id, result) => {
    sql.query("DELETE FROM cms_menuitems WHERE id = ?", id, (err, res) => {
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
      console.log("deleted menuitem with id: ", id);
      result(null, res);
    });
  };

  module.exports=Menuitem;