const auth = require("../../middlewares/auth.js");
const resate = require("../../middlewares/resate.js");


  module.exports = app => {
  const users = require("../../controllers/forentend/user.controller");
  const uplode=require('../../middlewares/uplodeimage');
  // Create a new users

  app.post("/forentend/registerusers",users.create);

  // Retrieve a single users with usersId
  app.get("/forentend/users/:userId",auth, users.findOne);
  //login user
  app.post('/forentend/users/login',users.login);

  //feedback
  app.post('/forentend/feedback',uplode.fields([{ name: 'screenshote', maxCount: 10 }]),users.feedback);

  //subscrib instructer
  app.post('/forentend/subscribe',users.subscribe);

  //unsubsribe instructer
  app.delete('/forentend/unsubscribe',users.unsubscribe);
  
  //student dashbord
  app.get('/forentend/student_dashbord/:user_id',users.student_dashbord);

  //instructer profile
  app.get('/forentend/instructer_profile/:instructer_id',users.instructer_profile)

  //create comment
  app.post('/forentend/comment/:instructer_id',auth,users.comment)

  //display all comment
  app.get('/forentend/displaycomment/:instructer_id',users.displaycomment)

  //like comment
  app.put('/forentend/likecomment/:comment_id',users.likecomment)

  //dislike comment
  app.put('/forentend/dislikecomment/:comment_id',users.dislikecomment)
}
