function add(a, b) {
    return a + b;
}

describe('Add function', function() {
    it('should return 3 when adding 1 and 2', function() {
        if (add(1, 2) !== 3) {
            throw new Error('Test failed: expected 3');
        }
    });
});