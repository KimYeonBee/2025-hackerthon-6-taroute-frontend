import { instance } from "./instance";

/**
 * 장소를 서버에 저장하는 API
 * @param {string} googlePlaceId - 저장할 장소의 Google Place ID (문자열)
 * @returns {Promise<any>} - 서버 응답 데이터
 */
export const savePlaceToServer = async (googlePlaceId) => {
    if (!googlePlaceId || typeof googlePlaceId !== 'string') {
        throw new Error("googlePlaceId(string) is required");
    }

    try {
        const fullUrl = `${instance.defaults.baseURL}/places/save_place`;
        console.log('💾 savePlaceToServer API 호출:', {
            googlePlaceId: googlePlaceId,
            paramType: typeof googlePlaceId,
            baseURL: instance.defaults.baseURL,
            fullUrl: fullUrl,
            envBaseURL: import.meta.env.VITE_BASE_URL
        });
        
        const res = await instance.get("/places/save_place", {
            params: { place_id: googlePlaceId },
        });
        
        console.log('✅ savePlaceToServer API 성공 응답:', {
            status: res.status,
            data: res.data,
            place_name: res.data.data?.place_name,
            address: res.data.data?.address,
            place_photos: res.data.data?.place_photos,
            place_photos_length: res.data.data?.place_photos?.length,
            running_time: res.data.data?.running_time,
            running_time_length: res.data.data?.running_time?.length
        });
        
        return res.data;
    } catch (err) {
        console.error("❌ 장소 저장 실패:", {
            googlePlaceId: googlePlaceId,
            paramType: typeof googlePlaceId,
            message: err.message,
            status: err.response?.status,
            statusText: err.response?.statusText,
            data: err.response?.data,
            config: {
                url: err.config?.url,
                baseURL: err.config?.baseURL,
                fullURL: err.config?.baseURL + err.config?.url
            }
        });
        throw err;
    }
};

/**
 * 저장된 장소들을 가져오는 API
 * @returns {Promise<any>} - 저장된 장소 목록
 */
export const getSavedPlaces = async () => {
    try {
        const fullUrl = `${instance.defaults.baseURL}/places/get_saved_places`;
        console.log('🌐 getSavedPlaces API 호출:', {
            baseURL: instance.defaults.baseURL,
            fullUrl: fullUrl,
            envBaseURL: import.meta.env.VITE_BASE_URL
        });
        
        const res = await instance.get("/places/get_saved_places");
        console.log('📋 getSavedPlaces API 응답:', {
            status: res.status,
            data: res.data,
            dataType: typeof res.data,
            dataKeys: res.data ? Object.keys(res.data) : null,
            placesData: res.data.places,
            placesType: typeof res.data.places,
            placesIsArray: Array.isArray(res.data.places),
            placesKeys: res.data.places ? Object.keys(res.data.places) : null,
            placesValues: res.data.places ? Object.values(res.data.places) : null,
            fullResponse: JSON.stringify(res.data, null, 2)
        });
        
        // 서버 응답 전체 구조 확인
        console.log('🔍 서버 응답 원본:', res.data);
        console.log('🔍 서버 응답 전체 키:', res.data ? Object.keys(res.data) : null);
        
        // 다양한 응답 구조 시도
        let placesData = res.data.places || res.data.data || res.data.saved_places || res.data;
        
        console.log('🔍 추출된 placesData:', {
            placesData: placesData,
            type: typeof placesData,
            isArray: Array.isArray(placesData),
            keys: placesData && typeof placesData === 'object' ? Object.keys(placesData) : null
        });
        
        // places가 객체인 경우 배열로 변환
        if (placesData && typeof placesData === 'object' && !Array.isArray(placesData)) {
            const placesArray = Object.values(placesData);
            console.log('🔄 객체를 배열로 변환:', {
                originalObject: placesData,
                objectKeys: Object.keys(placesData),
                convertedArray: placesArray,
                arrayLength: placesArray.length
            });
            return placesArray;
        }
        
        // places가 배열인 경우 그대로 반환
        if (Array.isArray(placesData)) {
            console.log('✅ 이미 배열 형태:', placesData);
            return placesData;
        }
        
        // 데이터가 없으면 빈 배열 반환
        console.log('🔄 데이터가 없어서 빈 배열 반환');
        return [];
    } catch (err) {
        console.error("❌ 저장된 장소 조회 실패:", {
            message: err.message,
            status: err.response?.status,
            statusText: err.response?.statusText,
            data: err.response?.data,
            config: {
                url: err.config?.url,
                baseURL: err.config?.baseURL,
                fullURL: err.config?.baseURL + err.config?.url
            }
        });
        throw err;
    }
};