'use strict';

var Entity = require('../models/teacherlyModel');


exports.RegisterStudents = function(req,res) {
    
    var condition = new Entity(req.body);

    if(condition.TeacherEmail == null || condition.StudentEmails == null)
        return res.status(400).send({ "Input Error": "Please input Teacher's and Students's emails" });

    var validatEmail = true;
    condition.StudentEmails.forEach(email => {
            if (!RegexValidateEmail(email))
                validatEmail = false;
    })
    if(!validatEmail)
        return res.status(400).send({ "Input Error": "Invalid Student's Email." });

    if(!RegexValidateEmail(condition.TeacherEmail))
        return res.status(400).send({ "Input Error": "Invalid Teacher's Email." });

    
    Entity.register(condition, function(err, result) {
            if (err){
                return res.status(500).send({ "Server Error": "There is an error. Please contact IT" });
            }else{
                return res.status(204).send();
            }
    });   
}

exports.RetrieveCommonStudents = function(req,res) {

    var condition = new Entity(req.query);

    if(condition.TeacherEmail == null)
        return res.status(400).send({ "Input Error": "Please input Teachers's emails" });
    
    var validatEmail = true;
    condition.TeacherEmail.forEach(email => {
            if (!RegexValidateEmail(email))
                validatEmail = false;
    })

    if(!validatEmail)
        return res.status(400).send({ "Input Error": "Invalid Teacher's Email." });

    //To get email count so that we can determine common students.
    if(Array.isArray(condition.TeacherEmail)){
        var uniqueTeachersEmail = [...new Set(condition.TeacherEmail)] 
        condition.StudentEmailCount = uniqueTeachersEmail.length
    }else{
        condition.StudentEmailCount = 1;
    }

    Entity.retrieveCommonStudent(condition, function(err, result) {
        if (err){
            return res.status(500).send({ "Server Error": "There is an error. Please contact IT" });
        }else{

            var students = [];
            result.forEach(record => {
                students.push(record.StudentEmail);
            });

            return res.send({students});
        }             
    });
}

exports.SuspendStudent = function(req,res) {
    
    var condition = new Entity(req.body);

    if(condition.StudentEmail == null)
        return res.status(400).send({ "Input Error": "Please input Student's emails." });
    
    if(!RegexValidateEmail(condition.StudentEmail))
        return res.status(400).send({ "Input Error": "Invalid Student's Email." });

    Entity.suspendStudent(condition, function(err, result) {
        if (err){
            return res.status(500).send({ "Server Error": "There is an error. Please contact IT" });
        }else{
            return res.status(204).send();
        }             
    });
}

exports.RetrieveNotifications = function(req,res) {
    
    var condition = new Entity(req.body);

    if(condition.TeacherEmail == null || condition.Notification == null)
        return res.status(400).send({ "Input Error": "Please input Teacher's email and notification message." });
    else if(!RegexValidateEmail(condition.TeacherEmail))
        return res.status(400).send({ "Input Error": "Invalid Teacher's Email." });

    var notificationHandler = RegexGetEmailArrayFromNotificationString(condition.Notification);

    Entity.retrieveNotifications(condition, function(err, result) {
        if (err){
            return res.status(500).send({ "Server Error": "There is an error. Please contact IT" });
        }else{

            var students = [];
            result.forEach(record => {
                students.push(record.StudentEmail);
            });


            var combineHandler = students.concat(notificationHandler);
            
            var recipients;
            if(combineHandler.length > 0)
                recipients = [...new Set(combineHandler)]
            else
                recipients = [];

            return res.send({recipients});
        }             
    });
}

function RegexGetEmailArrayFromNotificationString(bunchesOfEmail){

    var expr = /\B@[a-z0-9@._-]+/g;
    var rawHandlers = bunchesOfEmail.match(expr);
    if(rawHandlers != null)
        return rawHandlers.map(el => el.slice(1));
    else
        return [];
}

function RegexValidateEmail(string){
    var expr = /\S+@\S+\.\S+/;
    return expr.test(string);
}


