var db = require('../models/dbconnections');

var Entity = function(body){
    this.TeacherEmail = body.teacher;
    this.StudentEmails = body.students;
};

Entity.register = function registerUsers(entity, result){



    db.query("INSERT INTO teachersandstudents SET ?",entity, function (err, res) {
                
        if(err) {
            //console.log("error: ", err);
            result(err, null);
        }
        else{
            //console.log(res.insertId);
            result(null, res.insertId);
        }
    });           
};

module.exports= Entity;

