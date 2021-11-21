const auth = require("../middlewares/auth");

module.exports = app => {
    const menuitem = require("../controllers/menuitem.controller");
    // Retrieve all category
    app.get("/menuitem", auth,menuitem.findAll);
  
    // Create a new topic
    app.post("/menuitem", auth,menuitem.create);
   
    // Retrieve a single topic with topicId
    app.get("/menuitem/:menuitemId", auth,menuitem.findOne);
  
    // Update a users with topicId
    app.put("/menuitem/:menuitemId", auth,menuitem.update);
  
    // Delete a users with topicId
    app.delete("/menuitem/:menuitemId", auth,menuitem.delete);
  };