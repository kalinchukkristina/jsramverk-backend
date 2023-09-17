process.env.NODE_ENV = "test";

const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const server = require("../app");

require("chai").should();
chai.use(chaiHttp);

describe("Tests for /tickets route", () => {
  let testTicketId;

  beforeEach((done) => {
    const newTicket = {
      trainnumber: "Test Train",
      code: "test code",
      traindate: "2023-09-09",
    };

    chai
      .request(server)
      .post("/tickets")
      .send(newTicket)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          testTicketId = res.body.data.id;
          done();
        }
      });
  });

  afterEach((done) => {
    if (testTicketId) {
      chai
        .request(server)
        .delete(`/tickets/${testTicketId}`)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    } else {
      done();
    }
  });

  it("Test route response code...", function (done) {
    chai
      .request(server)
      .get("/tickets")
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res).to.have.status(200);
        done();
      });
  });

  it("Test route response object type...", (done) => {
    chai
      .request(server)
      .get("/tickets")
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body.data).to.be.an("array");
        done();
      });
  });

  it('Test route response object to have attribute "trainnumber" ...', (done) => {
    chai
      .request(server)
      .get("/tickets")
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body.data[0]).to.have.property("trainnumber");
        done();
      });
  });

  it("Test route response in not empty ...", (done) => {
    chai
      .request(server)
      .get("/tickets")
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body.data).to.have.length.gt(0);
        done();
      });
  });

  it("Test to create a new ticket", (done) => {
    const newTicket = {
      trainnumber: "kristina123",
      code: "haha888",
      traindate: "2023-09-09",
    };

    chai
      .request(server)
      .post("/tickets")
      .send(newTicket)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
        expect(res.body.data).to.have.property("code", newTicket.code);
        expect(res.body.data).to.have.property(
          "trainnumber",
          newTicket.trainnumber
        );

        const createdTicketId = res.body.data.id;

        chai
          .request(server)
          .delete(`/tickets/${createdTicketId}`)
          .end((error, response) => {
            if (error) {
              return done(error);
            }

            expect(response).to.have.status(200);
            done();
          });
      });
  });

  it("Test to create a wrong new ticket", (done) => {
    const newTicket = {
      name: "karlskrona",
    };

    chai
      .request(server)
      .post("/tickets")
      .send(newTicket)
      .end((err, res) => {
        expect(res).to.have.status(500);
        done();
      });
  });

  it("Test to delete a wrong ticket", (done) => {
    chai
      .request(server)
      .delete(`/tickets/testId`)
      .end((err, response) => {
        if (err) {
          return done(err);
        }

        expect(response).to.have.status(500);
        expect(response.body).to.deep.equal({ error: "Internal Server Error" });
        done();
      });
  });
});
