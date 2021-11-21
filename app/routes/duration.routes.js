const auth = require("../middlewares/auth.js");

module.exports = app => {
  const duration = require("../controllers/duration.controller.js");
  
  // Retrieve all category
  app.get("/duration", auth,duration.findAll);

  // Create a new duration
  app.post("/duration", auth,duration.create);
 
  // Retrieve a single duration with durationId
	app.get("/duration/:durationId", auth,duration.findOne);

	// Update a users with durationId
	app.put("/duration/:durationId", auth,duration.update);

	// Delete a users with durationId
	app.delete("/duration/:durationId", auth,duration.delete);
 
};
