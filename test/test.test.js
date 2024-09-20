import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './index.js';

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