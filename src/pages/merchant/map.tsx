import React, { useEffect } from 'react';
import { Map, Marker, NavigationControl, ZoomControl, MapApiLoaderHOC, CityListControl } from 'react-bmapgl';
const MapComponent = (param: any) => {
    const [latLng, setLatLng] = React.useState<API.Latlng>({lat:39.928216,lng:116.402544});
    useEffect(() => {
        setLatLng({
            lat:param.lat,
            lng:param.lng,
        })
    }, [param]);

    return <Map
        center={{ lng: latLng.lng, lat: latLng.lat }}
        zoom="15"
        enableScrollWheelZoom={true}
        onClick={(e)=>{
            setLatLng({
                lat:e.latlng.lat,
                lng:e.latlng.lng,
            })
            param.retLatLng({
                lat:e.latlng.lat,
                lng:e.latlng.lng,
            })
        }}
        >
        <Marker 
        position={{ lng:latLng.lng, lat: latLng.lat }}
        autoViewport
         />
        <CityListControl />
        <ZoomControl />
        <NavigationControl />
    </Map>;
};

export default MapApiLoaderHOC({ ak: '24kteO5V9N5a2iPRnYGEaheTfjOOwTT1' })(MapComponent);
