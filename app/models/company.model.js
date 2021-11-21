const sql = require("./db.js");
const moment=require('moment');

// constructor
const Company = function(company) {
    this.user_id = company.user_id;
    this.company_name=company.company_name;
    this.description=company.description;
    this.contact=company.contact;
    this.email = company.email;
    this.website=company.website;
    this.status=company.status;
    //this.created_at = company.created_at;
    //this.modified_at = company.modified_at;
  };


//create company model
  Company.create = (newCompany, result) => {
    sql.query("INSERT INTO company SET ?", newCompany, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("created user: ", { id: res.insertId, ...newCompany });
      result(null, { id: res.insertId, ...newCompany});
    });
  };
//find company by name
  Company.findByName = async(CompanyId, result) => {
    //console.log(CourseId);
    await sql.query(`SELECT * FROM company WHERE company.name = '${CompanyId}'`,(err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }if (res.length) {
        console.log("found User: ", res[0]);
        result(null, res[0]);
        return;
      }else{
        result(err='err', null);
      }
  })}

// find company with id
  Company.findById = (CompanyId, result) => {
    sql.query(`SELECT * FROM company WHERE id = ${CompanyId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        var modifydate = new Date(res[0].modified_at);
        var now = moment(modifydate).format('l');
        res[0].modified_at=now;
        var createdate = new Date(res[0].created_at);
        var now = moment(createdate).format('l');
        res[0].created_at=now;
        console.log("found company: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found User with the id
      result({ kind: "not_found" }, null);
    });
  };


//find all company
  Company.getAll = result => {
    sql.query("SELECT * FROM company", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      res.map((element,index)=>{
        var modifydate = new Date(element.modified_at);
        var now = moment(modifydate).format('l');
        element.modified_at=now;
        console.log(element.modified_at);
        var createdate = new Date(element.created_at);
        var now = moment(createdate).format('l');
        element.created_at=now;
      })
      console.log("company: ", res);
      result(null, res);
    });
  };

//update company
  Company.updateById = (id, company, result) => {
    sql.query(
      "UPDATE company SET ? WHERE id = ?",
      [company, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found User with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated User: ", { id: id, ...company });
        result(null, { id: id, ...company });
      }
    );
  };

//remove company
  Company.remove = (id, result) => {
    sql.query("DELETE FROM company WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted company with id: ", id);
      result(null, res);
    });
  };
  

  Company.findByCourseId=(Id,result)=>{
    console.log(Id);
      sql.query(`SELECT COUNT(*) AS totaluser FROM users WHERE users.id_company = ${Id}`,(err,res)=>{
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        if (res.length) {
          
          //console.log(total);
          result(null, {Total_user:res[0].totaluser});
          //data={Total_lesson:res[0].totallesson};
          return 
        }
        //console.log(total);
       //console.log(deta);
      })
      //console.log(deta);
    //console.log(dell);
    }
module.exports=Company;