const auth = require("../../middlewares/auth.js");

module.exports = app => {
  const price = require("../../controllers/forentend/price.controller.js");
  
  // Retrieve all price
  app.get("/forentend/listofprice", auth,price.findAll);

 
};
