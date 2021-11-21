const Page=require('../models/pages.model');



//create new page
exports.create = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    const page = new Page({
      title: req.body.title,
      description: req.body.description,
      slug:req.body.slug,
      status: req.body.status,
      //created_at: req.body.created_at,
      //modified_at: req.body.modified_at,
    });
    console.log(page);



    Page.findByName(req.body.title,(err, data) => {
      if (err) {
        // Save course in the database
        Page.create(page, (err, data) => {
          if (err)
            res.status(500).send({
              message:
                  err.message || "Some error occurred while creating the Course."
            });
          else res.send(data);
      });
        //res.status(500).send({message:'user all redy exist'});
      }else{
        res.status(500).send({message:'page all redy exist'});
      }
    })
};

//all page find
exports.findAll = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  Page.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Page."
      });
    else res.send(data);
  });
};



// Find a single pages with a pageId
exports.findOne = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  Page.findById(req.params.pageId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Price with id ${req.params.pageId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Price with id " + req.params.pageId
        });
      }
    } else res.send(data);
  });
};



// Update a Page identified by the pageId in the request
exports.update = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);
  const page = new Page({
    title: req.body.title,
    description: req.body.description,
    slug:req.body.slug,
    status: req.body.status,
    //created_at: req.body.created_at,
    //modified_at: req.body.modified_at,
  });

  Page.updateById(
    req.params.pageId,
    page,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found page with id ${req.params.pageId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating page with id " + req.params.pageId
          });
        }
      } else res.send(data);
    }
  );
};




// Delete a Page with the specified pageId in the request
exports.delete = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type:application/x-www-form-urlencoded"
    );
    res.header("Content-Type", "application/x-www-form-urlencoded");
  Page.remove(req.params.pageId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Page with id ${req.params.pageId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete page with id " + req.params.pageId
        });
      }
    } else res.send({ message: `Page was deleted successfully!` });
  });
};
