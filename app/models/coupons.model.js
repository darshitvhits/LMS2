const sql = require("./db.js");
const moment = require('moment');

// constructor
const Coupon = function (coupon) {
    this.code = coupon.code;
    this.type = coupon.type;
    this.amount= coupon.amount;
    this.expire_at=coupon.expire_at;
    this.max_allowed=coupon.max_allowed;
    this.user_allowed=coupon.user_allowed;
    //this.total_used=coupon.total_used;
    this.status = coupon.status;
    //this.created_at = coupon.created_at;
  };


  Coupon.create = (newcoupon, result) => {
    sql.query("INSERT INTO coupons SET ?", newcoupon, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created category: ", { id: res.insertId, ...newcoupon });
      result(null, { id: res.insertId, ...newcoupon });
    });
  };


  Coupon.findByName = async (coponcode, result) => {
    //console.log(CourseId);
    await sql.query(`SELECT * FROM coupons WHERE coupons.code = '${coponcode}'`, (err, res) => {
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


  Coupon.getAll = result => {
    sql.query("SELECT * FROM coupons ", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      res.map((element,index)=>{
        var createdate = new Date(element.created_at);
        var now = moment(createdate).format('l');
        element.created_at=now;
        var expiredate = new Date(element.expire_at);
        var now = moment(expiredate).format('l');
        element.expire_at=now;
      })
      console.log("coupons: ", res);
      result(null, res);
    });
  };


  Coupon.findById = (CouponId, result) => {
    sql.query(`SELECT * FROM coupons WHERE id = ${CouponId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        var createdate = new Date(res[0].created_at);
        var now = moment(createdate).format('l');
        res[0].created_at=now;
        var expiredate = new Date(res[0].expire_at);
        var now = moment(expiredate).format('l');
        res[0].expire_at=now;
        console.log("found coupon: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found User with the id
      result({ kind: "not_found" }, null);
    });
  };



  Coupon.updateById = (id, coupon, result) => {
    sql.query(
      "UPDATE coupons SET ? WHERE coupons.id = ?",
      [coupon, id],
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
  
        console.log("updated coupon: ", { id: id, ...coupon });
        result(null, { id: id, ...coupon });
      }
    );
  };
  

  Coupon.remove = (id, result) => {
    sql.query("DELETE FROM coupons WHERE id = ?", id, (err, res) => {
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
  
      console.log("deleted coupon with id: ", id);
      result(null, res);
    });
  };
  module.exports=Coupon;