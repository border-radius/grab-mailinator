# Grab Mailinator

Grabs inbox of specified mailinator e-mail.

### Usage

First of all, install this module:

```bash
npm install border-radius/grab-mailinator
```

Example of usage:

```javascript
var mailinator = require('grab-mailinator');

mailinator('test@mailinator.com', function (e, mails) {
  if (e) {
    throw e;
  }

  mails.forEach(function (mail) {
    console.log([
      mail.fromfull,
      mail.subject,
      '',
      mail.body.length,
      '',
      '- - -',
      ''
    ].join('\n'));
  });
});
```