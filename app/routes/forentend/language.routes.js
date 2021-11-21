const auth = require("../../middlewares/auth.js");

module.exports = app => {
  const language = require("../../controllers/forentend/language.controller.js");
  
  // Retrieve all language
  app.get("/forentend/listlanguage", auth,language.findAll);
 
};
