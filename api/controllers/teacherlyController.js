'use strict';

var Entity = require('../models/teacherlyModel');


exports.RegisterStudents = function(req,res) {
    
    var condition = new Entity(req.body);

    var outcome = validation(condition,"RegisterStudents");
    if(outcome)
        return res.status(400).send(outcome);
    
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

    var outcome = validation(condition,"RetrieveCommonStudents");
    if(outcome)
        return res.status(400).send(outcome);

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

    var outcome = validation(condition,"SuspendStudent");

    if(outcome)
        return res.status(400).send(outcome);

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

    var outcome = validation(condition,"RetrieveNotifications");
    if(outcome)
        return res.status(400).send(outcome);

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


function validation(condition, func){

    if(func === "RegisterStudents"){
 
        if(condition.TeacherEmail == null || condition.TeacherEmail === "" || condition.StudentEmails == null || condition.StudentEmails === "")
        return { "Input Error": "Please input Teacher's and Students's emails" };
        
        var validatEmail = true;
            condition.StudentEmails.forEach(email => {
                    if (!RegexValidateEmail(email))
                        validatEmail = false;
            })

        if(!validatEmail)
        return { "Input Error": "Invalid Student's Email." };

        if(!RegexValidateEmail(condition.TeacherEmail))
        return { "Input Error": "Invalid Teacher's Email." };
            
    }else if(func === "RetrieveCommonStudents"){

        if(condition.TeacherEmail == null || condition.TeacherEmail === "" )
        return { "Input Error": "Please input Teachers's emails" };
    
        var validatEmail = true;
        
        if(Array.isArray(condition.TeacherEmail)){
            condition.TeacherEmail.forEach(email => {
                if (!RegexValidateEmail(email))
                    validatEmail = false;
            })
        }else{
            if(!RegexValidateEmail(condition.TeacherEmail))
                validatEmail = false;
        }

        if(!validatEmail)
        return { "Input Error": "Invalid Teacher's Email." };

    }else if(func === "SuspendStudent"){

        if(condition.StudentEmail == null || condition.StudentEmail === "")
        return { "Input Error": "Please input Student's emails." };
    
        if(!RegexValidateEmail(condition.StudentEmail))
        return { "Input Error": "Invalid Student's Email." };
    
    }else if(func === "RetrieveNotifications"){

        if(condition.TeacherEmail == null || condition.TeacherEmail === "" || condition.Notification == null || condition.Notification === "")
        return { "Input Error": "Please input Teacher's email and notification message." };
        
        if(!RegexValidateEmail(condition.TeacherEmail))
        return { "Input Error": "Invalid Teacher's Email." };
    }

    
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


