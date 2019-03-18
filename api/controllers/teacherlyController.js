'use strict';

var Entity = require('../models/teacherlyModel');


exports.Register = function(req,res) {
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
                    console.log(err); 
                }              
            });
            i++;
        });

        if(!error === "")
        {
            console.log("ERRORORRORORO" + error);
            res.status(500).send(error)
        }else{
            res.status(204).send();
        }       
    }
}

exports.CommonStudent = function(req,res) {
    
}

exports.Suspend = function(req,res) {
    
}

exports.RetrieveNotifications = function(req,res) {
    
}