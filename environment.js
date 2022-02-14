const script = require('./script');
const random = require('./random');

let preset = script.handlePreset(script.fileData('./preset.json'));

exports.variable = (json) => {
  let data = JSON.stringify(json);
  let arr = getVariables(json);
  let variable = [];
  for (let i = 0; i < arr.length; i++) {
    let splits = arr[i].split(':');
    if (splits[0] != 'random') variable.push(arr[i]);
  }
  for (let i = 0; i < variable.length; i++) {
    let from = '(' + variable[i] + ')';
    let to = preset['variable'][variable[i]];
    data = data.replace(from, to);
  }
  return JSON.parse(data);
};

exports.random = (json) => {
  let data = JSON.stringify(json);
  let arr = getVariables(json);
  let variable = [];
  for (let i = 0; i < arr.length; i++) {
    let splits = arr[i].split(':');
    if (splits[0] == 'random') variable.push(arr[i]);
  }
  for (let i = 0; i < variable.length; i++) {
    let splits = variable[i].split(':');
    let from, to;
    switch (splits[1]) {
      case 'hex':
        from = '(' + variable[i] + ')';
        to = random.randomHex(splits[2]);
        break;
      case 'string':
        from = '(' + variable[i] + ')';
        to = random.randomString(splits[2]);
        break;
      case 'bool':
        from = '"(' + variable[i] + ')"';
        to = random.randomBoolean() ? 'true' : 'false';
        break;
      case 'quantity':
        from = '(' + variable[i] + ')';
        to = random.randomQuantity(splits[2]);
        break;
      case 'tag':
        from = '(' + variable[i] + ')';
        to = random.randomTag();
        break;
      default:
        break;
    }
    data = data.replace(from, to);
  }
  return JSON.parse(data);
};

exports.params = (json, params) => {
  let data = JSON.stringify(json);
  let arr = getVariables(json);
  let paramsList = [];
  for (let i = 0; i < arr.length; i++) {
    let splits = arr[i].split(':');
    if (splits[0] == 'params') paramsList.push(arr[i]);
  }
  for (let i = 0; i < paramsList.length; i++) {
    let splits = paramsList[i].split(':');
    let paramSplits = params[parseInt(splits[1])].split(':');
    let from, to;
    switch (paramSplits[0]) {
      case 'string':
        from = '(' + paramsList[i] + ')';
        to = paramSplits[1];
        break;
      case 'number':
        from = '"(' + paramsList[i] + ')"';
        to = paramSplits[1];
      case 'bool':
        from = '"(' + paramsList[i] + ')"';
        to = paramSplits[1];
        break;
        break;
      default:
        break;
    }
    data = data.replace(from, to);
  }
  return JSON.parse(data);
};

const getVariables = (json) => {
  let data = JSON.stringify(json);
  let bracket = 0;
  let tmp = '';
  let result = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i] == '(') {
      bracket++;
      continue;
    }
    if (data[i] == ')') {
      result.push(tmp);
      bracket--;
      tmp = '';
      continue;
    }
    if (bracket > 0) {
      tmp += data[i];
    }
  }
  return result;
};
