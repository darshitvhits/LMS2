const sql = require("./db.js");
const moment=require('moment');

// constructor
const Order = function(order) {
    this.name = order.name;
    this.total_amount=order.total_amount;
    this.coupoen_id=order.coupoen_id;
    this.paid_amount=order.paid_amount;
    this.status = order.status;
    //this.created_at = order.created_at;
  };


  Order.getAll = result => {
    sql.query("SELECT orders.id,users.first_name,users.last_name,orders.total_amount,orders.couponcode,orders.paid_amount,orders.status,orders.created_at,orders.total_items,orders.discount_amount FROM orders LEFT JOIN users ON orders.id_users=users.id", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      res.map((element,index)=>{
        var createdate = new Date(element.created_at);
        var now = moment(createdate).format('l');
        element.created_at=now
        element.customername=`${element.first_name} ${element.last_name}`
        delete element.first_name;
        delete element.last_name;
        //console.log(element.modified_at);
      })
      console.log("order: ", res);
      result(null, res);
    });
  };
  

  Order.view=(id,result)=>{
      sql.query(`SELECT orders_course.id,orders_course.course_title,orders_course.course_price,orders.discount_amount,orders.couponcode FROM orders_course LEFT JOIN orders ON orders_course.id_oders=orders.id WHERE orders_course.id_oders=${id}`,(err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        let total=0;
        res.map((cv,i)=>{
            discount=cv.discount_amount;
            delete cv.discount_amount;
            coupon=cv.couponcode;
            delete cv.couponcode
            total=total+cv.course_price;
        })
        final=total-discount;
        tar={Total_price:total,discount_amount:discount,couponcode:coupon,finalprice:final};
        //tar=tar.toString();
        console.log(res.push(tar));
        console.log("order: ", res);
        result(null, res);
      });
  };

  
  module.exports = Order;