const Home = () => {

    return (
        <div className="home">
            <div>
                <h1>회원가입 화면</h1>
                <img alt="signup" src="https://github.com/choewy/react-todo-app/blob/hycu/img/1.png?raw=true"></img>
                <h2>기능</h2>
                <ul>
                    <li>이메일 주소, 이름, 비밀번호 입력</li>
                    <li>이메일, 비밀번호 정규식 적용</li>
                    <li>이메일 중복성 검사</li>
                </ul>
            </div>
            <div>
                <h1>로그인 화면</h1>
                <img alt="login" src="https://github.com/choewy/react-todo-app/blob/hycu/img/2.png?raw=true"></img>
                <h2>기능</h2>
                <ul>
                    <li>이메일 주소, 비밀번호 입력</li>
                    <li>이메일, 비밀번호 정규식 적용</li>
                    <li>이메일 유효성 검사</li>
                    <li>로컬저장소에 로그인 정보 저장</li>
                    <li>페이지를 새로고침하여도 로그인 상태 유지</li>
                </ul>
            </div>
            <div>
                <img alt="test-todo" src="https://github.com/choewy/react-todo-app/blob/hycu/img/3.png?raw=true"></img>
            </div>
            <div>
                <img alt="append-todo" src="https://github.com/choewy/react-todo-app/blob/hycu/img/4.png?raw=true"></img>
            </div>
            <div>
                <img alt="done-todo" src="https://github.com/choewy/react-todo-app/blob/hycu/img/5.png?raw=true"></img>
            </div>
        </div>
    )
}

export default Home;