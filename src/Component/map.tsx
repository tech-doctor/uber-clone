import  React,{useState} from 'react';
import  { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';



const Map:React.FC = () => {
  const GOOGLE_API_KEY:any = process.env.REACT_APP_GOOGLE_API_KEY;
  

  const containerStyle = {
    width: '100%',
    height: '100%'
  };

  const center = {
    lat: -3.745,
    lng: -38.523
  }
  
  return (
    <div className='bg-gray-400 h-[50vh] sm:h-screen w-full'>
      {/* <LoadScript
       googleMapsApiKey={GOOGLE_API_KEY}
       libraries={['places']}
      > */}
      <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
        >
          
          <Marker 
          position={center}
          label={'A'}
          title={'Hello'}
          />
        </GoogleMap>
      {/* </LoadScript> */}
      </div> 
  )
}

export default Map;


