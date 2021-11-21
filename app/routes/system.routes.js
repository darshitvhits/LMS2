const auth = require("../middlewares/auth.js");

module.exports = app => {
    const system = require("../controllers/system.controller");

    //create new system
    app.post("/system",system.create);

    //find all system
    app.get("/listsystem",system.findAll);

    //find system by id
    app.get("/system/:systemId",system.findOne);

    //system update by Id
    app.put("/updatesystem/:SystemId",system.update);

    //system delate by Id
    app.delete("/deletesystem/:systemId",system.delete);
}