const assert = require('assert');

// Simple function to test
function add(a, b) {
    return a + b;
}

// Test suite
describe('Math Functions', () => {
    it('should return 3 when adding 1 and 2', () => {
        const result = add(1, 2);
        assert.strictEqual(result, 3);
    });

    it('should return 5 when adding 2 and 3', () => {
        const result = add(2, 3);
        assert.strictEqual(result, 5);
    });
});
