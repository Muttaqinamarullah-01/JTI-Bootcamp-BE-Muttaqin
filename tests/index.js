const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);
chai.should();

let itemId = '';

describe('POST /api/v1/bootcamp', () => {
    it('Enter a new item on the to do list', (done) => {
      chai.request(app)
        .post('/api/v1/bootcamp')
        .set('Content-Type', 'application/json')
        .send({
          text: "Write a unit test",
          isCompleted: false
        })
        .end((err, res) => {	
          if (err) {
            return done(err);
          } else {
            res.should.have.status(200);
            itemId = res.body._id;
            return done();
          }
        });
    });
});
  
describe('GET /api/v1/bootcamp', () => {
    it('Get every item on the To Do list', (done) => {
      chai.request(app)
        .get('/api/v1/bootcamp')
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          if (err) {
            return done(err);
          } else {
            res.should.have.status(200);
            return done();
          }
        });
    });
});
  
describe('GET /api/v1/bootcamp/{id}', (done) => {
    it('Get a specific item on the To Do list through the ID', (done) => {
      chai.request(app)
        .get('/api/v1/bootcamp/' + itemId)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          if (err) {
            return done(err);
          } else {
            return done();
          }
        });
    });
});

describe('PUT /api/v1/bootcamp/{id}', (done) => {
    it('Update an item on the to do list', (done) => {
      chai.request(app)
        .put('/api/v1/bootcamp/' + itemId)
        .set('Content-Type', 'application/json')
        .send({
          text: "Write complete unit tests",
          isCompleted: true
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          } else {
            return done();
          }
        });
    });
});

describe('DELETE /api/v1/bootcamp/{id}', (done) => {
    it('Delete an item on the to do list', (done) => {
      chai.request(app)
        .delete('/api/v1/bootcamp/' + itemId)
        .set('Content-Type', 'application/json')
        .end((err, res) => {
          if (err) {
            return done(err);
          } else {
            res.should.have.status(200);
            return done();
          }
        });
    });
});
  
  
  
  
  
  