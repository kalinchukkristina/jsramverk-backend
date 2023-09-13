process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect  = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app');

require('chai').should();
chai.use(chaiHttp);

// Test case 1: Check if the /codes endpoint responds with a 200 status code
describe('/codes endpoint', () => {
    it('should return a 200 status code', (done) => {
      chai.request(app)
        .get('/codes')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
  
  // Test case 2: Check if the response JSON has a 'data' property
  describe('/codes endpoint', () => {
    it('should have a "data" property in the response', (done) => {
      chai.request(app)
        .get('/codes')
        .end((err, res) => {
          expect(res.body).to.have.property('data');
          done();
        });
    });
  });
  
  // Test case 3: Check if the 'data' property is an array
  describe('/codes endpoint', () => {
    it('should have "data" property as an array', (done) => {
      chai.request(app)
        .get('/codes')
        .end((err, res) => {
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
  });
  
  // Test case 4: Check if the first item in the 'data' array has certain properties
  describe('/codes endpoint', () => {
    it('should have the first item with specific properties', (done) => {
      chai.request(app)
        .get('/codes')
        .end((err, res) => {
          expect(res.body.data[0]).to.have.property('Code');
          expect(res.body.data[0]).to.have.property('Level1Description');
          expect(res.body.data[0]).to.have.property('Level2Description');
          expect(res.body.data[0]).to.have.property('Level3Description');
          // Add more property checks as needed
          done();
        });
    });
  });
  
  // Test case 5: Check if the 'Code' property is a string for all items in the 'data' array
  describe('/codes endpoint', () => {
    it('should have all "Code" properties as strings', (done) => {
      chai.request(app)
        .get('/codes')
        .end((err, res) => {
          const codeArray = res.body.data.map(item => item.Code);
          expect(codeArray).to.satisfy(codes => {
            return codes.every(code => typeof code === 'string');
          });
          done();
        });
    });
  });
