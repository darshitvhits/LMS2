const Language = require("../../models/forentend/language.model.js");

// Retrieve all Language from the database.
exports.findAll = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type:application/x-www-form-urlencoded"
  );
  res.header("Content-Type", "application/x-www-form-urlencoded");
  Language.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Language."
      });
    else {
      let promise = []
      data.map((cv, i) => {
        let pro = new Promise(function (resolve, reject) {
          Language.findByCourseId(cv.id, (err, data2) => {
            if (err) {
              if (err.kind === "not_found") {
                res.status(404).send({
                  message: `Not found Course with id ${cv.id}.`
                });
              } else {
                res.status(500).send({
                  message: "Error retrieving Course with id " + cv.id
                });
              }
            } else {
              if (data2.Total_course !== undefined) {
                data[i].Total_course = data2.Total_course.toString();
              }
              resolve(data)
            }
          });
        })
        promise.push(pro)
      })
      Promise.all(promise).then(value => {
        return res.send(data);
      })
    }
  });
};

