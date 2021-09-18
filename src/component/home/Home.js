const Home = () => {

    return (
        <div className="home">
            <h1>테스트 계정</h1>
            <ul>
                <li>아이디 : test@gmail.com</li>
                <li>비밀번호 : testtest!@#</li>
            </ul>
            <h1>회원가입 기능</h1>
            <ul>
                <li>이메일 주소, 이름, 비밀번호 입력</li>
                <li>이메일, 비밀번호 정규식 적용</li>
                <li>이메일 중복성 검사</li>
            </ul>
            <h1>로그인 화면</h1>
            <ul>
                <li>이메일 주소, 비밀번호 입력</li>
                <li>이메일, 비밀번호 정규식 적용</li>
                <li>이메일 유효성 검사</li>
                <li>로컬저장5소에 로그인 정보 저장</li>
                <li>페이지를 새로고침하여도 로그인 상태 유지</li>
            </ul>
            <h1>사이드바</h1>
            <ul>
                <li>새 그룹 제목 입력</li>
                <li>새 그룹 페이지 링크 생성</li>
            </ul>
            <h1>그룹 페이지 화면</h1>
            <ul>
                <li>새 그룹 제목 입력</li>
                <li>새 그룹 페이지 링크 생성</li>
            </ul>
            <h1>항목 완료 상태</h1>
            <ul>
                <li>새 그룹 제목 입력</li>
                <li>새 그룹 페이지 링크 생성</li>
            </ul>
        </div>
    )
}

export default Home;