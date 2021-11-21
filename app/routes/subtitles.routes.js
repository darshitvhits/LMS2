const auth = require("../middlewares/auth.js");

module.exports = app => {
  const subtitles = require("../controllers/subtitles.controller.js");
  
  // Retrieve all category
  app.get("/subtitles", auth,subtitles.findAll);

  // Create a new subtitles
  app.post("/subtitles", auth,subtitles.create);
 
  // Retrieve a single subtitles with subtitlesId
	app.get("/subtitles/:subtitlesId", auth,subtitles.findOne);

	// Update a users with subtitlesId
	app.put("/subtitles/:subtitlesId", auth,subtitles.update);

	// Delete a users with subtitlesId
	app.delete("/subtitles/:subtitlesId", auth,subtitles.delete);
 
};
