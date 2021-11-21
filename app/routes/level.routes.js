const auth = require("../middlewares/auth.js");

module.exports = app => {
  const level = require("../controllers/level.controller.js");
  
  // Retrieve all category
  app.get("/level", auth,level.findAll);
 
 // Create a new level
  app.post("/level", auth,level.create);
 
  // Retrieve a single level with levelId
	app.get("/level/:levelId", auth,level.findOne);

	// Update a users with levelId
	app.put("/level/:levelId", auth,level.update);

	// Delete a users with levelId
	app.delete("/level/:levelId", auth,level.delete);
};
