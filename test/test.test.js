const chai = require('chai');
const expect = chai.expect;

// Sample function to test
function add(a, b) {
    return a + b;
}

describe('Add function', function() {
    it('should return 3 when adding 1 and 2', function() {
        expect(add(1, 2)).to.equal(3);
    });

    it('should return 5 when adding 2 and 3', function() {
        expect(add(2, 3)).to.equal(5);
    });
});