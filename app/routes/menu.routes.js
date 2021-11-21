const auth = require("../middlewares/auth");

module.exports = app => {
    const menu = require("../controllers/menu.controller");
    // Retrieve all category
    app.get("/menu", auth,menu.findAll);
  
    // Create a new topic
    app.post("/menu", auth,menu.create);
   
    // Retrieve a single topic with topicId
    app.get("/menu/:menuId", auth,menu.findOne);
  
    // Update a users with topicId
    app.put("/menu/:menuId", auth,menu.update);
  
    // Delete a users with topicId
    app.delete("/menu/:menuId", auth,menu.delete);
  };