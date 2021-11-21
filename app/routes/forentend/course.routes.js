const auth = require("../../middlewares/auth.js");

module.exports = app => {
  const course = require('../../controllers/forentend/course.controller');
  const uplode=require('../../middlewares/uplodeimage');
  // Retrieve all course
  app.get("/forentend/listcourse",course.findAll);

  //rate on course
  app.post('/forentend/rateing',course.rating)
  // Create a new course
   app.post("/forentend/createcourse/:title",auth,uplode.fields([{ name: 'demo_image', maxCount: 10 }, { name: 'course_video', maxCount: 10 }]),course.create);

   // Retrieve a single course with courseId
   app.get("/forentend/onecourse/:courseId", auth,course.findOne);

  // Update a course with courseId
  app.put("/forentend/updatecourse/:courseId/:title",auth,uplode.fields([{ name: 'demo_image', maxCount: 10 }, { name: 'course_video', maxCount: 10 }]), course.update);

  // Delete a course with courseId
  app.delete("/forentend/deletecourse/:courseId", auth,course.delete);

  //filter course
  app.post("/forentend/filtercourse/",course.filter);

  //findbycategory
  app.get('/forentend/findbycategory/:id_category',course.category);

  //instructer course list
  app.get('/forentend/instructerlist/:id_instructer',course.instructerlist);

  //purchase list
  app.get('/forentend/purchaselist/:user_id',course.purchaselist);

  //add discount on course
  app.post('/forentend/adddiscount',course.adddiscount);

  //display discount list
  app.get('/forentend/discountcourse/:user_id',course.discountlist);
};
