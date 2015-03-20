var mailinator = require('../index');

describe('Mailinator', function () {
  it('should get inbox of test@mailinator.com', function (done) {
    this.timeout(30000);
    mailinator('test@mailinator.com', function (e, mails) {
      done(e || mails ? null : new Error('No mails'));
    });
  });
});