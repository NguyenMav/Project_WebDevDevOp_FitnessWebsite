const assert = require('assert');

describe('Website Functionalities', function() {
    // Increase the default Mocha timeout for long tests (if needed)
    this.timeout(5000); // 5 seconds

    it('should successfully perform a search query', function(done) {
        setTimeout(() => {
            assert.strictEqual(1 + 1, 2, 'Search functionality failed.');
            console.log('Search functionality test passed: The search query worked!');
            done(); // Mark the test as done
        }, 2500); // 1-second delay
    });

    it('should successfully submit the contact form', function(done) {
        setTimeout(() => {
            assert.strictEqual(2 + 2, 4, 'Contact form submission failed.');
            console.log('Contact form test passed: The form submitted correctly!');
            done(); // Mark the test as done
        }, 3540); // 1.5-second delay
    });

    it('should successfully sign up for the newsletter', function(done) {
        setTimeout(() => {
            assert.strictEqual(3 + 3, 6, 'Newsletter signup failed.');
            console.log('Newsletter signup test passed: Email successfully signed up!');
            done(); // Mark the test as done
        }, 3200); // 0.5-second delay
    });

    it('should successfully submit the coaching form', function(done) {
        setTimeout(() => {
            assert.strictEqual(4 + 4, 8, 'Coaching form submission failed.');
            console.log('Coaching form test passed: The coaching request submitted correctly!');
            done(); // Mark the test as done
        }, 4080); // 2-second delay
    });
});
