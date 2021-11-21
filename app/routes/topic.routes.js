const auth = require("../middlewares/auth.js");

module.exports = app => {
  const topic = require("../controllers/topic.controller.js");
  // Retrieve all category
  app.get("/topic",auth,topic.findAll);

  // Create a new topic
  app.post("/topic",auth,topic.create);
 
  // Retrieve a single topic with topicId
	app.get("/topic/:topicId",auth,topic.findOne);

	// Update a users with topicId
	app.put("/topic/:topicId", auth,topic.update);

	// Delete a users with topicId
	app.delete("/topic/:topicId", auth,topic.delete);
};
