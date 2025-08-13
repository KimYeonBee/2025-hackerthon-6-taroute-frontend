import PageNavbar from "../components/common/PageNavbar";
import styled from "styled-components";
import Map from "../components/Location/Map";

const LocationContainer = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
`;

const Location = () => {
    return (
        <LocationContainer>
            <PageNavbar title="위치 검색" />
            <Map keyword="이태원 맛집" />
        </LocationContainer>
    );
};

export default Location;