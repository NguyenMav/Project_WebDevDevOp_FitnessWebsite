const request = require('supertest');
const express = require('express');
const chai = require('chai');
const { expect } = chai;

// Create a simple Express app for testing
const app = express();
app.use(express.json());

// Mock routes
app.post('/subscribe', (req, res) => {
    console.log('Testing /subscribe endpoint');
    const { email } = req.body;
    if (!email) {
        return res.status(400).send('Email is required');
    }
    res.status(201).send('Subscription successful');
});

app.post('/contact', (req, res) => {
    console.log('Testing /contact endpoint');
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).send('All fields are required');
    }
    res.status(201).send('Contact form submitted successfully');
});

app.post('/book-coaching', (req, res) => {
    console.log('Testing /book-coaching endpoint');
    const { name, email, phone, session, goal } = req.body;
    if (!name || !email || !phone || !session || !goal) {
        return res.status(400).send('All fields are required');
    }
    res.status(201).send('Coaching session booked successfully');
});

// Tests
describe('API Functionality Tests', () => {
    it('should test the /subscribe endpoint', (done) => {
        request(app)
            .post('/subscribe')
            .send({ email: 'test@example.com' })
            .expect(201)
            .expect(res => {
                console.log(res.text); // Echo the response
                expect(res.text).to.equal('Subscription successful');
            })
            .end(done);
    });

    it('should test the /contact endpoint', (done) => {
        request(app)
            .post('/contact')
            .send({ name: 'John Doe', email: 'john@example.com', message: 'Hello!' })
            .expect(201)
            .expect(res => {
                console.log(res.text); // Echo the response
                expect(res.text).to.equal('Contact form submitted successfully');
            })
            .end(done);
    });

    it('should test the /book-coaching endpoint', (done) => {
        request(app)
            .post('/book-coaching')
            .send({ name: 'Jane Doe', email: 'jane@example.com', phone: '1234567890', session: '1-on-1', goal: 'Learning' })
            .expect(201)
            .expect(res => {
                console.log(res.text); // Echo the response
                expect(res.text).to.equal('Coaching session booked successfully');
            })
            .end(done);
    });
});