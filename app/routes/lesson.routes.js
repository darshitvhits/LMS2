const auth = require("../middlewares/auth.js");

  module.exports = app => {
  const lesson = require("../controllers/lesson.controller");
  const uplode=require('../middlewares/uplodeimage');
  // Create a new users
  app.post("/lesson/:title",uplode.fields([{ name: 'demo_image', maxCount: 10 }, { name: 'course_video', maxCount: 10 }]),lesson.create);


  // Retrieve all users
  app.get("/lesson",auth,lesson.findAll);

  // Retrieve a single users with usersId
  app.get("/lesson/:lessonId",auth, lesson.findOne);

  // Retrieve a all lession  with sessionId
  app.get("/lesson/:courseId/:sessionId",auth, lesson.findByCourseId);

  // Update a users with usersId
  app.put("/lessonupdate/:lessonId/:title",auth,uplode.fields([{ name: 'demo_image', maxCount: 10 }, { name: 'course_video', maxCount: 10 }]), lesson.update);

  // Delete a users with usersId
  app.delete("/lesson/:lessonId",auth,lesson.delete);

  // sort lesson
  app.post("/sortlesson", lesson.setorder);
};