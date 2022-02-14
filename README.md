# API 시뮬레이션 테스트 프로그램
## 사용법

### 프로젝트 세팅

```bash
git clone https://github.com/orijoon98/Api_Simulator.git
npm install
```

### 스크립트 작성

프로젝트 최상단에 script.json, preset.json 스크립트 작성

### 프로젝트 실행

```bash
npm start
```

## 스크립트 작성법

### API 호출 방법

- uri: 요청 uri
- method: GET, POST, PATCH, PUT, DELETE
- body / query: GET - query, POST, PATCH, PUT, DELETE - body
- script.json - test 배열에 api 세팅하면 순서대로 api 호출
- 예시

```json
{
	"test": [	
		{
			"uri": "http://localhost:8080/api/login",
			"method": "POST",
			"body": {
				"username": "user1",
				"password": "password1"
			}
		},
		{
			"uri": "http://localhost:8080/api/info",
			"method": "GET",
			"query": {
				"userId": "1"
			}
		}
	]
}
```

### variable 기능

- preset.json - variable에 변수 세팅
- (변수명) 으로 사용
- 예시

```json
// preset.json

{
  "variable": {
    "host": "http://localhost:8080"
  },
  "preset": {
	  
  }
}
```

```json
// script.json
{
	"test": [	
		{
			"uri": "(host)/api/login", // preset.json - variable의 host 사용
			"method": "POST",
			"body": {
				"username": "user1",
				"password": "password1"
			}
		},
		{
			"uri": "(host)/api/info", // preset.json - variable의 host 사용
			"method": "GET",
			"query": {
				"userId": "1"
			}
		}
	]
}
```

### preset 기능

- preset.json - preset에 테스트 미리 작성 → script.json에서 preset 호출
- 예시

```json
// preset.json

{
  "variable": {
    "host": "http://localhost:8080"
  },
  "preset": {
	  "presetExample": [	
			{
				"uri": "(host)/api/login", // preset.json - variable의 host 사용
				"method": "POST",
				"body": {
					"username": "user1",
					"password": "password1"
				}
			},
			{
				"uri": "(host)/api/info", // preset.json - variable의 host 사용
				"method": "GET",
				"query": {
					"userId": "1"
				}
			}
		]
  }
}
```

```json
// script.json
{
	"test": [	
		{ "preset": "presetExample" } // preset.json - preset에 등록한 이름으로 호출
	]
}
```

- preset 파라미터 기능
- preset에 (params:인덱스번호) 형식으로 파라미터 들어갈 자리 지정
- script.json에서 preset이름(파라미터1, 파라미터2) 형식으로 호출
- 파라미터 타입
    - string: (string:anystring)
    - number: (number:anynumber)
    - bool: (bool:trueorfalse)
- 예시

```json
// preset.json

{
  "variable": {
    "host": "http://localhost:8080"
  },
  "preset": {
	  "presetExample": [	
			{
				"uri": "(host)/api/login", // preset.json - variable의 host 사용
				"method": "POST",
				"body": {
					"username": "(params:0)", // presetExample 0인덱스 파라미터 사용
					"password": "(params:1)" // presetExample 1인덱스 파라미터 사용
				}
			},
			{
				"uri": "(host)/api/info", // preset.json - variable의 host 사용
				"method": "GET",
				"query": {
					"userId": "(params:2)" // presetExample 2인덱스 파라미터 사용
				}
			}
		]
  }
}
```

```json
// script.json
{
	"test": [	
		{ "preset": "presetExample(string:user1, string:password1, number:1)" } 
		// preset.json - preset에 등록한 이름으로 호출
		// (params:0) = "user1"
		// (params:1) = "password1"
		// (params:2) = 1
	]
}
```

### random 기능

- random string, hex, quantity, boolean, tag 생성
- 랜덤 string 생성
    - (random:string:20) → 바이트 크기 20의 랜덤 문자열 생성
    - (random:hex:10) → 바이트 크기 10의 랜덤 16진수 생성
    - (random:quantity:5) → 최대 크기 5의 랜덤 16진수 생성
    - (random:bool) → true 또는 false 생성
    - (random:tag) → ‘latest’, ‘earliest’, ‘pending’ 중 임의의 문자열 생성
- 예시

```json
// script.json
{
	"test": [	
	{
      "uri": "(host)/eth_call",
      "method": "POST",
      "body": {
        "jsonrpc": "2.0",
        "method": "eth_call",
        "params": [
					{
						"from": "(random:hex:20)",
						"to": "(random:hex:20)",
						"gas": "(random:quantity:100)",
						"gasPrice": "(random:quantity:100)",
						"value": "(random:quantity:10)",
						"data": "(random:string:30)",
					},
					"(random:tag)"
				],
        "id": 1
      }
	}
}
```
