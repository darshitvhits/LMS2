const auth = require('../../middlewares/auth');



module.exports = app => {
const cart=require('../../controllers/forentend/cart.controller');

//add to cart
app.post("/forentend/addcart",cart.addcart);

//show cart detail
app.get("/forentend/cart/:user_id",cart.findcart);

//delete item
app.delete("/forentend/deleteitem/:courseId",cart.delete);

//apply coupons
app.post("/forentend/couponsaply/",cart.coponapply);

//checkout order
app.post("/forentend/createorder/",cart.checkout);
}