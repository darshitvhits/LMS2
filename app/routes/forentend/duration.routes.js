const auth = require("../../middlewares/auth.js");

module.exports = app => {
  const duration = require("../../controllers/forentend/duration.controller");
  
  // Retrieve all duration
  app.get("/forentend/listofduration", auth,duration.findAll);
};
