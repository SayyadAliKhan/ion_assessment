process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
chai.use(chaiHttp);

before((done) => {
    console.log('before all');
    mongoose.connection.on('connected', () => {
      done();
    });
});

describe("GRAPH Data", () => {

  it('it should expect 404', (done) => {
        chai.request('http://localhost:3000')
            .get('/grap')
            .end((err, res) => {
                  res.should.have.status(404);
              done();
            });
      });
  it('it should GET all the records', (done) => {
        chai.request('http://localhost:3000')
            .get('/graph')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.not.eql(0);
              done();
            });
      }).timeout(10000);
});
