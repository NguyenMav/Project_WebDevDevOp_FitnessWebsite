const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./index.js'); // Assuming your app is in index.js

chai.use(chaiHttp);
const expect = chai.expect;

describe('Subscribe Endpoint', () => {
  it('should successfully subscribe an email', (done) => {
    const email = 'test@example.com';

    chai.request(app)
      .post('/subscribe')
      .send({ email })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.text).to.equal('Subscription successful');
        done();
      });
  });
});