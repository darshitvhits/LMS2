const auth = require("../middlewares/auth.js");

  module.exports = app => {
  const company = require('../controllers/company.controller');

  // Create a new users
  app.post("/company", company.create);

  // Retrieve all users
  app.get("/company",company.findAll);

  // Retrieve a single users with usersId
  app.get("/company/:companyId",auth, company.findOne);

  // Update a users with usersId 
  app.put("/company/:companyId",auth, company.update);

  // Delete a users with usersId
  app.delete("/company/:companyId",auth,company.delete);

  
};