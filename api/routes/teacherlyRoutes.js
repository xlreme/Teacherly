'use strict';
module.exports = function(app) {
    var teacherController = require('../controllers/teacherlyController');
  
    app.route('/api/register')
      .post(teacherController.Register);
  
    app.route('/api/commonstudents')
      .get(teacherController.CommonStudent);

    app.route('/api/suspend')
      .post(teacherController.Suspend);

    app.route('/api/retrievefornotifications')
      .post(teacherController.RetrieveNotifications);
};
  