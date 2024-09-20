// test/math.test.js
const { expect } = require('chai');

// Simple addition function
function add(a, b) {
    return a + b;
}

describe('Math Functions', () => {
    it('should return 3 when adding 1 and 2', () => {
        const result = add(1, 2);
        expect(result).to.equal(3);
    });

    it('should return 5 when adding 2 and 3', () => {
        const result = add(2, 3);
        expect(result).to.equal(5);
    });
});
