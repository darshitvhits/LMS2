const auth = require("../../middlewares/auth.js");

module.exports = app => {
  const topic = require("../../controllers/forentend/topic.controller.js");
  // Retrieve all topic
  app.get("/forentend/listoftopic",auth,topic.findAll);
};
