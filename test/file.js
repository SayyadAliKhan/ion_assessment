process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
chai.use(chaiHttp);

describe("fileupload", () => {

  it('it should expect 404', (done) => {
        chai.request('http://localhost:3000')
            .get('/uploa')
            .end((err, res) => {
                  res.should.have.status(404);
              done();
            });
      });

  it('it should upload file', (done) => {
        chai.request('http://localhost:3000')
            .post('/upload')
            .attach('files', './test/therm0001.json')
            .end((err, res) => {
              done();
            });
      }).timeout(10000);
});
