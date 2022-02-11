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
          log.error('Request: ' + uri + ' POST');
          log.error('Body: ' + JSON.stringify(body));
          log.error('Error: ' + error);
          log.error('\n');
          resolve();
        } else {
          log.info('Request: ' + uri + ' POST');
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

exports.patch = (test) => {
  let uri = test['uri'];
  let body = test['body'];
  const options = {
    uri: uri,
    method: 'PATCH',
    body: body,
    json: true,
  };

  return new Promise((resolve, reject) => {
    try {
      request.patch(options, (error, response, responseBody) => {
        if (error != null) {
          log.error('Request: ' + uri + ' PATCH');
          log.error('Body: ' + JSON.stringify(body));
          log.error('Error: ' + error);
          log.error('\n');
          resolve();
        } else {
          log.info('Request: ' + uri + ' PATCH');
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

exports.put = (test) => {
  let uri = test['uri'];
  let body = test['body'];
  const options = {
    uri: uri,
    method: 'PUT',
    body: body,
    json: true,
  };

  return new Promise((resolve, reject) => {
    try {
      request.put(options, (error, response, responseBody) => {
        if (error != null) {
          log.error('Request: ' + uri + ' PUT');
          log.error('Body: ' + JSON.stringify(body));
          log.error('Error: ' + error);
          log.error('\n');
          resolve();
        } else {
          log.info('Request: ' + uri + ' PUT');
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

exports.delete = (test) => {
  let uri = test['uri'];
  let body = test['body'];
  const options = {
    uri: uri,
    method: 'DELETE',
    body: body,
    json: true,
  };

  return new Promise((resolve, reject) => {
    try {
      request.delete(options, (error, response, responseBody) => {
        if (error != null) {
          log.error('Request: ' + uri + ' DELETE');
          log.error('Body: ' + JSON.stringify(body));
          log.error('Error: ' + error);
          log.error('\n');
          resolve();
        } else {
          log.info('Request: ' + uri + ' DELETE');
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
