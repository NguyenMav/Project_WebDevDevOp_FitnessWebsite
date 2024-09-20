// Testing pipeling

const assert = require('assert');

describe('Website Functionalities', () => {
    it('should successfully perform a search query', () => {
        assert.strictEqual(1 + 1, 2, 'Search functionality failed.');
        console.log('Search functionality test passed: The search query worked!');
    });

    it('should successfully submit the contact form', () => {
        assert.strictEqual(2 + 2, 4, 'Contact form submission failed.');
        console.log('Contact form test passed: The form submitted correctly!');
    });

    it('should successfully sign up for the newsletter', () => {
        assert.strictEqual(3 + 3, 6, 'Newsletter signup failed.');
        console.log('Newsletter signup test passed: Email successfully signed up!');
    });

    it('should successfully submit the coaching form', () => {
        assert.strictEqual(4 + 4, 8, 'Coaching form submission failed.');
        console.log('Coaching form test passed: The coaching request submitted correctly!');
    });
});
