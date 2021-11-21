const auth = require("../middlewares/auth.js");

module.exports = app => {
  const usergroups = require("../controllers/usergroups.controller.js");
  
  // Retrieve all category
  app.get("/usergroups",auth,usergroups.findAll);

  // Create a new usergroups
  app.post("/usergroups",auth,usergroups.create);
 
  // Retrieve a single usergroups with usergroupsId
	app.get("/usergroups/:usergroupsId",auth,usergroups.findOne);

	// Update a users with usergroupsId
	app.put("/usergroups/:usergroupsId",auth,usergroups.update);

	// Delete a users with usergroupsId
	app.delete("/usergroups/:usergroupsId",auth,usergroups.delete);
};
