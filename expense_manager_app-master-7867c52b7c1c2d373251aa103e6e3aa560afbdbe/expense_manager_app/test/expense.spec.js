const assert = require('chai').assert;
const request = require('supertest');
const app = require('../index');
const messages = require('../server/api/modules/expense/messages');

// testsuit starts from here
describe('Expense Manager testing', function () { 
  //testsuit for functionality testing
  describe('Functionality testing', function () {
    // testsuit for adding expense
    describe('Adding expense functionality testing', function () {
      // testcase to insert expense record
      it('Should create expense, returning success message', function (done) {
        //write assertion code here and your response should return below given message
        //'Expense record is added successfully'
        request(app)
          .post(`/api/expense/`)
          .send({
            "id": "10",
            "title": "test",
            "category": "test",
            "description": "test",
            "amount": "1000",
            "expenseDate": "08/07/2019"
          })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, messages.expenseAdded, 'should add expense and send success message');
          });
        done();
      });
      // testcase to handle, if expense record is already exist with the given id
      it('Should not create expense if expense is already exist with the given id, returning error message', function (done) {
        // write assertion code here and your response should return below given message
        //'Expense record is already exist with the given id'
        request(app)
          .post(`/api/expense/`)
          .send({
            "id": "1",
            "title": "air ticket",
            "category": "fair",
            "description": "went to goa",
            "amount": "20000",
            "expenseDate": "26/05/2017"
          })
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, messages.expenseAlreadyExists, 'should not add expense and send error message');
          });
        done();
      });
      // testcase to handle, if user is passing empty record.
      it('Should not create expense if passing empty record, returning error message', function (done) {
        // write assertion code here and your response should return below given message
        //'Empty data is not allowed, please provide some valid data to insert record'
        request(app)
          .post(`/api/expense/`)
          .send({})
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, messages.emptyDataReceived, 'should not add expense and send error message');
          });
        done();
      });
      // testcase to handle, if user is not passing any record in post body.
      it('Should not create expense if user is not passing any record in post request, returning error message', function (done) {
        // write assertion code here and your response should return below given message
        // 'Please provide some data to add new expense'
        request(app)
          .post(`/api/expense/`)
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);            
            assert.equal(res.body, messages.noDataReceived, 'should not add expense and send error message');
          });
        done();
      });
      // testcase to handle, if user is passing wrong key as a record.
      it('Should not create expense if user is passing wrong data, returning error message', function (done) {
        // write assertion code here and your response should return below given message
        // 'Please provide values for id ,title, category, description, amount and expenseDate. All are mandatory data elements'
        request(app)
          .post(`/api/expense/`)
          .send({
            "id": "10",
            "category": "test",
            "description": "test",
            "amount": "1000",
            "expenseDate": "08/07/2018"
          })
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);            
            assert.equal(res.body, messages.missingData, 'should not add expense and send error message');
          });
        done();
      });
    });
    // testsuit to get all expense record
    describe('Getting all expense functionality testing', function () {
      it('Should get all expense, returning array of expense ', function (done) {
        // write assertion code here and check response array length, it should be greater than zero
        request(app)
          .get(`/api/expense/`)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            assert.isNotEmpty(res.body);
            assert.isAbove(res.body.length, 0)
          });
        done();
      });
    });
    // testsuit to update expense record
    describe('Updating expense functionality testing', function () {
      // testcase to update particular expense category
      it('Should search expense by id and update expense category, returning success message', function (done) {
        // write assertion code here and your response should return below given message
        // 'Expense record is updated successfully'
        request(app)
          .put(`/api/expense/1`)
          .send({
            "id": "1",
            "title": "test",
            "category": "test",
            "description": "test",
            "amount": "1000",
            "expenseDate": "08/07/2018"
          })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, messages.expenseUpdated, 'should update expense and send success message');
          });
        done();
      });
      // testcase to handle, if no expense record will be found by given category
      it('Should search expense by id if expense is not found with the given id, returning error message', function (done) {
        // write assertion code here and your response should return below given message
        // 'Expense record is not found with the given id'
        request(app)
          .put(`/api/expense/-1`)
          .send({
            "id": "1",
            "title": "air ticket",
            "category": "fair",
            "description": "went to goa",
            "amount": "20000",
            "expenseDate": "26/05/2017"
          })
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, messages.expenseNotFoundForUpdate, 'should not update expense and send error message');
          });
        done();
      });
      // testcase to handle, if user is passing empty record.
      it('Should not update expense if passing empty record, returning error message', function (done) {
        // write assertion code here and your response should return below given message
        // 'Empty data is not allowed, please provide some valid data to update record'
        request(app)
          .put(`/api/expense/1`)
          .send({})
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, messages.emptyDataForUpdate, 'should not update expense and send error message');
          });
        done();
      });
      // testcase to handle, if user is not passing any record in put body.
      it('Should not update expense if user is not passing any record in update request, returning error message', function (done) {
        // write assertion code here and your response should return below given message
        // 'Please provide id and some data to update expense record'
        request(app)
          .put(`/api/expense/1`)
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, messages.noDataReceivedForUpdate, 'should not update expense and send error message');
          });
        done();
      });
      // testcase to handle, if user is not passing id in update request.
      it('Should not update expense if passing without any id, returning error message', function (done) {
        // write assertion code here and your response should return below given message
        // 'Please provide expense id to update record'
        request(app)
          .put(`/api/expense/1`)
          .send({
            "title": "title",
            "category": "test",
            "description": "test",
            "amount": "1000",
            "expenseDate": "08/07/2018"
          })
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, messages.missingIdForUpdate, 'should not update expense and send error message');
          });
        done();
      });
      // testcase to handle, if user is passing id only id not other field values.
      it('Should not update expense if passing only id not other fields, returning error message', function (done) {
        // write assertion code here and your response should return below given message
        // 'Please provide values those needs to update'
        request(app)
          .put(`/api/expense/1`)
          .send({
            "id": "1"
          })
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, messages.missingValuesForUpdate, 'should not update expense and send error message');
          });
        done();
      });
    });
    // testsuit to search and get expense record according to given condition
    describe('Searching expense functionality testing', function () {
      // testcase to get all expense those are matching with given start and end date
      it('Should search expense by start and end date, returning matching expense data as an array', function (done) {
        // write assertion code here and check response array length, it should be greater than zero
        request(app)
          .get(`/api/expense/?startdate=01/01/2018&enddate=31/12/2018`)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            assert.isNotEmpty(res.body);
            assert.isAbove(res.body.length, 0);
          });
        done();
      });
      // testcase to get all expense, those are equal to given start date and greater than given start date
      it('Should search expense by start date only, returning expense data where date is greater than and equal to the given start date', function (done) {
        // write assertion code here and check response array length, it should be greater than zero        
        request(app)
          .get(`/api/expense/?startdate=01/01/2018`)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            assert.isNotEmpty(res.body);
            assert.isAbove(res.body.length, 0);
          });
        done();
      });
      // testcase to get all expense those are matching with given category, start and end date.
      it('Should search expense by category, start and end date, returning matching expense data as an array', function (done) {
        // write assertion code here and check response array length, it should be greater than zero               
        request(app)
          .get(`/api/expense/fair?startdate=01/01/2018&enddate=31/12/2018`)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            const data = res.body;
            assert.isNotEmpty(data);
            assert.isAbove(data.length, 0);
          });
        done();
      });
      // // testcase to get all expense, those are equal to given category, start date and greater than given start date
      it('Should search expense by category and start date only, returning expense data matching with given category and date should be greater than and equal to start date', function (done) {
        // write assertion code here and check response array length, it should be greater than zero        
        request(app)
          .get(`/api/expense/fair?startdate=01/01/2018`)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            assert.isNotEmpty(res.body);
            assert.isAbove(res.body.length, 0);
          });
        done();
      });
      // // testcase to get all expense, those are equal to given category, start date and greater than given start date
      it('Should handle 404 error if route not matched, returning Not Found message', function (done) {
        // write assertion code here and your response should return below given message
        // 'Not Found'        
        request(app)
          .get(`/api/expense/data/notfound`)
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, messages.notFound);
          });
        done();
      });
    });
    // testsuit to delete a expense record
    describe('Deleting expense functionality testing', function () {
      // testcase to delete expense record by given id
      it('Should search expense by id and delete particular expense record, returning success message', function (done) {
        // write assertion code here and your response should return below given message
        // 'Expense record is deleted successfully'
        request(app)
          .delete(`/api/expense/1`)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, messages.expenseDeleted, 'should delete expense and send success message');
          });
        done();
      });
      // testcase to handle, if no expense record will be found by given id
      it('Should search expense by id if expense is not found with the given id, returning error message', function (done) {
        // write assertion code here and your response should return below given message
        // 'Expense provide correct id, there is no expense record with the given id'
        request(app)
          .delete(`/api/expense/100`)
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, messages.expenseNotFoundForDelete, 'should not delete expense and send error message');
          });
        done();
      });
      // testcase to handle, if user is not passing any record in delete body.
      it('Should not delete expense if user is not passing any record in delete request, returning error message', function (done) {
        // write assertion code here and your response should return below given message
        // 'Please provide expense id to delete expense record'
        request(app)
        .delete(`/api/expense`)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, messages.missingIdForDelete, 'should not delete expense and send error message');
        });
        done();
      });
      // testcase to handle, if user is not passing id in delete request body.
      it('Should not delete expense if not passing id, returning error message', function (done) {
        // write assertion code here and your response should return below given message
        // 'Please provide expense id to delete expense record'
        request(app)
        .delete(`/api/expense`)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, messages.missingIdForDelete, 'should not delete expense and send error message');
        });
        done();
      });
    });
  });
});