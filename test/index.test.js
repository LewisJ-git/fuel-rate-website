import { expect, server, BASE_URL } from './setup';
import supertest from "supertest";

describe('Login', () => {
  it('get login page', done => {
    server
      .get(`${BASE_URL}/api/login`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        res.body.login.forEach(m => {
          expect(m).to.have.property('username');
          expect(m).to.have.property('password');
        });
        done();
      });
  });
});


/*Get Test*/
describe("Testing the get request for User Account Infomation", () => {
  test("It should get a response of 200", () => {
    return supertest(app)
      .get(`${BASE_URL}/getClient`)
      .expect(200)
      .then((result) => {
        expect(result.statusCode).to.equal(200);
      });
  });
});

/*Post Test */
describe("Testing the post request for the Fuel Quote Form", () => {
  test("This should get a reponse of 200", async () => {
    const result = await supertest(app).post("/api/quote").send({
      username: "test12",
      password: "test1212",
    });
    expect(result.statusCode).toBe(200);
  });
});

describe("Testing the post request for the User Reqistration Form", () => {
  test("This should get a reponse of 200", async () => {
    const result = await supertest(app)
      .post("/api/profile")
      .send({
        username: "test12",
        password: "test1212",
      });
    expect(result.statusCode).toBe(200);
  });
});


it('get history', done => {
  const data = { username: 'test12e', password: 'test1212' };
  server
    .post(`${BASE_URL}/api/quoteHistory`)
    .send(data)
    .expect(200)
    .end((err, res) => {
      expect(res.status).to.equal(200);
      expect(res.body.quoteHistory).to.be.instanceOf(Array);
      res.body.quoteHistory.forEach(m => {
        expect(m).to.have.property('id', data.quote_id);
        expect(m).to.have.property('gallons', data.gallons);
        expect(m).to.have.property('address1', data.address1);
        expect(m).to.have.property('delivery', data.delivery);
        expect(m).to.have.property('suggestedPrice', data.suggestedPrice);
        expect(m).to.have.property('deliveryPrice', data.deliveryPrice);
      });
      done();
    });
});