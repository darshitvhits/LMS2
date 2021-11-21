const auth = require("../middlewares/auth.js");

module.exports = app => {
  const category = require("../controllers/category.controller.js");
  const uplode=require('../middlewares/uplodeimage');
  // Retrieve all category
  app.get("/category",auth,category.findAll);
 
 // Create a new category
  app.post("/category",auth,uplode.fields([{ name: 'demo_category_image', maxCount: 10 }]),category.create);

  // Retrieve a single category with categoryId
  app.get("/category/:categoryId", auth,category.findOne);

  // Update a category with categoryId
  app.put("/category/:categoryId",auth,uplode.fields([{ name: 'demo_category_image', maxCount: 10 }]), category.update);

  // Delete a category with categoryId
  app.delete("/category/:categoryId", auth,category.delete);

  app.get('/numberofcourse/:categoryId',category.course);
 //
};
