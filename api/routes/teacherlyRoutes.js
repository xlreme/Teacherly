'use strict';
module.exports = function(app) {
    var teacherController = require('../controllers/teacherlyController');
  
    app.route('/api/register')
      .post(teacherController.RegisterStudents);
  
    app.route('/api/commonstudents')
      .get(teacherController.RetrieveCommonStudents);

    app.route('/api/suspend')
      .post(teacherController.SuspendStudent);

    app.route('/api/retrievefornotifications')
      .post(teacherController.RetrieveNotifications);
};
  