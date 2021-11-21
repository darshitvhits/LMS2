const auth = require("../middlewares/auth.js");

module.exports = app => {
  const course = require("../controllers/course.controller.js");
  const uplode=require('../middlewares/uplodeimage');
  //const path=require('../middlewares/path');
  // Retrieve all course
  app.get("/course",course.findAll);
  // Create a new course
   app.post("/course/:title",auth,uplode.fields([{ name: 'demo_image', maxCount: 10 }, { name: 'course_video', maxCount: 10 }]), course.create);

   // Retrieve a single course with courseId
   app.get("/course/:courseId", auth,course.findOne);

  // Update a course with courseId
  app.put("/course/:courseId/:oldtitle/:title",auth,uplode.fields([{ name: 'demo_image', maxCount: 10 }, { name: 'course_video', maxCount: 10 }]), course.update);

  // Delete a course with courseId
  app.delete("/course/:courseId", auth,course.delete);

  // Retrieve a nuber of section and lession in the course with courseId
  app.get("/numberofsection/:courseId",auth,course.findByCourseId);

  //create particuler course folder
  app.post("/createfolder/",auth,course.createfolder)
};
