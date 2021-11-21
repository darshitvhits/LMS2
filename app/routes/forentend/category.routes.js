const auth = require("../../middlewares/auth.js");

module.exports = app => {
  const category = require("../../controllers/forentend/category.controller");
  const uplode=require('../../middlewares/uplodeimage');
  // Retrieve all category
  app.get("/forentend/listcategory",auth,category.findAll);
 
 

  // Retrieve a single category with categoryId
  app.get("/forentend/onecategory/:categoryId", auth,category.findOne);

  
  //app.get('/numberofcourse/:categoryId',category.course)

 //
};
