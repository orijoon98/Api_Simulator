const script = require('./script');
const http = require('./http');
const env = require('./environment');

let testArray = script.handleTest(script.fileData('./script.json'));
let preset = script.handlePreset(script.fileData('./preset.json'));

exports.run = async () => {
  for (let i = 0; i < testArray.length; i++) {
    test = testArray[i];
    if (test['simulation'] != null) {
      // preset에 등록한 테스트인 경우
      let name = test['simulation'];
      let tests = preset['simulation'][name];
      for (let i = 0; i < tests.length; i++) {
        tests[i] = env.variable(tests[i]);
        tests[i] = env.random(tests[i]);
        switch (tests[i]['method']) {
          case 'GET':
            await http.get(tests[i]);
            break;
          case 'POST':
            await http.post(tests[i]);
            break;
          case 'PATCH':
            await http.patch(tests[i]);
            break;
          case 'PUT':
            await http.put(tests[i]);
            break;
          case 'DELETE':
            await http.delete(tests[i]);
            break;
          default:
            break;
        }
      }
    } else {
      // 직접 등록한 테스트인 경우
      test = env.variable(test);
      test = env.random(test);
      switch (test['method']) {
        case 'GET':
          await http.get(test);
          break;
        case 'POST':
          await http.post(test);
          break;
        case 'PATCH':
          await http.patch(test);
          break;
        case 'PUT':
          await http.put(test);
          break;
        case 'DELETE':
          await http.delete(test);
          break;
        default:
          break;
      }
    }
  }
};
