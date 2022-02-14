const script = require('./script');
const http = require('./http');
const env = require('./environment');

let testArray = script.handleTest(script.fileData('./script.json'));
let preset = script.handlePreset(script.fileData('./preset.json'));

exports.run = async () => {
  for (let i = 0; i < testArray.length; i++) {
    test = testArray[i];
    if (test['simulation'] != null) {
      // simulation에 등록한 테스트인 경우
      let name = test['simulation'];
      let tests = preset['simulation'][name];
      for (let i = 0; i < tests.length; i++) {
        let a = env.variable(tests[i]);
        let b = env.random(a);
        switch (tests[i]['method']) {
          case 'GET':
            await http.get(b);
            break;
          case 'POST':
            await http.post(b);
            break;
          case 'PATCH':
            await http.patch(b);
            break;
          case 'PUT':
            await http.put(b);
            break;
          case 'DELETE':
            await http.delete(b);
            break;
          default:
            break;
        }
      }
    } else if (test['preset'] != null) {
      let name = handleNameParams(test['preset'])[0];
      let params = handleNameParams(test['preset'])[1];
      let tests = preset['preset'][name];
      for (let i = 0; i < tests.length; i++) {
        let a = env.params(tests[i], params);
        let b = env.variable(a);
        let c = env.random(b);
        switch (tests[i]['method']) {
          case 'GET':
            await http.get(c);
            break;
          case 'POST':
            await http.post(c);
            break;
          case 'PATCH':
            await http.patch(c);
            break;
          case 'PUT':
            await http.put(c);
            break;
          case 'DELETE':
            await http.delete(c);
            break;
          default:
            break;
        }
      }
    } else {
      // 직접 등록한 테스트인 경우
      let a = env.variable(test);
      let b = env.random(a);
      switch (test['method']) {
        case 'GET':
          await http.get(b);
          break;
        case 'POST':
          await http.post(b);
          break;
        case 'PATCH':
          await http.patch(b);
          break;
        case 'PUT':
          await http.put(b);
          break;
        case 'DELETE':
          await http.delete(b);
          break;
        default:
          break;
      }
    }
  }
};

const handleNameParams = (str) => {
  let name = '';
  let params = [];
  let tmp = '';
  let flag = false;
  for (let i = 0; i < str.length; i++) {
    if (str[i] != '(' && str[i] != ' ') name += str[i];
    else break;
  }
  for (let i = 0; i < str.length; i++) {
    if (str[i] == '(') flag = true;
    if (str[i] == ')') flag = false;
    if (flag && str[i] != '(' && str[i] != ')' && str[i] != ' ') tmp += str[i];
  }
  params = tmp.split(',');
  let result = [name, params];
  return result;
};
