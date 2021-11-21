const auth = require("../middlewares/auth.js");

module.exports = app => {
    const instructer = require("../controllers/instructer_revenue.controller");

    //create new instructer_revernue
    app.post("/instructer_revenue",instructer.create);

    //find all instructer_revernue
    app.get("/listinstructer_revernue",instructer.findAll);


    //find instructer by id
    app.get("/showinstructer/:instructerId",instructer.findOne);

    //smtp updateinstructer by Id
    app.put("/updateinstructer/:instructerId",instructer.update);

    //instructer delate by Id
    app.delete("/deleteinstructer/:instructerId",instructer.delete);
}