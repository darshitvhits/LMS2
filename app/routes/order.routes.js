const auth = require('../middlewares/auth');

module.exports = app => {

const orders=require('../controllers/order.controller');

// Retrieve all orders
app.get("/orders",auth,orders.findAll);

//view order detaile
app.get("/ordersdetail/:orderId",auth,orders.view);

//add to cart
//app.post("/addcart",orders.addcart);

//show cart detail
//app.get("/cart/:user_id",orders.findcart);

//delete item
//app.delete("/deleteitem/:courseId",orders.delete);


}