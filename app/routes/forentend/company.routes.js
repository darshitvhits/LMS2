const auth = require("../../middlewares/auth.js");

  module.exports = app => {
  const company = require('../../controllers/forentend/company.controller');

  // Create a new company
  app.post("/forentend/createcompany", company.create);

  // Update a users with usersId
  app.put("/forentend/company/:companyId",auth, company.update);

  // Delete a users with usersId
  app.delete("/forentend/company/:companyId",auth,company.delete);

  
};