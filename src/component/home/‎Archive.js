const posts = [
    {
        date: "2019-09-01",
        contents: [
            "문제점 인식 및 해결 방안 모색",
            "졸업 프로젝트로 선정",
            "앱 기능 및 디자인 구상"
        ]
    },
    {
        date: "2019-09-02",
        contents: [
            "데이터베이스 선정 : Firebase",
            "Firebase 사용 방법 검색",
            "테스트 코드 작성 : Promise 객체 사용"
        ]
    },
    {
        date: "2019-09-03",
        contents: [
            "개발 언어 선택 : Javascript",
            "프레임워크 선택 : React.js",
            "컴포넌트 구성 설계",
            "Context 적용 방법 검토"
        ]
    },
    {
        date: "2019-09-04",
        contents: [
            "프로젝트 개요서 작성",
            "Firebase Realtime Database 구조 설계",
            "테스트 코드 작성 : 프로토 타입 버전",
        ]
    },
    {
        date: "2019-09-05",
        contents: [
            "프로젝트 개요서 수정",
            "Firebase 문제점 파악 : 일정 트래픽 초과 시 과금 발생",
            "Google Sheets API 사용 방안 채택",
            "테스트 코드 작성 : 프로토 타입 버전",
        ]
    },
    {
        date: "2019-09-06",
        contents: [
            "프로젝트 개요서 최종 검토 후 제출",
            "Google Sheets 구조 설계"
        ]
    },
    {
        date: "2019-09-09",
        contents: [
            "임동균 교수님 승인 완료 후 본 개발 착수",
            "Google Sheets API 코드 작성",
            "로그인, 회원가입 기능 개발",
            "crypto 라이브러리 활용 : 비밀번호 단방향 암호화 적용"
        ]
    },
    {
        date: "2019-09-10",
        contents: [
            "로그인, 회원가입 시 예외 처리",
            "비밀번호 재설정 기능을 위한 API 검색",
            "해당 기능은 ",
            "crypto 라이브러리 활용 : 비밀번호 단방향 암호화 적용"
        ]
    },
];

// 개발일지 작성

const Archive = () => {
    return (
        <div className="about">
            <h1>개발일지</h1>
            {
                posts.map((post, postIndex) => (
                    <div key={postIndex} className="post">
                        <div className="post-header">
                            <p>{post.date}</p>
                        </div>
                        <div className="post-body">
                            <ul>                                {
                                post.contents.map((content, contentIndex) =>
                                    <li key={contentIndex}>{content}</li>
                                )
                            }
                            </ul>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Archive;