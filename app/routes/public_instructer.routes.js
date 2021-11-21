const auth = require("../middlewares/auth.js");

module.exports = app => {
    const publicinstructer = require("../controllers/public_instructer.controller");

    //create new publicinstructer
    app.post("/publicinstructer",publicinstructer.create);


    //find all publicinstructer
    app.get("/listpublicnstructer",publicinstructer.findAll);


    //find instructer by id
    app.get("/showpublicinstructer/:publicinstructerId",publicinstructer.findOne);

    //smtp updatepublicinstructer by Id
    app.put("/updatepublicinstructer/:publicinstructerId",publicinstructer.update);

     //publicinstructer delate by Id
     app.delete("/deletepublicinstructer/:publicinstructerId",publicinstructer.delete);
}
