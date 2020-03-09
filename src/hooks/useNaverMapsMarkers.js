import { useCallback, useState } from "react";

const useNaverMapsMarkers = () => {
    const [markers, setMarkers] = useState([]);

    const addMarker = (map, data) => {
        if (!window.naver && !window.naver.maps) {
            return;
        }

        const marker = new window.naver.maps.Marker({
            map: map,
            position: {
                lat: data.lat,
                lng: data.lng
            }
        });

        const infoWindowHTML = `<div style="font-size: small; padding: 15px;"><h5>${data.name}</h5><p>${data.addr}<br />남은 수량: ${data.remain_cnt}</p></div>`;

        const infoWindow = new window.naver.maps.InfoWindow({
            content: infoWindowHTML
        });

        // mouseover event unsupported in touch devices (mobile)
        window.naver.maps.Event.addListener(marker, "mouseover", function(e) {
            infoWindow.open(map, marker);
        });

        window.naver.maps.Event.addListener(marker, "click", function(e) {
            infoWindow.open(map, marker);
        });

        // TODO: fix the direct mutation to the state
        markers.push(marker);
    };

    const resetMarker = useCallback(() => {
        markers.forEach((marker) => {
            marker.setMap(null);
        });
        setMarkers([]);
    });

    return {
        addMarker,
        resetMarker
    };
};

export default useNaverMapsMarkers;