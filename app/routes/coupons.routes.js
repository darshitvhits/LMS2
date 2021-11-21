const auth = require("../middlewares/auth.js");

module.exports = app => {
  const coupons = require("../controllers/coupons.controller");

  //create coupons
  app.post("/createcoupon",auth,coupons.create);

  //listing coupons
  app.get("/coupons",auth,coupons.findAll);

  //find coupoin
  app.get("/coupons/:couponId",auth,coupons.findOne);

  //update coupopn
  app.put("/updatecoupons/:couponId",auth,coupons.update);

  //delete coupon
  app.delete("/deletecoupons/:couponId",auth,coupons.delete);
}