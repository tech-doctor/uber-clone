import  React,{useEffect, useCallback, useState} from 'react';
import  { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api';
import {useParams} from 'react-router-dom';
import { useAppSelector } from '../../Store/hooks';
import { GOOGLE_API_KEY } from '../const/api';
import { driversLocations, createKey } from './driversLocation';

import { mapStyle } from './mapStyle';


const Map:React.FC = () => {
  const center:{lat:number, lng:number} = useAppSelector(state => state.root.mapInitialPosition);
  const {origin, end} = useParams();
  
  //const pickup:string = useAppSelector(state => state.root.pickup.value);
  //const destination:string = useAppSelector(state => state.root.destination.value);

  const[map, setMap] = useState<any>(null)
  const [state, setState] = useState<any>({
   response: null,
   travelMode: 'DRIVING',
  })
  const [directionsResponse, setDirectionsResponse] = useState<any>(null);
  
  const [duration, setDuration] = useState<any>(null);

  //const [throwError, setThrowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("something went wrong");

 const isPickupDisable:boolean = useAppSelector(state => state.root.pickup.disabled);
 const isDestinationDisable:boolean = useAppSelector(state => state.root.destination.disabled);


  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${GOOGLE_API_KEY}`
  }) 



  const calculateRoute = useCallback(async() => {
    if(!isPickupDisable || !isDestinationDisable) {
      return;
    }
    try {
      const directionsService:any = new google.maps.DirectionsService();
      const response = await directionsService.route({
        origin:origin,
        destination: end,
        travelMode: state.travelMode,
        drivingOptions: {
          departureTime: new Date(),  
        }
      },
    //  {
    //     signal: signal
    //  }
      );
      setDirectionsResponse(response);
      setDuration(response?.routes[0].legs[0].duration.text);
      console.log(response.routes[0].legs[0].duration.text)
      console.log(duration);
      if(response.status !== 'OK') {
        throw new Error(response.status);
      } 
    }
    catch(error:any) {
      // setThrowError(true);
      // console.log('Error fetching directions', error);
      console.log('from map folder')
      if(error.code === 'NOT_FOUND') {
        setErrorMessage('Route not found. Select another  location route and try again');
      }else {
        setErrorMessage('Something went wrong. Please try again');
      }  
    }
  },[isDestinationDisable, isPickupDisable, duration, origin, end, state.travelMode]);

  useEffect(() => {
     //const abortController = new AbortController();
     //const signal = abortController.signal;
    let mounted = true;
    if (mounted) {
      calculateRoute();
    }
    return ()  => {
      //abortController.abort();
      mounted = false;
    }
  }, [ calculateRoute])
 

  if(!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <div className='bg-gray-400  h-[45vh] sm:h-screen w-full'>
      {/* {throwError && <div className='text-center text-red-500 fixed z-10 '>{errorMessage}</div>} */}
      <GoogleMap
          id='map'
          mapContainerStyle={{width: '100%', height: '100%'}}
          center={center}
          zoom={14}
          options = {{
            streetViewControl: false,
            fullscreenControl: false,
            mapTypeControl: false,
            styles: mapStyle,
          }}
          onLoad={(map) => {
            setMap(map);
          }}
         
          > 
          <Marker
          position={center}
          options  = {{
            icon: {
              url: 'https://i.pinimg.com/originals/b4/cf/d5/b4cfd5594462c22d1ca684541117e0a4.png',
              scaledSize: new google.maps.Size(27, 35), 
            },  
          }}
          />

          {driversLocations?.map((location) => (
            <Marker key={createKey(location)}  position={location}
              options = {{
                icon: {
                  url: 'https://github.com/EfficientProgramming01/uberClone/blob/master/assets/carMarker.png?raw=true',
                  scaledSize: new google.maps.Size(40, 18),
                }
              }}
            />
          ))}
      {directionsResponse !== null &&
      <div>
        <Marker 
        position={directionsResponse.routes[0].legs[0].start_location}
        options = {{
          icon: {
            url: 'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/45166/black-circle-emoji-clipart-xl.png',
            scaledSize: new google.maps.Size(20, 18),  
          }
        }}
        />

        <Marker
          position={directionsResponse.routes[0].legs[0].end_location}
          options = {{
            icon: {
              url: 'https://images.unsplash.com/photo-1580407836821-60af99465138?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
              scaledSize: new google.maps.Size(20, 18), 
            }
          }} 
        />

        <DirectionsRenderer
          directions={directionsResponse}
          options = {{
            polylineOptions: {
              strokeColor: 'black',
              strokeWeight: 3,
              strokeOpacity: 1,
              geodesic: true,
            },
            suppressMarkers: true, 
          }}      
        />
      </div>
        }
      </GoogleMap>
    </div> 
  )
}



export default React.memo(Map);
