const auth = require("../middlewares/auth.js");
const uplode=require("../middlewares/uplodeimage");

module.exports = app => {
const website=require('../controllers/websitesetting.controller');

// Create a new website
app.post("/website",uplode.single("demo_image"),website.create);

// Retrieve a single website with websiteId
app.get("/websiteshow/:websiteId",website.findOne);


// Retrieve a all website 
app.get("/listofwebsite",website.findAll);

// update a single website with websiteId
app.put("/updatewebsite/:websiteId",uplode.single("demo_image"),website.update);

// delete a single website with websiteId
app.delete("/deletewebsite/:websiteId",website.delete);

}