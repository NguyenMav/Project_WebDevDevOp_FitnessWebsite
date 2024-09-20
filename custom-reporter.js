const Mocha = require('mocha');

class CustomReporter extends Mocha.reporters.Base {
  constructor(runner) {
    super(runner);

    runner.on('pass', (test) => {
      console.log(`✅ ${test.title} - Passed`);
    });

    runner.on('end', () => {
      console.log(`\nTotal Tests: ${this.stats.passes + this.stats.failures}`);
      console.log(`Passed: ${this.stats.passes}`);
      console.log(`Failed: ${this.stats.failures}`);
    });
  }
}

module.exports = CustomReporter;
