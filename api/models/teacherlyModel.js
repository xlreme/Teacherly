var db = require('../models/dbConnections');

var Entity = function(body){
    this.TeacherEmail = body.teacher;
    this.StudentEmail = body.student;
    this.StudentEmails = body.students;
    this.StudentEmailCount = body.studentEmailCount
    this.Suspended = body.suspended;
    this.Notification = body.notification;
};

Entity.register = function registerUsers(condition, result){
    
    var emailarray = [];

    var uniqueStudentEmails = [...new Set(condition.StudentEmails)];

    uniqueStudentEmails.forEach(email => {
        emailarray.push([condition.TeacherEmail, email]);
    });

    db.query("INSERT INTO teachersandstudents (TeacherEmail, StudentEmail) VALUES ?",[emailarray], function (err, res) {
                
        if(err) {
            result(err,null);
        }
        else{
            result(null, res.insertId);
        }
    });           
};


Entity.retrieveCommonStudent = function getCommonStudent(condition, result){

    db.query("Select StudentEmail, count(*) as count from teachersandstudents Where TeacherEmail in (?) GROUP BY StudentEmail having count(*) = ?",
            [condition.TeacherEmail,condition.StudentEmailCount], function (err, res) {
                
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });           
};

Entity.suspendStudent = function setSuspendStudent(condition, result){

    db.query("Update teachersandstudents SET Suspended=1 where StudentEmail=?",condition.StudentEmail, function (err, res) {
                
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res.insertId);
        }
    });           
};

Entity.retrieveNotifications = function getNotification(condition, result){

    db.query("Select StudentEmail from teachersandstudents Where Suspended=0 and TeacherEmail=?",condition.TeacherEmail, function (err, res) {
                
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);
        }
    });           
};

module.exports= Entity;

