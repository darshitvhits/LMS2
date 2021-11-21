const auth = require("../middlewares/auth.js");

module.exports = app => {
    const smtp = require("../controllers/smtp.controller");

    //create new smtpseting
    app.post("/smtp",smtp.create);

    //find all smtp
     app.get("/listsmtp",smtp.findAll);

    //find smtp by id
    app.get("/showsmtp/:smtpId",smtp.findOne);

    //smtp update by Id
    app.put("/updatesmtp/:SmtpId",smtp.update);

    //smtp delate by Id
    app.delete("/deletesmtp/:smtpId",smtp.delete);
}