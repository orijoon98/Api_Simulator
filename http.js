const request = require('request');
const log = require('tracer').colorConsole({
  format: '{{message}}',
});

exports.post = (test) => {
  let uri = test['uri'];
  let body = test['body'];
  const options = {
    uri: uri,
    method: 'POST',
    body: body,
    json: true,
  };

  return new Promise((resolve, reject) => {
    try {
      request.post(options, (error, response, responseBody) => {
        if (error != null) {
          log.error('Request: ' + uri);
          log.error('Body: ' + JSON.stringify(body));
          log.error('Error: ' + error);
          log.error('\n');
          resolve();
        } else {
          log.info('Request: ' + uri);
          log.info('Body: ' + JSON.stringify(body));
          log.info('Response: ' + JSON.stringify(responseBody));
          log.info('\n');
          resolve();
        }
      });
    } catch (e) {
      reject();
    }
  });
};
