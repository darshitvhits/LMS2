const sql = require("./db.js");
const moment=require('moment');
// constructor
const Price = function(price) {
  this.name = price.name;
  this.status = price.status;
  //this.created_at = price.created_at;
  //this.modified_at = price.modified_at;
};

Price.getAll = result => {
  sql.query("SELECT * FROM price", (err, res) => {
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
    console.log("Price: ", res);
    result(null, res);
  });
};

Price.create = (newPrice, result) => {
  sql.query("INSERT INTO price SET ?", newPrice, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created price: ", { id: res.insertId, ...newPrice });
    result(null, { id: res.insertId, ...newPrice });
  });
};


Price.findByName = async(PriceId, result) => {
  //console.log(CourseId);
  await sql.query(`SELECT * FROM price WHERE price.name = '${PriceId}'`,(err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }if (res.length) {
      console.log("found price: ", res[0]);
      result(null, res[0]);
      return;
    }else{
      result(err='err', null);
    }
})}



Price.findById = (PriceId, result) => {
  sql.query(`SELECT * FROM price WHERE id = ${PriceId}`, (err, res) => {
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
      console.log("found price: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

Price.updateById = (id, Price, result) => {
  sql.query(
    "UPDATE price SET name = ?, status = ? WHERE id = ?",
    [Price.name, Price.status, id],
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
      console.log("updated price: ", { id: id, ...Price });
      result(null, { id: id, ...Price });
    }
  );
};

Price.remove = (id, result) => {
  sql.query("DELETE FROM price WHERE id = ?", id, (err, res) => {
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
    console.log("deleted price with id: ", id);
    result(null, res);
  });
};



Price.findByCourseId=(Id, result) => {
  //console.log(Id);
  sql.query(`SELECT COUNT(*) AS totalcourse FROM course WHERE course.id_price = ${Id}`, (err, res) => {
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


module.exports = Price;
