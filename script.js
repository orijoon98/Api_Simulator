const fs = require('fs');

exports.fileData = (file) => {
  let data = fs.readFileSync(file, 'utf-8');
  return data;
};

exports.handleTest = (data) => {
  let json = JSON.parse(data);
  let testArray = json['test'];
  return testArray;
};

exports.handlePreset = (data) => {
  let json = JSON.parse(data);
  return json;
};
