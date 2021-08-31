import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: 768px;
    height: 768px;

    position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
    background: white;
    border-radius: 16px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

    margin: 0 auto;

    margin-top: 15px;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
`

const FindPassword = () => {
    return (
        <Wrapper>
            (기능 구현 중 ... 🤔)
        </Wrapper>
    )
}

export default FindPassword;