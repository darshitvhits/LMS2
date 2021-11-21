const auth = require("../middlewares/auth.js");

module.exports = app => {
    const stripe = require("../controllers/stripe.controller");

    //create new smtpseting
    app.post("/stripe",stripe.create);

    //find all stripe
    app.get("/liststripe",stripe.findAll);
    
    //find system by id
    app.get("/showstripe/:stripeId",stripe.findOne);

    //stripe update by Id
    app.put("/updatestripe/:stripeId",stripe.update);

    //stripe delate by Id
    app.delete("/deletestripe/:stripeId",stripe.delete);


}