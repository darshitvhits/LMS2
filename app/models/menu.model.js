const sql = require("./db.js");
const moment=require('moment');
// constructor
const Menu = function(menu) {
  this.title = menu.title;
  this.slug = menu.slug;
  this.position=menu.position;
  this.status=menu.status;
  //this.created_at = menu.created_at;
  //this.modified_at = menu.modified_at;
};


Menu.getAll = result => {
    sql.query("SELECT * FROM cms_menu", (err, res) => {
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
      console.log("menu: ", res);
      result(null, res);
    });
  };



Menu.create = (newmenu, result) => {
    sql.query("INSERT INTO cms_menu SET ?", newmenu, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created menu: ", { id: res.insertId, ...newmenu });
      result(null, { id: res.insertId, ...newmenu });
    });
  };


  Menu.findByName = async(menuId, result) => {
    //console.log(CourseId);
    await sql.query(`SELECT * FROM cms_menu WHERE cms_menu.title = '${menuId}'`,(err, res) => {
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



  Menu.findById = (MenuId, result) => {
    sql.query(`SELECT * FROM cms_menu WHERE id = ${MenuId}`, (err, res) => {
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
        console.log("found topic: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found User with the id
      result({ kind: "not_found" }, null);
    });
  };



  Menu.updateById = (id,newmenu, result) => {
    sql.query(
      "UPDATE cms_menu SET ? WHERE id = ?",
      [newmenu, id],
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
        console.log("updated topic: ", { id: id, ...newmenu });
        result(null, { id: id, ...newmenu });
      }
    );
  };


  Menu.remove = (id, result) => {
    sql.query("DELETE FROM cms_menu WHERE id = ?", id, (err, res) => {
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
      console.log("deleted menu with id: ", id);
      result(null, res);
    });
  };
module.exports=Menu;