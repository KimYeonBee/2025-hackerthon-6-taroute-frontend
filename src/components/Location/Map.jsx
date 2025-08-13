/* src/components/Location/Map.jsx */
import { useEffect, useRef, useState } from "react";

const KAKAO_APP_KEY = import.meta.env.VITE_KAKAO_MAP_APP_KEY;

export default function Map({ keyword = "이태원 맛집" }) {
    const mapEl = useRef(null);
    const mapRef = useRef(null);
    const infoRef = useRef(null);
    const markersRef = useRef([]);
    const [sdkLoaded, setSdkLoaded] = useState(!!(window.kakao && window.kakao.maps));

    // 0) Kakao SDK 동적 로드 (env의 APP KEY 사용)
    useEffect(() => {
        if (sdkLoaded) return;

        if (!KAKAO_APP_KEY) {
            console.error("[KakaoMap] VITE_KAKAO_MAP_APP_KEY 가 .env 에 설정되어 있지 않습니다.");
            return;
        }

        const existing = document.getElementById("kakao-map-sdk");
        if (existing) {
            // 이미 스크립트가 있으면 로드 완료 여부만 확인
            if (window.kakao?.maps) setSdkLoaded(true);
            return;
        }

        const script = document.createElement("script");
        script.id = "kakao-map-sdk";
        script.async = true;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false&libraries=services`;
        script.onload = () => {
            // autoload=false 이므로 load 콜백에서 초기화 가능
            window.kakao.maps.load(() => setSdkLoaded(true));
        };
        document.head.appendChild(script);
    }, [sdkLoaded]);

    // 1) 지도 1회 초기화
    useEffect(() => {
        if (!sdkLoaded || !mapEl.current || mapRef.current) return;
        const { kakao } = window;

        const center = new kakao.maps.LatLng(37.566826, 126.9786567);
        const map = new kakao.maps.Map(mapEl.current, { center, level: 3 });
        mapRef.current = map;
        infoRef.current = new kakao.maps.InfoWindow({ zIndex: 1 });

        return () => {
            // 언마운트 시 마커 정리
            markersRef.current.forEach((m) => m.setMap(null));
            markersRef.current = [];
            mapRef.current = null;
            infoRef.current = null;
        };
    }, [sdkLoaded]);

    // 2) 키워드 검색
    useEffect(() => {
        const { kakao } = window;
        const map = mapRef.current;
        if (!sdkLoaded || !kakao?.maps?.services || !map || !keyword) return;

        const ps = new kakao.maps.services.Places();
        ps.keywordSearch(
            keyword,
            (data, status) => {
                if (status !== kakao.maps.services.Status.OK) return;

                // 이전 마커 제거
                markersRef.current.forEach((m) => m.setMap(null));
                markersRef.current = [];

                const bounds = new kakao.maps.LatLngBounds();

                data.forEach((place) => {
                    const pos = new kakao.maps.LatLng(Number(place.y), Number(place.x));
                    const marker = new kakao.maps.Marker({ position: pos, map });
                    markersRef.current.push(marker);
                    bounds.extend(pos);

                    kakao.maps.event.addListener(marker, "click", () => {
                        infoRef.current.setContent(
                            `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`
                        );
                        infoRef.current.open(map, marker);
                    });
                });

                if (!bounds.isEmpty()) map.setBounds(bounds);
            },
            // 보이는 영역 우선 검색 옵션(필요 없으면 제거 가능)
            { useMapBounds: true }
        );
    }, [sdkLoaded, keyword]);

    // 부모가 height를 지정해줘야 보입니다
    return <div ref={mapEl} style={{ width: "100%", height: "100%" }} />;
}