import  React,{useEffect, useCallback, useState} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import  { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer} from '@react-google-maps/api';
import { useAppSelector } from '../../Store/hooks';
import { GOOGLE_API_KEY } from '../const/api';
import { driversLocations, createKey } from './driversLocation';
import { mapStyle } from './mapStyle';
import InfoComponent from './infoComponent';
import path from 'path';
import Loading from '../Loading';


const Map:React.FC = () => {
  const center:{lat:number, lng:number} = useAppSelector(state => state.root.mapInitialPosition);
  const pickUpCoordinate = useAppSelector(state => state.root.pickup.coordinates);
  const destinationCoordinate = useAppSelector(state => state.root.destination.coordinates);
  const {origin, end} = useParams();
  const {pathname} = useLocation();

  const[map, setMap] = useState<any>(null)
  const [state, setState] = useState<any>({
   response: null,
   travelMode: 'DRIVING',
  })
  const [directionsResponse, setDirectionsResponse] = useState<any>(null);
  
  const [errorMessage, setErrorMessage] = useState<string>("something went wrong");

 const isPickupDisable:boolean = useAppSelector(state => state.root.pickup.disabled);
 const isDestinationDisable:boolean = useAppSelector(state => state.root.destination.disabled);


  const { isLoaded,loadError } = useJsApiLoader({
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
      if(response.status !== 'OK') {
        throw new Error(response.status);
      } 
    }
    catch(error:any) {
      console.log('from map folder')
      console.log(error);
      if(error.code === 'NOT_FOUND') {
        setErrorMessage('Route not found. Select another  location route and try again');
      }else {
        setErrorMessage('Something went wrong. Please try again');
      }  
    }
  },[isDestinationDisable, isPickupDisable, origin, end, state.travelMode]);

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
  }, [calculateRoute])
 
const place ='origin'



  if(!isLoaded) {
    if(document.readyState !== 'complete') {
      return (
        <div className='bg-white fixed w-full  h-full top-0 z-50'>
          <Loading/>
        </div>
      )
    }  
  }

    
  

  return (
    <div className={` bg-gray-300  h-[50vh] sm:h-screen w-full`}>
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
            clickableIcons: false,
          }}
          onLoad={(map) => {
            setMap(map);
          }}> 
           
          <Marker
          position={center}
          options  = {{
            icon: {
              url: 'https://www.nicepng.com/png/full/101-1015767_map-marker-circle-png.png',
              scaledSize: new google.maps.Size(60, 60), 
            },  
          }}
          />

          {driversLocations?.map((location) => (
            <Marker key={createKey(location)}  position={location}
              options = {{
                icon: {
                  url: 'https://github.com/EfficientProgramming01/uberClone/blob/master/assets/carMarker.png?raw=true',
                  scaledSize: new google.maps.Size(35, 18),
                }
              }}
            />
          ))}
          {/* {pathname === `/drop/${origin}/${end}`  && 
          <div>
            <InfoComponent
          center = {pickUpCoordinate}
          place  = {`From ${origin}`}
           />
          
          </div>

           } */}
      {directionsResponse !== null &&
      <div>
        
        <Marker
          position={directionsResponse.routes[0].legs[0].start_location}
          onLoad={(marker) => {
            marker.setMap(map);
          }}
          // position={pickUpCoordinate}
          options = {{
            icon: {
              url: 'https://www.picng.com/upload/vinyl/png_vinyl_35563.png',
              scaledSize: new google.maps.Size(18, 18),  
            }
           }}
        />
         
         {/* <InfoComponent
          center = {destinationCoordinate}
          place  = {`To ${end}`}
        /> */}
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
              geodesic: false,
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
