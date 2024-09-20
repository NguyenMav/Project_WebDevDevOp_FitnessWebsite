const chai = require('chai');
const chaiHttp = require('chai-http');
const sqlite3 = require('sqlite3').verbose();
const app = require('./index.js'); // Assuming your app is in index.js
const sqlite3Memory = require('sqlite3-memory');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Database Tests', () => {
  let db;

  beforeEach(() => {
    db = new sqlite3.Database(':memory:', (err) => {
      if (err) {
        throw err;
      }
      console.log('Connected to in-memory database');
    });
  });

  afterEach(() => {
    db.close((err) => {
      if (err) {
        throw err;
      }
      console.log('Closed in-memory database');
    });
  });

  it('should insert a new subscriber', (done) => {
    const email = 'test@example.com';

    db.run('INSERT INTO Subscribers (email) VALUES (?)', [email], (err) => {
      if (err) {
        throw err;
      }

      db.all('SELECT * FROM Subscribers', [], (err, rows) => {
        if (err) {
          throw err;
        }

        expect(rows.length).to.equal(1);
        expect(rows[0].email).to.equal(email);
        done();
      });
    });
  });

  // Add more test cases for other database operations
});
