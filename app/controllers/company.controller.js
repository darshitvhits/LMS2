const Company=require('../models/company.model');
//create company module
exports.create = async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
      );
      res.header("Content-Type", "application/x-www-form-urlencoded");
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a User
    const company = new Company({
      user_id : req.body.user_id,
      company_name:req.body.company_name,
      description:req.body.description,
      contact:req.body.contact,
      email : req.body.email,
      website:req.body.website,
      status:req.body.status,
      //created_at : req.body.created_at,
      //modified_at : req.body.modified_at,
    });
  
  
    Company.findByName(req.body.company_name,(err, data) => {
      if (err) {
        // Save User in the database
      Company.create(company, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the company."
          });
        else res.send(data);
      });
        //res.status(500).send({message:'user all redy exist'});
      }else{
        res.status(500).send({message:'company all redy exist'});
      }
    })
}



// Retrieve all company from the database.
exports.findAll = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
      );
      res.header("Content-Type", "application/x-www-form-urlencoded");
    Company.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
        else {
          let promise = []
          data.map((cv, i) => {
            let pro = new Promise(function (resolve, reject) {
              Company.findByCourseId(cv.id, (err, data2) => {
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
                  if(data2.Total_user!==undefined){
                  data[i].Total_user=data2.Total_user.toString();
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
  
  // Find a single companyt with a CompanyId
  exports.findOne = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
      );
      res.header("Content-Type", "application/x-www-form-urlencoded");
    Company.findById(req.params.companyId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.companyId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving User with id " + req.params.companyId
          });
        }
      } else res.send(data);
    });
  };


// Update a Company detail identified by the CompanyId in the request
exports.update = async(req, res) => {
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
  // Create a Company
  const company = new Company({
    user_id : req.body.user_id,
    company_name:req.body.company_name,
    description:req.body.description,
    contact:req.body.contact,
    email : req.body.email,
    website:req.body.website,
    status:req.body.status,
    //created_at : req.body.created_at,
   // modified_at : req.body.modified_at,
  });
  console.log(req.body);

  Company.updateById(
    req.params.companyId,
    company,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Company with id ${req.params.companyId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating company with id " + req.params.companyId
          });
        }
      } else res.send(data);
    }
  );
};


// Delete a company with the specified companyId in the request
exports.delete = (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type:application/x-www-form-urlencoded"
      );
      res.header("Content-Type", "application/x-www-form-urlencoded");
    Company.remove(req.params.companyId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Company with id ${req.params.companyId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete User with id " + req.params.companyId
          });
        }
      } else res.send({ message: `User was deleted successfully!` });
    });
  };
  