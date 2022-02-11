const request = require('request');
const log = require('tracer').colorConsole({
  format: '{{message}}',
});

exports.get = (test) => {
  let uri = test['uri'];
  let query = test['query'];
  let keys = [];
  let url = uri;
  for (key in query) {
    keys.push(key);
  }
  for (let i = 0; i < keys.length; i++) {
    if (i == 0) url += '?';
    url += keys[i];
    url += '=';
    url += query[keys[i]];
    if (i != keys.length - 1) url += '&';
  }
  const options = {
    uri: url,
  };

  return new Promise((resolve, reject) => {
    try {
      request.get(options, (error, response, responseBody) => {
        let status = Math.floor(response.statusCode / 100);
        if (error != null || status != 2) {
          log.error('Request: ' + url + ' GET');
          log.error('Status: ' + response.statusCode);
          log.error('Error: ' + error);
          log.error('Response: ' + JSON.stringify(responseBody));
          log.error('\n');
          resolve();
        } else {
          log.info('Request: ' + uri + ' GET');
          log.info('Status: ' + response.statusCode);
          log.info('Query: ' + JSON.stringify(query));
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
        let status = Math.floor(response.statusCode / 100);
        if (error != null || status != 2) {
          log.error('Request: ' + uri + ' POST');
          log.error('Status: ' + response.statusCode);
          log.error('Body: ' + JSON.stringify(body));
          log.error('Error: ' + error);
          log.error('Response: ' + JSON.stringify(responseBody));
          log.error('\n');
          resolve();
        } else {
          log.info('Request: ' + uri + ' POST');
          log.info('Status: ' + response.statusCode);
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
        let status = Math.floor(response.statusCode / 100);
        if (error != null || status != 2) {
          log.error('Request: ' + uri + ' PATCH');
          log.error('Status: ' + response.statusCode);
          log.error('Body: ' + JSON.stringify(body));
          log.error('Error: ' + error);
          log.error('Response: ' + JSON.stringify(responseBody));
          log.error('\n');
          resolve();
        } else {
          log.info('Request: ' + uri + ' PATCH');
          log.info('Status: ' + response.statusCode);
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
        let status = Math.floor(response.statusCode / 100);
        if (error != null || status != 2) {
          log.error('Request: ' + uri + ' PUT');
          log.error('Status: ' + response.statusCode);
          log.error('Body: ' + JSON.stringify(body));
          log.error('Error: ' + error);
          log.error('Response: ' + JSON.stringify(responseBody));
          log.error('\n');
          resolve();
        } else {
          log.info('Request: ' + uri + ' PUT');
          log.info('Status: ' + response.statusCode);
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
        let status = Math.floor(response.statusCode / 100);
        if (error != null || status != 2) {
          log.error('Request: ' + uri + ' DELETE');
          log.error('Status: ' + response.statusCode);
          log.error('Body: ' + JSON.stringify(body));
          log.error('Error: ' + error);
          log.error('Response: ' + JSON.stringify(responseBody));
          log.error('\n');
          resolve();
        } else {
          log.info('Request: ' + uri + ' DELETE');
          log.info('Status: ' + response.statusCode);
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
