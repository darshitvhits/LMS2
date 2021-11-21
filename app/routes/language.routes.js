const auth = require("../middlewares/auth.js");

module.exports = app => {
  const language = require("../controllers/language.controller.js");
  
  // Retrieve all category
  app.get("/language", auth,language.findAll);

   // Create a new language
  app.post("/language", auth,language.create);
 
  // Retrieve a single language with languageId
	app.get("/language/:languageId", auth,language.findOne);

	// Update a users with languageId
	app.put("/language/:languageId", auth,language.update);

	// Delete a users with languageId
	app.delete("/language/:languageId",auth,language.delete);
 
};
