const auth = require("../middlewares/auth.js");

module.exports = app => {
  const price = require("../controllers/price.controller.js");
  
  // Retrieve all category
  app.get("/price", auth,price.findAll);

   // Create a new price
  app.post("/price", auth,price.create);
 
  // Retrieve a single price with priceId
	app.get("/price/:priceId", auth,price.findOne);

	// Update a users with priceId
	app.put("/price/:priceId",auth,price.update);

	// Delete a users with priceId
	app.delete("/price/:priceId", auth,price.delete);
 
};
