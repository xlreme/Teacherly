'use strict';

var Entity = require('../models/teacherlyModel');


exports.RegisterStudents = function(req,res) {
    console.log(req.body);
    var newEntry = new Entity(req.body);
    if(!newEntry.TeacherEmail || !newEntry.StudentEmails){

        res.status(400).send({ error:true, message: 'Please provide correct entries' });

    }else{

        var i = 1;
        var error = "";
        newEntry.StudentEmails.forEach(stuEmail => {
            console.log("Insert :" + i);
            var TeacherStudents = {
                TeacherEmail:newEntry.TeacherEmail,
                StudentEmail:stuEmail,
                CreatedBy: "",
                ModifiedBy: "", 
            }

            Entity.register(TeacherStudents, function(err, result) {
                if (err){
                    error = error + err; 
                }              
            });
            i++;
        });

        console.log(error);

        if(!error === "")
        {
            console.log("ERRORORRORORO" + error);
            res.status(500).send(error)
        }else{
            res.status(204).send();
        }       
    }
}

exports.RetrieveCommonStudents = function(req,res) {

    var condition;
    if(Array.isArray(req.query.teacher)){
        condition = new Entity(req.query);
        condition.StudentEmailCount = condition.TeacherEmail.length
    }else{
        condition = new Entity(req.query);
        condition.StudentEmailCount = 1;
    }

    console.log();
    console.log(condition);

    Entity.retrieveCommonStudent(condition, function(err, result) {
        if (err){
            res.status(500).send(err)
        }else{
            res.send(result);
        }             
    });
}

exports.SuspendStudent = function(req,res) {
    
    Entity.suspendStudent(TeacherStudents, function(err, result) {
        if (err){
            error = error + err; 
        }else{
            res.status(204).send();
        }             
    });
}

exports.RetrieveNotifications = function(req,res) {
    
}