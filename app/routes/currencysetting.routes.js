const auth = require("../middlewares/auth.js");

module.exports = app => {
    const currency = require("../controllers/currencysetting.controller");

    //create new smtpseting
    app.post("/currency",currency.create);

    //find all currency
    app.get("/listofcurrency",currency.findAll);

    //find currency by id
    app.get("/showcurrency/:currencyId",currency.findOne);

    //currency update by Id
    app.put("/updatecurrency/:currencyId",currency.update);

    //currency delate by Id
    app.delete("/deletecurrency/:currencyId",currency.delete);

}