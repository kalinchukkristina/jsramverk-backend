process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect  = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app');

require('chai').should();
chai.use(chaiHttp);

// Test case 1: Check if the /delayed endpoint responds with a 200 status code
describe('/delayed endpoint', () => {
    it('should return a 200 status code', (done) => {
      chai.request(app)
        .get('/delayed')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  // Test case 2: Check if the response JSON has a 'data' property
  describe('/delayed endpoint', () => {
    it('should have a "data" property in the response', (done) => {
      chai.request(app)
        .get('/delayed')
        .end((err, res) => {
          expect(res.body).to.have.property('data');
          done();
        });
    });
  });

  // Test case 3: Check if the 'data' property is an array
  describe('/delayed endpoint', () => {
    it('should have "data" property as an array', (done) => {
      chai.request(app)
        .get('/delayed')
        .end((err, res) => {
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
  });

  // Test case 4: Check if the first item in the 'data' array has certain properties
  describe('/delayed endpoint', () => {
    it('should have the first item with specific properties', (done) => {
      chai.request(app)
        .get('/delayed')
        .end((err, res) => {
          expect(res.body.data[0]).to.have.property('ActivityId');
          expect(res.body.data[0]).to.have.property('ActivityType');
          expect(res.body.data[0]).to.have.property('AdvertisedTimeAtLocation');
          // Add more property checks as needed
          done();
        });
    });
  });

  // Test case 5: Check if the first item in the 'data' array has a specific 'ActivityType'
  describe('/delayed endpoint', () => {
    it('should have the first item with a specific "ActivityType"', (done) => {
      const expectedActivityType = 'Avgang'; // Replace with your expected value
      chai.request(app)
        .get('/delayed')
        .end((err, res) => {
          expect(res.body.data[0].ActivityType).to.equal(expectedActivityType);
          done();
        });
    });
  });

  // Test case 6: Check if the 'Canceled' property is a boolean for all items in the 'data' array
describe('/delayed endpoint', () => {
    it('should have all "Canceled" properties as booleans', (done) => {
      chai.request(app)
        .get('/delayed')
        .end((err, res) => {
          const canceledArray = res.body.data.map(item => item.Canceled);
          expect(canceledArray).to.satisfy(canceledValues => {
            return canceledValues.every(value => typeof value === 'boolean');
          });
          done();
        });
    });
  });

  // Test case 7: Check if the 'EstimatedTimeAtLocation' is in the correct date format for all items in the 'data' array
  describe('/delayed endpoint', () => {
    it('should have "EstimatedTimeAtLocation" in the correct date format for all items', (done) => {
      chai.request(app)
        .get('/delayed')
        .end((err, res) => {
          const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}\+\d{2}:\d{2}$/;
          const estimatedTimeArray = res.body.data.map(item => item.EstimatedTimeAtLocation);
          expect(estimatedTimeArray).to.satisfy(times => {
            return times.every(time => dateFormat.test(time));
          });
          done();
        });
    });
  });
