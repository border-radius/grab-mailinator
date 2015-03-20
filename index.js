var async = require('async');
var requestOriginal = require('request');

function request (opts, next) {
  requestOriginal(opts, function (e, res, body) {
    if (!e && res.statusCode !== 200) {
      e = new Error('HTTP ' + res.statusCode);
    }

    next(e, res, body);
  });
}

module.exports = function (email, next) {
  var time = new Date().getTime(),
      id = email.split('@')[0],
      headers = {
        referer: 'http://mailinator.com/inbox.jsp?to=' + id
      };

  async.waterfall([

    function getAddress (next) {
      request({
        url: [
          'http://mailinator.com/settttt?box=',
          id,
          '&time=',
          time
        ].join(''),
        headers: headers,
        json: true
      }, function (e, res, body) {
        next(e, body && body.address);
      });
    },

    function getMailDir (address, next) {
      request({
        url: [
          'http://mailinator.com/grab?inbox=',
          id,
          '&address=',
          address,
          '&time=',
          time
        ].join(''),
        headers: headers,
        json: true
      }, function (e, res, body) {
        next(e, body && body.maildir);
      })
    },

    function getMails (maildir, next) {
      async.mapLimit(maildir, 5, function (mail, next) {
        request({
          url: [
            'http://mailinator.com/rendermail.jsp?msgid=',
            mail.id, 
            '&time=',
            time
          ].join(''),
          headers: headers
        }, function (e, res, body) {
          mail.body = body;
          next(e, mail);
        });
      }, next);
    }
  ], next);
};