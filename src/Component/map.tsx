import  React,{useState} from 'react';
///import GoogleMapReact from "google-map-react";
import  { GoogleMap, LoadScript, Marker, DirectionsService } from '@react-google-maps/api';
import { useAppSelector } from '../Store/hooks';
import ScriptLoaded from '@react-google-maps/api/src/docs/ScriptLoaded';


const Map:React.FC = () => {
  const GOOGLE_API_KEY:any = process.env.REACT_APP_GOOGLE_API_KEY;
  const center = useAppSelector(state => state.root.mapInitialPosition);

  const containerStyle = {
    width: '100%',
    height: '100%'
  };
  
  return (
    <div className='bg-gray-400 h-[50vh] sm:h-screen w-full'>
       {/* <GoogleMapReact
        bootstrapURLKeys={{ key: `${GOOGLE_API_KEY}`}}
        defaultCenter={center}
        defaultZoom={13}
       >
         <AnyReactComponent
             lat={59.955413}
             lng={30.337844}
             text = 'marker'
         />
       </GoogleMapReact> */}
        <LoadScript googleMapsApiKey={`${GOOGLE_API_KEY}`}>
          <GoogleMap
            id='map'
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
          >
            <Marker
            position={center}
            />
          </GoogleMap>
        </LoadScript>
    </div> 
  )
}


export default Map;
