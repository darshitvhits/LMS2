const auth = require("../middlewares/auth.js");

  module.exports = app => {
  const section = require("../controllers/section.controller.js");

  // Create a new section
  app.post("/section",auth,section.create);

  // Retrieve all section
  app.get("/section",auth,section.findAll);

  // Retrieve a single section with sectionId
  app.get("/section/:sectionId",auth,section.findOne);

  // Retrieve a single section with sectionId
  app.get("/section/all/:courseId",auth,section.findByCourseId);

  // Update a section with sectionId
  app.put("/sectionupdate/:sectionId",auth,section.update);

  // Delete a section with sectionId
  app.delete("/section/:sectionId/:courseId/",auth,section.delete);

  // sort session
  app.post("/sortsection",auth,section.setorder);
};

