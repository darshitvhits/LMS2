const sql = require("./db.js");
const moment = require('moment');
// constructor
const Category = function (category) {
  this.code = category.code;
  this.name = category.name;
  this.parent = category.parent;
  this.slug = category.slug;
  this.status = category.status;
  //this.created_at = category.created_at;
  //this.modified_at = category.modified_at;
  this.thumbnail = category.thumbnail;
};

Category.getAll = result => {
  //sql.query("SELECT course.id AS course_id,c.id, c.code, c.name, c.parent, c.slug, c.created_at, c.modified_at, c.thumbnail, c2.name as parent_categoty_name FROM category AS c LEFT JOIN category AS c2 ON c2.parent = c.id LEFT JOIN course ON c.id=course.id_category", async(err, res) => {
  sql.query(`SELECT c.id, c.code, c.name, c.parent, c.slug, c.created_at, c.modified_at, c.thumbnail,c.status, c2.name as parent_categoty_name FROM category AS c LEFT JOIN category AS c2 ON c2.parent = c.id `, async (err, res) => {
    //sql.query(`SELECT course.title FROM course WHERE course.id_category = '${15}' `,(err,res)=>{
    //console.log(data);
    //});
    //console.log(deta);
    if (err) {
      //console.log("error: ", err);
      result(null, err);
      return;
    }
    res.map((element, index) => {
      var modifydate = new Date(element.modified_at);
      var now = moment(modifydate).format('l');
      element.modified_at = now
      var createdate = new Date(element.created_at);
      var now = moment(createdate).format('l');
      element.created_at = now
      //console.log(element.modified_at);
    })
    console.log("Category: ", typeof (res));
    result(null, res);
  });
};

Category.findnumber = (Id, result) => {
  //console.log(Id);
  sql.query(`SELECT COUNT(*) AS totalcourse FROM course WHERE course.id_category = ${Id}`, (err, res) => {
    console.log(res);
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
     }

    if (res.length) {

      //console.log(total);
      result(null, { Total_course: res[0].totalcourse });
      return;
    }
    //console.log(total);
    //console.log(deta);
  })
  //console.log(deta);
  //console.log(dell);
}






Category.create = (newCategory, result) => {
  sql.query("INSERT INTO category SET ?", newCategory, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created category: ", { id: res.insertId, ...newCategory });
    result(null, { id: res.insertId, ...newCategory });
  });
};


Category.findByName = async (CategoryId, result) => {
  //console.log(CourseId);
  await sql.query(`SELECT * FROM category WHERE category.name = '${CategoryId}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } if (res.length) {
      console.log("found Course: ", res[0]);
      result(null, res[0]);
      return;
    } else {
      result(err = 'err', null);
    }
  })
}



Category.findById = (CategoryId, result) => {
  sql.query(`SELECT * FROM category WHERE id = ${CategoryId}`, (err, res) => {
    //var deta=sql.query(`SELECT course.title FROM course WHERE course.id_category = '${CategoryId}' `);
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      var modifydate = new Date(res[0].modified_at);
      var now = moment(modifydate).format('l');
      res[0].modified_at = now;
      var createdate = new Date(res[0].created_at);
      var now = moment(createdate).format('l');
      res[0].created_at = now;
      console.log("found category: ", res[0]);
      //console.log(deta);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

Category.updateById = (id, Category, thumpath, result) => {
  console.log(thumpath);
  sql.query(
    "UPDATE category SET code = ?, name = ?, parent = ?,status=?, slug = ?, thumbnail = ? WHERE id = ?",
    [Category.code, Category.name, Category.parent,Category.status, Category.slug, thumpath, id],
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
      console.log("updated category: ", { id: id, ...Category });
      result(null, { id: id, ...Category });
    }
  );
};

Category.remove = (id, result) => {
  sql.query("DELETE FROM category WHERE id = ?", id, (err, res) => {
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
    console.log("deleted category with id: ", id);
    result(null, res);
  });
};

module.exports = Category;
