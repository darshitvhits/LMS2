const sql = require("../db.js");
const moment=require('moment');

// constructor
const Order = function(order) {
    this.id_users = order.id_users;
    this.total_amount=order.total_amount;
    this.couponcode=order.couponcode;
    this.paid_amount=order.paid_amount;
    this.status = order.status;
    this.total_items = order.total_items;
    this.discount_amount=order.discount_amount;
  };

Order.create = (newOrder, result) => {
    sql.query("INSERT INTO orders SET ?", newOrder, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created user: ", { id: res.insertId, ...newOrder });
      //console.log(newOrder.couponcode);
      sql.query(`SELECT total_used FROM coupons WHERE coupons.code='${newOrder.couponcode}'`,(err,res)=>{
          //console.log(res[0])
        if (res[0]===undefined) {
            console.log('coupon not apllide');
        }else{
        let count=parseInt(res[0].total_used)+1;
        console.log(count);
        sql.query(`UPDATE coupons SET coupons.total_used=${count} WHERE coupons.code='${newOrder.couponcode}'`);
        }
      })
      sql.query(`DELETE FROM cart WHERE cart.user_id =${newOrder.id_users}`)
      result(null, { id: res.insertId, ...newOrder });
    });
  };
  module.exports = Order;