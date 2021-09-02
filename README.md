# 1. React

- 프로젝트 생성 및 실행

```
$ npx create-react-app <APP NAME>
```

- 로컬 서버 실행

```
$ cd <APP NAME>
$ npm run start
```

- 프로젝트 빌드

```
$ npm run build
```

- 기타 라이브러리 설치

```
$ npm install react-router-dom
$ npm install react-icons
$ npm install react-loader-spinner
$ npm install styled-components
$ npm install query-string
```

---

# 2. Google Sheets API

- api key 생성

| 순서 | 내용                                                         |
| ---- | ------------------------------------------------------------ |
| 1    | [Google Cloud Console](https://console.cloud.google.com/)에서 프로젝트 생성 |
| 2    | 좌측 메뉴 중 [API 및 서비스] → [API 및 서비스 사용 설정]     |
| 2-1. | Google Sheet 검색 후 API 사용 설정                           |
| 3.   | 좌측 메뉴 중 [API 및 서비스] → [사용자 인증 정보]            |
| 3-1. | [사용자 인증 정보 만들기] → [서비스 계정]                    |
| 3-2. | 서비스 계정 정보 입력 및 엑세스 권한을 편집자로 설정         |
| 4.   | 서비스 계정 목록 중 [생성된 서비스 계정] → [키] → [키 추가] → [새 키 만들기] |
| 4-1. | Json 형식으로 키 생성 후 다운로드                            |

- Google Sheets 공유 설정

| 순서 | 내용                                                         |
| ---- | ------------------------------------------------------------ |
| 1.   | Google Sheets에서 새 문서 생성 후 접속                       |
| 2.   | 우측 상단의 [공유]                                           |
| 2-1. | 공개로 설정할 경우 [링크가 있는 모든 사용자]                 |
| 2-2. | 비공개로 설정할 경우 [사용자 및 그룹과 공유]에 서비스 계정 메일 주소 추가 |

- Sheet ID

| 순서 | 내용                                                         |
| ---- | ------------------------------------------------------------ |
| 1.   | 이전에 생성한 Google Sheets 접속                             |
| 2.   | URL 중 `/d/`뒤에 있는 부분이 Sheet ID이므로, 해당 부분을 복사 후 별도로 저장 |
| ex)  | `https://docs.google.com/spreadsheets/d/<Sheet ID>/edit#gid=0` |

- 라이브러리 설치

```
$ npm install google-spreadsheet
```

- 코드 작성

```javascript
import { GoogleSpreadsheet } from "google-spreadsheet";

const SHEET_ID = "<Sheet ID>";
const API_KEY = {
	type: " ... ",
	project_id: " ... ",
	private_key_id: " ... ",
	private_key: " ... ",
	client_email: " ... ",
	client_id: " ... ",
	auth_uri: " ... ",
    token_uri: " ... ",
    auth_provider_x509_cert_url: " ... ",
    client_x509_cert_url: " ... "
}
```

- GoogleSpreadsheet Promise 생성

```javascript
...

const sheetInit = () => 
	new Promise(async (resolve, reject) => {
        const doc = new GoogleSpreadsheet(SHEET_ID);
		await doc.useServiceAccountAuth(API_KEY);
		await doc.loadInfo()
        	.then(() => resolve(doc));
        	.catch(error => reject(error));
    })
```

- 특정 시트의 데이터 가져오기

```javascript
const getSheet = async() => {
	const doc = await sheetInit();
    const sheet = doc.sheetsByTitle["<Sheet name>"];
	await sheet.getRows()
}
```

- 특정 시트에 행 추가

```javascript
const appendRow = async(row) => {
	const doc = await sheetInit();
    const sheet = doc.sheetsByTitle["<Sheet name>"];
    await sheet.addRow(row)
}
```

- 특정 행 삭제

```javascript
const removeRow = async(index) => {
	const doc = await sheetInit();
    const sheet = doc.sheetsByTitle["<Sheet name>"];
    const rows = await sheet.getRows();
    await rows[index].delete();
}
```

- 특정 행의 데이터 수정

```javascript
const removeRow = async(index, row) => {
	const doc = await sheetInit();
    const sheet = doc.sheetsByTitle["<Sheet name>"];
    const rows = await sheet.getRows();
    rows[index] = row;
    await rows[index].save();
}
```

---

# 3. Github 배포

- 라이브러리 설치

```
$ npm install gh-pages
```

- package.json 수정

```json
{
    ...
    "scripts": {
    	...
        "deploy": "gh-pahes -d <Build directory> -b <branch>"
	},
    ...
    "homepage": <Repository URL>
}
```