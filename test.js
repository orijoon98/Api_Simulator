const script = require('./script');
const http = require('./http');
const env = require('./environment');

let testArray = script.handleTest(script.fileData('./script.json'));
let preset = script.handlePreset(script.fileData('./preset.json'));

exports.run = async () => {
  for (let i = 0; i < testArray.length; i++) {
    test = testArray[i];
    if (test['preset'] != null) {
      // preset에 등록한 테스트인 경우
      let name = test['preset'];
      let tests = preset[name];
      for (let i = 0; i < tests.length; i++) {
        tests[i] = env.variable(tests[i]);
        tests[i] = env.random(tests[i]);
        await http.post(tests[i]);
      }
    } else {
      // 직접 등록한 테스트인 경우
      test = env.variable(test);
      test = env.random(test);
      await http.post(test);
    }
  }
};
