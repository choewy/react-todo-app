import React from "react";
import styled from "styled-components";
import './Home.css';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 768px;
    margin: 0 auto;
    margin-top: 15px;
    margin-bottom: 30px;

    background: white;
    border-radius: 16px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

    @media (max-width: 768px) {
        width: 100%;
        padding: 20px 20px;
        font-size: 14px;
      }
`

const HeaderWrapper = styled.div`
    padding-top: 24px;
    padding-left: 32px;
    padding-right: 32px;
    padding-bottom: 24px;
    border-bottom: 1px solid #e9ecef;
    width: 100%;

    h1 {
        margin: 0;
        font-size: 36px;
        text-align: center;
        color: #343a40;
    }
    
    .day {
        margin-top: 4px;
        color: #868e96;
        font-size: 21px;
    }

    .tasks-left {
        color: #20c997;
        font-size: 18px;
        margin-top: 40px;
        font-weight: bold;
    }
`

const BodyWrapper = styled.div`
    width: 100%;
    border-radius: 16px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
    background: white;
    margin: 0 auto;
    padding: 20px 32px;
    padding-bottom: 48px;
    margin-top: 15px;
    margin-bottom: 30px;
`

const contents = `
<h1>1. React</h1>
<ul>
<li>프로젝트 생성 및 실행</li>
</ul>
<pre><code>$ npx create-react-app &lt;APP NAME&gt;
</code></pre>
<ul>
<li>로컬 서버 실행</li>
</ul>
<pre><code>$ cd &lt;APP NAME&gt;
$ npm run start
</code></pre>
<ul>
<li>프로젝트 빌드</li>
</ul>
<pre><code>$ npm run build
</code></pre>
<ul>
<li>기타 라이브러리 설치</li>
</ul>
<pre><code>$ npm install react-router-dom
$ npm install react-icons
$ npm install react-loader-spinner
$ npm install styled-components
$ npm install query-string
</code></pre>
<hr>
<h1>2. Google Sheets API</h1>
<ul>
<li>api key 생성</li>
</ul>
<figure><table>
<thead>
<tr><th>순서</th><th>내용</th></tr></thead>
<tbody><tr><td>1</td><td><a href="https://console.cloud.google.com/">Google Cloud Console</a>에서 프로젝트 생성</td></tr><tr><td>2</td><td>좌측 메뉴 중 [API 및 서비스] → [API 및 서비스 사용 설정]</td></tr><tr><td>2-1.</td><td>Google Sheet 검색 후 API 사용 설정</td></tr><tr><td>3.</td><td>좌측 메뉴 중 [API 및 서비스] → [사용자 인증 정보]</td></tr><tr><td>3-1.</td><td>[사용자 인증 정보 만들기] → [서비스 계정]</td></tr><tr><td>3-2.</td><td>서비스 계정 정보 입력 및 엑세스 권한을 편집자로 설정</td></tr><tr><td>4.</td><td>서비스 계정 목록 중 [생성된 서비스 계정] → [키] → [키 추가] → [새 키 만들기]</td></tr><tr><td>4-1.</td><td>Json 형식으로 키 생성 후 다운로드</td></tr></tbody>
</table></figure>
<ul>
<li>Google Sheets 공유 설정</li>
</ul>
<figure><table>
<thead>
<tr><th>순서</th><th>내용</th></tr></thead>
<tbody><tr><td>1.</td><td>Google Sheets에서 새 문서 생성 후 접속</td></tr><tr><td>2.</td><td>우측 상단의 [공유]</td></tr><tr><td>2-1.</td><td>공개로 설정할 경우 [링크가 있는 모든 사용자]</td></tr><tr><td>2-2.</td><td>비공개로 설정할 경우 [사용자 및 그룹과 공유]에 서비스 계정 메일 주소 추가</td></tr></tbody>
</table></figure>
<ul>
<li>Sheet ID</li>
</ul>
<figure><table>
<thead>
<tr><th>순서</th><th>내용</th></tr></thead>
<tbody><tr><td>1.</td><td>이전에 생성한 Google Sheets 접속</td></tr><tr><td>2.</td><td>URL 중 <code>/d/</code>뒤에 있는 부분이 Sheet ID이므로, 해당 부분을 복사 후 별도로 저장</td></tr></tbody>
</table></figure>
<ul>
<li>라이브러리 설치</li>
</ul>
<pre><code>$ npm install google-spreadsheet
</code></pre>
<ul>
<li>코드 작성</li>
</ul>
<pre><code class="language-javascript" lang="javascript">import { GoogleSpreadsheet } from "google-spreadsheet";
const SHEET_ID = "&lt;Sheet ID&gt;";
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
</code></pre>
<ul>
<li>GoogleSpreadsheet Promise 생성</li>
</ul>
<pre><code class="language-javascript" lang="javascript">...
const sheetInit = () =&gt; 
    new Promise(async (resolve, reject) =&gt; {
        const doc = new GoogleSpreadsheet(SHEET_ID);
        await doc.useServiceAccountAuth(API_KEY);
        await doc.loadInfo()
            .then(() =&gt; resolve(doc));
            .catch(error =&gt; reject(error));
    })
</code></pre>
<ul>
<li>특정 시트의 데이터 가져오기</li>
</ul>
<pre><code class="language-javascript" lang="javascript">const getSheet = async() =&gt; {
    const doc = await sheetInit();
    const sheet = doc.sheetsByTitle["&lt;Sheet name&gt;"];
    await sheet.getRows()
}
</code></pre>
<ul>
<li>특정 시트에 행 추가</li>
</ul>
<pre><code class="language-javascript" lang="javascript">const appendRow = async(row) =&gt; {
    const doc = await sheetInit();
    const sheet = doc.sheetsByTitle["&lt;Sheet name&gt;"];
    await sheet.addRow(row)
}
</code></pre>
<ul>
<li>특정 행 삭제</li>
</ul>
<pre><code class="language-javascript" lang="javascript">const removeRow = async(index) =&gt; {
    const doc = await sheetInit();
    const sheet = doc.sheetsByTitle["&lt;Sheet name&gt;"];
    const rows = await sheet.getRows();
    await rows[index].delete();
}
</code></pre>
<ul>
<li>특정 행의 데이터 수정</li>
</ul>
<pre><code class="language-javascript" lang="javascript">const removeRow = async(index, row) =&gt; {
    const doc = await sheetInit();
    const sheet = doc.sheetsByTitle["&lt;Sheet name&gt;"];
    const rows = await sheet.getRows();
    rows[index] = row;
    await rows[index].save();
}
</code></pre>
<hr>
<h1>3. Github 배포</h1>
<ul>
<li>라이브러리 설치</li>
</ul>
<pre><code>$ npm install gh-pages
</code></pre>
<ul>
<li>package.json 수정</li>
</ul>
<pre><code class="language-json" lang="json">{
    ...
    "scripts": {
        ...
        "deploy": "gh-pahes -d &lt;Build directory&gt; -b &lt;branch&gt;"
    },
    ...
    "homepage": &lt;Repository URL&gt;
}
</code></pre>
`

const Home = () => {
    return (
        <Wrapper>
            <HeaderWrapper>
                <h1>README</h1>
            </HeaderWrapper>
            <BodyWrapper>
                <div className="home" dangerouslySetInnerHTML={{ __html: contents }} />
            </BodyWrapper>
        </Wrapper>
    )
}

export default Home;