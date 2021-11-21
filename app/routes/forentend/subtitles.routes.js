const auth = require("../../middlewares/auth.js");

module.exports = app => {
  const subtitles = require("../../controllers/forentend/subtitles.controller.js");
  
  // Retrieve all subtitel
  app.get("/forentend/listofsubtitles", auth,subtitles.findAll);

};
