const request = require('supertest');
const express = require('express');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sqlite3 = require('sqlite3').verbose();

chai.use(chaiHttp);
const expect = chai.expect;

// Sample Express app for testing
const app = express();
app.use(express.json());

// Mock the database
const db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    }
    console.log('Connected to the in-memory database.');
});

// Define your routes
app.post('/subscribe', (req, res) => {
    const { email } = req.body;
    db.run('CREATE TABLE Subscribers (email TEXT)');
    db.run('INSERT INTO Subscribers (email) VALUES (?)', [email], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Internal Server Error');
        }
        res.status(201).send('Subscription successful');
    });
});

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    db.run('CREATE TABLE Contacts (name TEXT, email TEXT, message TEXT)');
    db.run('INSERT INTO Contacts (name, email, message) VALUES (?, ?, ?)', [name, email, message], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Internal Server Error');
        }
        res.status(201).send('Contact form submitted successfully');
    });
});

app.post('/book-coaching', (req, res) => {
    const { name, email, phone, session, goal } = req.body;
    db.run('CREATE TABLE Coaching (name TEXT, email TEXT, phone TEXT, session TEXT, goal TEXT)');
    db.run('INSERT INTO Coaching (name, email, phone, session, goal) VALUES (?, ?, ?, ?, ?)', [name, email, phone, session, goal], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Internal Server Error');
        }
        res.status(201).send('Coaching session booked successfully');
    });
});

describe('API Tests', () => {
    it('POST /subscribe should return a success message', (done) => {
        request(app)
            .post('/subscribe')
            .send({ email: 'test@example.com' })
            .expect('Content-Type', /text/)
            .expect(201)
            .expect(res => {
                if (res.text !== 'Subscription successful') throw new Error("Message doesn't match");
            })
            .end(done);
    });

    it('POST /contact should return a success message', (done) => {
        request(app)
            .post('/contact')
            .send({ name: 'John Doe', email: 'john@example.com', message: 'Hello!' })
            .expect('Content-Type', /text/)
            .expect(201)
            .expect(res => {
                if (res.text !== 'Contact form submitted successfully') throw new Error("Message doesn't match");
            })
            .end(done);
    });

    it('POST /book-coaching should return a success message', (done) => {
        request(app)
            .post('/book-coaching')
            .send({ name: 'Jane Doe', email: 'jane@example.com', phone: '1234567890', session: '1-on-1', goal: 'Learning' })
            .expect('Content-Type', /text/)
            .expect(201)
            .expect(res => {
                if (res.text !== 'Coaching session booked successfully') throw new Error("Message doesn't match");
            })
            .end(done);
    });

    it('GET /subscribers should return subscribers (mocked)', (done) => {
        request(app)
            .get('/subscribers')
            .expect(200) // Adjust as needed based on your implementation
            .end(done);
    });
});