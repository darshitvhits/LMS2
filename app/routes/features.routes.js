const auth = require("../middlewares/auth.js");

module.exports = app => {
  const features = require("../controllers/features.controller.js");
  
  // Retrieve all category
  app.get("/features", auth,features.findAll);
 
 // Create a new features
  app.post("/features", auth,features.create);
 
  // Retrieve a single features with featuresId
	app.get("/features/:featuresId", auth,features.findOne);

	// Update a users with featuresId
	app.put("/features/:featuresId",auth,features.update);

	// Delete a users with featuresId
	app.delete("/features/:featuresId", auth,features.delete);
};
