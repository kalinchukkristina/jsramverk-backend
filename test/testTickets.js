const chai = require('chai');
const expect  = chai.expect;
const chaiHttp = require('chai-http');
const server = require('../app');

require('chai').should();
chai.use(chaiHttp);

describe('Tests for /tickets route', () => {
  it('Test route response code...', (done) => {
    chai
    .request(server)
    .get('/tickets')
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      expect(res).to.have.status(200);
      done();
    });
  })

  it('Test route response object type...', (done) => {
    chai
    .request(server)
    .get('/tickets')
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      expect(res.body.data).to.be.an('array');
      done();
    });
  })

  it('Test route response object to have attribute "trainnumber" ...', (done) => {
    chai
    .request(server)
    .get('/tickets')
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      expect(res.body.data[0]).to.have.property('trainnumber');
      done();
    });
  })

  it('Test route response in not empty ...', (done) => {
    chai
    .request(server)
    .get('/tickets')
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      expect(res.body.data).to.have.length.gt(0);
      done();
    });
  })
})