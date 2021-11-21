const auth = require("../../middlewares/auth.js");

module.exports = app => {
  const features = require("../../controllers/forentend/features.controller.js");
  
  // Retrieve all features
  app.get("/forentend/listoffeatures", auth,features.findAll);
 
};
