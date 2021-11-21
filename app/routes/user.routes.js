const auth = require("../middlewares/auth.js");
const resate = require("../middlewares/resate.js");

  module.exports = app => {
  const users = require("../controllers/user.controller.js");
  const uplode=require('../middlewares/uplodeimage');
  // Create a new users
  app.post("/users",uplode.fields([{ name: 'profile', maxCount: 10 }]),users.create);


  app.post("/admin",auth,uplode.fields([{ name: 'profile', maxCount: 10 }]),users.create);

  // Retrieve all users
  app.get("/users",auth,users.findAll);

  // Retrieve a single users with usersId
  app.get("/users/:userId",auth, users.findOne);

  // Update a users with usersId
  app.put("/users/:userId",uplode.fields([{ name: 'profile', maxCount: 10 }]), users.update);

  // Delete a users with usersId
  app.delete("/users/:userId",auth,users.delete);
  
  //login user
  app.post('/users/login',users.login);

  
  //password resate aafter login
  //app.put('/users/passwordresate',auth,users.Resatepass);
  app.put("/resateinlogin",auth, users.Resatepass);

  //password forgate
  app.post('/forgatepassword',resate,users.forgatepass);
  //password resate aaftert link
  app.patch('/resatepassword/:token',users.resatepassword);

  // Retrieve Only instructor users
  app.get("/instructor", auth,users.findAllInstructor);

  //retrive all user using admin id
  app.get("/admin",auth,users.findallAdmin);

  // Retrieve a number of active course in one users with usersId
  app.get("/activecourse/:userId",auth,users.findNumberOfCourse);

  //desbord total item
  app.get("/dashboard",users.dashbord);
};
