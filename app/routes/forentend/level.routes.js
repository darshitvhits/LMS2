const auth = require("../../middlewares/auth.js");

module.exports = app => {
  const level = require("../../controllers/forentend/level.controller.js");
  
  // Retrieve all level
  app.get("/forentend/listoflevel", auth,level.findAll);
 
};
