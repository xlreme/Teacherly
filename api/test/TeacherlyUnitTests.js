let assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../../server');

chai.use(chaiHttp);


describe('/POST RegisterStudents', function() {
    it('should register the student into the database if not in database', (done) => {
        let payload = {
            teacher: "teacherken@gmail.com",
            students: ["studentjon@example.com","studentmay@example.com"]
        }
        chai.request(server)
            .post('/api/register')
            .send(payload)
            .end((err, res) => {
                  res.should.have.status(204);
              done();
            });
    });
    it('should throw error if the student is in the database', (done) => {
        let payload = {
            teacher: "teacherken@gmail.com",
            students: ['studentjon@example.com','studentmay@example.com']
        }
        chai.request(server)
            .post('/api/register')
            .send(payload)
            .end((err, res) => {
                  res.should.have.status(500);
              done();
            });
      });
  });

describe('/GET RetrieveCommonStudents', function() {
    it('Should be retrieve a Common List of Students', (done) => {
        chai.request(server)
            .get('/api/commonstudents?teacher=teacherken@gmail.com')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
              done();
            });
    });
  });

describe('/POST SuspendStudent', function() {
    it('Should suspend the student in database', (done) => {
        let payload = {
            student: "studentjon@example.com",
        }
        chai.request(server)
            .post('/api/suspend')
            .send(payload)
            .end((err, res) => {
                  res.should.have.status(204);
              done();
            });
    });
  });

describe('/POST RetrieveNotifications', function() {
    it('Should get Notification', (done) => {
        let student = {
            teacher: "teacherken@gmail.com",
            notification: "Hello students! @studentagnes@example.com @studentmiche@example.com"
        }
        chai.request(server)
            .post('/api/retrievefornotifications')
            .send(student)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
              done();
            });
    });
  });


  

  


  
