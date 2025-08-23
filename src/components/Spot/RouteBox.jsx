import styled from "styled-components";
import { useState, useEffect, useCallback, useMemo } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { faTrainSubway } from "@fortawesome/free-solid-svg-icons";
import { faPersonWalking } from "@fortawesome/free-solid-svg-icons";
import { useSavedPlaceContext } from '../../contexts/SavedPlaceContext';
import { getRouteInfo } from '../../apis/routeApi';
import goRight from "../../assets/icons/spot/goRight.svg";
import goLeft from "../../assets/icons/spot/goLeft.svg";


const Container = styled.div`
    width: 343px;
    height: 122px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 95px;
    position: absolute;
`;

const NavigationButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: ${props => props.disabled ? 0.3 : 1};
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    
    &.left {
        left: -12px;
    }
    
    &.right {
        right: -12px;
    }
    
    img {
        width: 20px;
        height: 20px;
    }
    
    &:hover {
        opacity: ${props => props.disabled ? 0.3 : 0.7};
    }
`;

const RouteBoxContainer = styled.div`
    width: 343px;
    height: 122px;
    display: flex;
    border-radius: 10px;
    border: 1px solid #8A8A8A;
    background-color: white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
    flex-direction: column;
    padding-left: 16px;
`;

const Header = styled.div`
    display: flex;
    margin-top: 12px;
    gap: 20px;
    align-items: center;
    flex-wrap: nowrap;
`;

const OriginDesination = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 15px;
    color: #2A2A2A;
    font-weight: 700;
    flex-shrink: 0;
    white-space: nowrap;
`;

const RoutePoint = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
    white-space: nowrap;
`;

const IndexNumber = styled.div`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${props => {
        // 인덱스별 색상 지정 (1~10번)
        const colors = [
            '#e06d6d', // 1번
            '#e09b6d', // 2번
            '#d9e06d', // 3번
            '#aee06d', // 4번
            '#6de09a', // 5번
            '#6ddfe0', // 6번
            '#6d95e0', // 7번
            '#9a6de0', // 8번
            '#e06ddf', // 9번
            '#e06d95'  // 10번
        ];

        return colors[(props.$index - 1) % 10] || '#25213B';
    }};
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    font-weight: 600;
    flex-shrink: 0;
`;

const Origin = styled.span`
    font-size: 15px;
    color: #2A2A2A;
    font-weight: 700;
    font-family: MaruBuri;
`;

const Destination = styled.span`
    font-size: 15px;
    color: #2A2A2A;
    font-weight: 700;
    font-family: MaruBuri;
`;

const SelectTransportation = styled.div`
    display: flex;
    justify-content: space-around;
    height: 23px;
    width: 146px;
    border: 0.5px solid #8A8A8A;
    border-radius: 15px;
    background: white;
    align-items: center;
    font-size: 13px;
`;

const TransportIcon = styled(FontAwesomeIcon)`
    cursor: pointer;
    color: ${props => props.selected ? '#2A2A2A' : '#8A8A8A'};
    transition: color 0.2s ease;
    
    &:hover {
        color: ${props => props.selected ? '#2A2A2A' : '#666'};
    }
`;


const RouteInfo = styled.div`
    margin-top: 4px;
    margin-left: 4px;
`;

const Title = styled.div`
    font-size: 15px;
    font-weight: 600;
    color: #8A8A8A;
    margin: 8px 0 2px 0;
    line-height: 1.2;
`;

const InfoBox = styled.div`
    display: flex;
    font-size: 18px;
    font-weight: 600;
    color: #2A2A2A;
    align-items: center;
    margin-top: 0;
    line-height: 1.2;
    p{
        color: #8A8A8A;
        font-weight: 300;
        margin: 0;
    }
    gap: 20px;
`;

const Time = styled.div`
    display: flex;
    align-items: baseline;
    p{
        font-size:28px;
        font-weight: 600;
        color: #2a2a2a;
        margin: 0;
    }
`;

const Distance = styled.div`
    display: flex;
`;

const Steps = styled.div`
    display: flex;
`;

const RouteBox = ({ onRouteChange, routeInfo, onTransportChange }) => {
    const [selectedTransport, setSelectedTransport] = useState('walk');
    const [currentRouteIndex, setCurrentRouteIndex] = useState(0);
    const [routeData, setRouteData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { savedPlaces } = useSavedPlaceContext();

    // 활성화된 장소들만 필터링
    const enabledPlaces = useMemo(() => {
        return savedPlaces.filter(place => place.isEnabled !== false);
    }, [savedPlaces]);

    // 루트 쌍 생성 (1->2, 2->3, 3->4 등)
    const routes = useMemo(() => {
        const routeArray = [];
        for (let i = 0; i < enabledPlaces.length - 1; i++) {
            routeArray.push({
                origin: enabledPlaces[i],
                destination: enabledPlaces[i + 1],
                originIndex: i + 1,
                destinationIndex: i + 2
            });
        }
        return routeArray;
    }, [enabledPlaces]);

    // 현재 보여줄 루트
    const currentRoute = useMemo(() => {
        return routes[currentRouteIndex] || null;
    }, [routes, currentRouteIndex]);

    // 루트 변경시 부모 컴포넌트에 알림
    useEffect(() => {
        if (onRouteChange && currentRoute) {
            onRouteChange(currentRoute);
        }
    }, [currentRoute]); // onRouteChange 제거

    // API 호출 함수
    const fetchRouteData = useCallback(async (route, transport) => {
        if (!route || !route.origin || !route.destination) {
            console.log('Invalid route data:', route);
            return;
        }

        console.log('🚀 fetchRouteData 호출:', {
            route: route,
            transport: transport,
            origin: route.origin,
            destination: route.destination,
            originKeys: route.origin ? Object.keys(route.origin) : null,
            destinationKeys: route.destination ? Object.keys(route.destination) : null
        });

        // 좌표 정보 확인 - location 객체 안에 있는 좌표 정보 추출
        const originCoords = {
            longitude: route.origin.location?.longitude || route.origin.longitude || route.origin.x || route.origin.lng || route.origin.long,
            latitude: route.origin.location?.latitude || route.origin.latitude || route.origin.y || route.origin.lat,
        };
        
        const destinationCoords = {
            longitude: route.destination.location?.longitude || route.destination.longitude || route.destination.x || route.destination.lng || route.destination.long,
            latitude: route.destination.location?.latitude || route.destination.latitude || route.destination.y || route.destination.lat,
        };

        console.log('📍 추출된 좌표:', {
            originCoords: originCoords,
            destinationCoords: destinationCoords,
            originValidation: {
                hasLongitude: !!originCoords.longitude,
                hasLatitude: !!originCoords.latitude,
                longitudeValue: originCoords.longitude,
                latitudeValue: originCoords.latitude,
                longitudeType: typeof originCoords.longitude,
                latitudeType: typeof originCoords.latitude
            },
            destinationValidation: {
                hasLongitude: !!destinationCoords.longitude,
                hasLatitude: !!destinationCoords.latitude,
                longitudeValue: destinationCoords.longitude,
                latitudeValue: destinationCoords.latitude,
                longitudeType: typeof destinationCoords.longitude,
                latitudeType: typeof destinationCoords.latitude
            }
        });

        // 좌표가 유효한지 확인
        if (!originCoords.longitude || !originCoords.latitude || 
            !destinationCoords.longitude || !destinationCoords.latitude) {
            console.log('❌ Invalid coordinates:', { originCoords, destinationCoords });
            return;
        }

        const apiParams = {
            origin_x: originCoords.longitude,
            origin_y: originCoords.latitude,
            destination_x: destinationCoords.longitude,
            destination_y: destinationCoords.latitude,
            transport: transport
        };

        // walk일 때는 장소 이름도 추가
        if (transport === 'walk') {
            const startName = route.origin.name || route.origin.place_name || route.origin.title || '출발지';
            const endName = route.destination.name || route.destination.place_name || route.destination.title || '도착지';
            
            apiParams.startName = startName;
            apiParams.endName = endName;
            
            console.log('🏷️ 장소 이름 확인:', {
                origin: route.origin,
                destination: route.destination,
                startName: startName,
                endName: endName
            });
        }

        console.log('📡 API 호출 파라미터:', apiParams);

        setIsLoading(true);
        try {
            const data = await getRouteInfo(apiParams);
            console.log('✅ API 성공 응답:', {
                rawData: data,
                dataType: typeof data,
                dataKeys: data ? Object.keys(data) : null,
                hasCarRoutes: !!data?.car_routes,
                carRoutes: data?.car_routes,
                carRoutesType: typeof data?.car_routes,
                carRoutesIsArray: Array.isArray(data?.car_routes),
                firstCarRoute: data?.car_routes?.[0],
                firstCarRouteKeys: data?.car_routes?.[0] ? Object.keys(data?.car_routes?.[0]) : null
            });
            setRouteData(data);
        } catch (error) {
            console.error('❌ API 실패:', {
                error: error,
                message: error.message,
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                config: error.config,
                apiParams: apiParams
            });
            
            // 임시로 목업 데이터 비활성화 - 실제 에러 확인용
            setRouteData(null);
            
            // walk 모드일 때는 목업 데이터 제공 (주석 처리)
            // if (transport === 'walk') {
            //     console.log('🚶 도보 모드 목업 데이터 제공');
            //     setRouteData({
            //         data: {
            //             walk_distance: "1.2km",
            //             walk_time: "15분", 
            //             walk_step: "1,680걸음"
            //         }
            //     });
            // } else {
            //     setRouteData(null);
            // }
        } finally {
            console.log('🔄 로딩 상태 해제');
            setIsLoading(false);
        }
    }, []);

    // 교통수단 변경 시 API 호출
    const handleTransportChange = async (transport) => {
        console.log('🚗 handleTransportChange 호출:', {
            transport: transport,
            currentRoute: currentRoute,
            가능한경로개수: routes.length
        });
        
        setSelectedTransport(transport);
        
        // 상위 컴포넌트에 교통수단 변경 알림
        if (onTransportChange) {
            onTransportChange(transport);
        }
        
        // car 또는 walk 선택 시 API 호출
        if ((transport === 'car' || transport === 'walk') && currentRoute) {
            await fetchRouteData(currentRoute, transport);
        } else {
            setRouteData(null);
        }
    };

    // 루트 변경 시 선택된 교통수단에 따라 API 호출
    useEffect(() => {
        console.log('🔄 useEffect 호출:', {
            selectedTransport: selectedTransport,
            currentRouteIndex: currentRouteIndex,
            shouldCallAPI: (selectedTransport === 'car' || selectedTransport === 'walk') && currentRoute
        });
        
        if ((selectedTransport === 'car' || selectedTransport === 'walk') && currentRoute) {
            fetchRouteData(currentRoute, selectedTransport);
        } else {
            setRouteData(null);
        }
    }, [currentRouteIndex, selectedTransport, currentRoute, fetchRouteData]);

    const goToPreviousRoute = () => {
        setCurrentRouteIndex(prev => Math.max(0, prev - 1));
    };

    const goToNextRoute = () => {
        setCurrentRouteIndex(prev => Math.min(routes.length - 1, prev + 1));
    };


    // 루트가 없으면 기본 메시지 표시
    if (routes.length === 0) {
        return (
            <Container>
                <RouteBoxContainer>
                    <Header>
                        <OriginDesination>
                            <Origin>활성화된 장소가 부족합니다</Origin>
                        </OriginDesination>
                    </Header>
                    <RouteInfo>
                        <Title>
                            최소 2개 이상의 장소를 활성화해주세요
                        </Title>
                    </RouteInfo>
                </RouteBoxContainer>
            </Container>
        );
    }

    return (
        <Container>
            <NavigationButton
                className="left"
                onClick={goToPreviousRoute}
                disabled={currentRouteIndex === 0}
            >
                <img src={goLeft} alt="이전 루트" />
            </NavigationButton>

            <RouteBoxContainer>
                <Header>
                    <OriginDesination>
                        <RoutePoint>
                            <Origin>출발</Origin>
                            <IndexNumber $index={currentRoute.originIndex}>
                                {currentRoute.originIndex}
                            </IndexNumber>
                        </RoutePoint>
                        <RoutePoint>
                            <Destination>도착</Destination>
                            <IndexNumber $index={currentRoute.destinationIndex}>
                                {currentRoute.destinationIndex}
                            </IndexNumber>
                        </RoutePoint>
                    </OriginDesination>
                    <SelectTransportation>
                        <TransportIcon
                            icon={faPersonWalking}
                            selected={selectedTransport === 'walk'}
                            onClick={() => handleTransportChange('walk')}
                        />
                        <TransportIcon
                            icon={faTrainSubway}
                            selected={selectedTransport === 'transit'}
                            onClick={() => handleTransportChange('transit')}
                        />
                        <TransportIcon
                            icon={faCar}
                            selected={selectedTransport === 'car'}
                            onClick={() => handleTransportChange('car')}
                        />
                    </SelectTransportation>
                </Header>
                <RouteInfo>
                    <Title>
                        소요시간
                    </Title>
                    <InfoBox>
                        {isLoading ? (
                            <div>로딩 중...</div>
                        ) : selectedTransport === 'walk' && routeData?.data ? (
                            <>
                                <Time><p>{routeData.data.walk_time?.replace('분', '') || '12'}</p>분</Time>
                                <p style={{fontWeight:'500'}}>|</p>
                                <Distance>{routeData.data.walk_distance || '1.1km'}</Distance>
                                <p style={{fontWeight:'500'}}>|</p>
                                <Steps>{routeData.data.walk_step || '3,600걸음'}</Steps>
                            </>
                        ) : selectedTransport === 'car' && routeInfo ? (
                            <>
                                <Time><p>{routeInfo.duration}</p>분</Time>
                                <p style={{fontWeight:'500'}}>|</p>
                                <Distance>{routeInfo.distance}km</Distance>
                                <p style={{fontWeight:'500'}}>|</p>
                                <Steps>{routeInfo.taxiFare?.toLocaleString()}원</Steps>
                            </>
                        ) : selectedTransport === 'car' && routeData?.car_routes?.[0] ? (
                            <>
                                <Time><p>{routeData.car_routes[0].car_duration.replace('분', '')}</p>분</Time>
                                <p style={{fontWeight:'500'}}>|</p>
                                <Distance>{routeData.car_routes[0].distance}</Distance>
                                <p style={{fontWeight:'500'}}>|</p>
                                <Steps>{routeData.car_routes[0].taxi_fare}</Steps>
                            </>
                        ) : (
                            <>
                                <Time><p>12</p>분</Time>
                                <p style={{fontWeight:'500'}}>|</p>
                                <Distance>1.1km</Distance>
                                <p style={{fontWeight:'500'}}>|</p>
                                <Steps>3,600걸음</Steps>
                            </>
                        )}
                    </InfoBox>
                </RouteInfo>
            </RouteBoxContainer>

            <NavigationButton
                className="right"
                onClick={goToNextRoute}
                disabled={currentRouteIndex === routes.length - 1}
            >
                <img src={goRight} alt="다음 루트" />
            </NavigationButton>
        </Container>
    );
};

export default RouteBox;