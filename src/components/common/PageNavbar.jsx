import styled from "styled-components";
import gobackIcon from '../../assets/icons/goback.svg';


const NavbarWrapper = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 0 14px;
    background: #fff;
    border-bottom: 1px solid #eee;
    margin-top: 5px;
`;

const Title = styled.h3`
    font-size: 17px;
    font-weight: 500;
`;

export default function PageNavbar({ title = "" }) {
    return (
        <NavbarWrapper>
            <img src={gobackIcon} alt="goback" />
            <Title>{title}</Title>
            <p>ㅤ</p> {/* 여기에 공백글자 넣어놨는데 장바구니페이지에선 '삭제'버튼으로 바꾸면됩니다 */}
        </NavbarWrapper>
    );
};
