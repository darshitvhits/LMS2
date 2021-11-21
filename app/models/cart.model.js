const sql = require("./db.js");
const moment=require('moment');


// constructor
const Cart = function(cart) {
    this.user_id = cart.user_id;
    this.course_id=cart.course_id;
    //this.created_at = cart.created_at;
    //this.modified_at=cart.modified_at;
  };


  Cart.create = (newcart, result) => {
    sql.query("INSERT INTO cart SET ?", newcart, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created cart: ", { id: res.insertId, ...newcart });
      result(null, { id: res.insertId, ...newcart });
    });
  };

  
  Cart.RemoveByID=(Id,result)=>{
    sql.query(`DELETE FROM cart WHERE cart.course_id = ${Id}`,(err, res) => {
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
  
      console.log("deleted Item with id: ", Id);
      result(null, res);
    });
  }



  Cart.findAll= (ID,result) => {
    sql.query(`SELECT cart.id,course.title,course.price,course.discounted_price,course.thumbnail,cart.created_at,cart.modified_at FROM cart LEFT JOIN course ON cart.course_id=course.id WHERE cart.user_id=${ID}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      let total=0;
      let discount=0;
      res.map((element,index)=>{
        var modifydate = new Date(element.modified_at);
        var now = moment(modifydate).format('l');
        element.modified_at=now
        var createdate = new Date(element.created_at);
        var now = moment(createdate).format('l');
        element.created_at=now
        discount=discount+element.discounted_price;
        delete element.discounted_price;
        //if(element.price===null){element.price=0}
        total=total+element.price;
        //console.log(element.modified_at);
      })
      final=total-discount;
      tar={Total_price:total,discount_amount:discount,finalprice:final};
      console.log(res.push(tar));
      console.log("Topic: ", res);
      result(null, res);
    });
  };


  Cart.checkout=(ID,result)=>{
    
  }
  module.exports = Cart;