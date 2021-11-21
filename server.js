const express = require("express");
const bodyParser = require("body-parser");
const cors=require('cors');
const app = express();
const discountdelete=require('./app/models/course.model');
const schedule = require('node-schedule');
// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Lms Home" });
});
require("./app/routes/forentend/course.routes")(app);
require("./app/routes/forentend/topic.routes.js")(app);
require("./app/routes/forentend/features.routes.js")(app);
require("./app/routes/forentend/price.routes.js")(app);
require("./app/routes/forentend/language.routes.js")(app);
require("./app/routes/forentend/duration.routes.js")(app);
require("./app/routes/forentend/subtitles.routes.js")(app);
require("./app/routes/forentend/level.routes.js")(app);
require("./app/routes/forentend/category.routes.js")(app);
require("./app/routes/forentend/cart.route")(app);
require("./app/routes/forentend/user.routes")(app);
require("./app/routes/forentend/company.routes")(app);

require("./app/routes/user.routes.js")(app);
require("./app/routes/category.routes.js")(app);
require("./app/routes/course.routes.js")(app);
require("./app/routes/topic.routes.js")(app);
require("./app/routes/level.routes.js")(app);
require("./app/routes/topic.routes.js")(app);
require("./app/routes/section.routes.js")(app);
require("./app/routes/features.routes.js")(app);
require("./app/routes/price.routes.js")(app);
require("./app/routes/language.routes.js")(app);
require("./app/routes/duration.routes.js")(app);
require("./app/routes/subtitles.routes.js")(app);
require("./app/routes/usergoups.routes.js")(app);
require("./app/routes/pages.routes.js")(app);
require("./app/routes/menu.routes.js")(app);
require("./app/routes/menuitem.routes")(app);
require("./app/routes/company.routes")(app);
require("./app/routes/lesson.routes")(app);
require("./app/routes/order.routes")(app);
require("./app/routes/coupons.routes")(app);
require("./app/routes/system.routes")(app);
require("./app/routes/websitesetting.routes")(app);
require("./app/routes/smtp.routes")(app);
require("./app/routes/currencysetting.routes")(app);
require("./app/routes/stripe.routes")(app);
require("./app/routes/instructer_revenue.routes")(app);
require("./app/routes/public_instructer.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  schedule.scheduleJob('06 17 * * *',discountdelete.discount);
  console.log(`Server is running on port ${PORT}.`);
});
