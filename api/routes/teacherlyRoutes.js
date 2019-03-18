'use strict';
module.exports = function(app) {
    var teacherController = require('../controllers/teacherlyController');
  
    // todoList Routes
    app.route('/api/register')
      .post(teacherController.teacherRegister);
  
    app.route('/api/commonstudents')
      .get(teacherController.teacherCommonStudent);

    app.route('/api/suspend')
      .post(teacherController.teacherSuspend);

    app.route('/api/retrievefornotifications')
      .post(teacherController.teacherRetrieveNotifications);
  };
  