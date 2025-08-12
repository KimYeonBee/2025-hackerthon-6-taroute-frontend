import PageNavbar from "../components/common/PageNavbar";
import styled from "styled-components";

const LocationContainer = styled.div`
    display: flex;
`;

const Location = () => {
    return (
        <LocationContainer>
            <PageNavbar title="위치 검색" />
        </LocationContainer>
    );
};

export default Location;