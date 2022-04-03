import { expect, server, BASE_URL } from './setup';
import supertest from "supertest";
import app from "server.js";
describe('Index page test', () => {
  it('gets base url', done => {
    server
      .get(`${BASE_URL}/`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal(
          '123'
        );
        done();
      });
  });
});

/*Get Test*/
describe("Testing the get request for User Account Infomation", () => {
  test("It should get a response of 200", () => {
    return supertest(app)
      .get("/api/getClient")
      .then((result) => {
        expect(result.statusCode).toBe(200);
      });
  });
});

/*Post Test */
describe("Testing the post request for the Fuel Quote Form", () => {
  test("This should get a reponse of 200", async () => {
    const result = await supertest(app).post("/api/quote").send({
      userId: "Test",
      password: "Test",
    });
    expect(result.statusCode).toBe(200);
  });
});

describe("Testing the post request for the User Reqistration Form", () => {
  test("This should get a reponse of 200", async () => {
    const result = await supertest(app)
      .post("/api/profile")
      .send({
        username: "Test",
        password: "Test",
      });
    expect(result.statusCode).toBe(200);
  });
});
