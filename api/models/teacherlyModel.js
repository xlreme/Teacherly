var db = require('../models/dbConnections');

var Entity = function(body){
    this.TeacherEmail = body.teacher;
    this.StudentEmails = body.students;
    this.StudentEmailCount = body.studentEmailCount
    this.Suspended = body.suspended;
};

// var Condition = function(body){
//     this.TeacherEmail = body.teacher;
//     this.StudentEmail = body.students;
// };

Entity.register = function registerUsers(condition, result){

    db.query("INSERT INTO teachersandstudents SET ?",condition, function (err, res) {
                
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


Entity.retrieveCommonStudent = function getCommonStudent(condition, result){


    db.query("Select StudentEmail, count(*) as count from teachersandstudents Where TeacherEmail in (?) GROUP BY StudentEmail having count(*) = ?",[condition.TeacherEmail,condition.StudentEmailCount], function (err, res) {
                
        if(err) {
            //console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });           
};

Entity.suspendStudent = function setSuspendStudent(condition, result){

    db.query("Update teachersandstudents SET Suspended=? where StudentEmail=?",condition, function (err, res) {
                
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

Entity.retrieveNotifications = function getNotification(condition, result){

    db.query("INSERT INTO teachersandstudents SET ?",condition, function (err, res) {
                
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

