import  React,{useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer} from '@react-google-maps/api';
import { useAppSelector } from '../../Store/hooks';
import { GOOGLE_API_KEY } from '../const/api';
import { driversLocations, createKey } from './driversLocation';
import { mapStyle } from './mapStyle';
import InfoComponent from './infoComponent';
import Loading from '../Loading';


const Map:React.FC = () => {
  const center:{lat:number, lng:number} = useAppSelector(state => state.root.mapInitialPosition);
  const {origin, end} = useParams();

  //const [map, setMap] = useState<any>(null)
  // const [state, setState] = useState<any>({
  //  response: null,
  //  travelMode: 'DRIVING',
  // })

  const [directionsResponse, setDirectionsResponse] = useState<any>(null);
  // const [errorMessage, setErrorMessage] = useState<string>("something went wrong");
 const isPickupDisable:boolean = useAppSelector(state => state.root.pickup.disabled);
 const isDestinationDisable:boolean = useAppSelector(state => state.root.destination.disabled);


  const { isLoaded} = useJsApiLoader({
    googleMapsApiKey: `${GOOGLE_API_KEY}`
  }) 


 //const  milliSeconds = new Date().getMilliseconds();

 // eslint-disable-next-line 
  const getCurrentSeconds = () => {
    const date = new Date();
    return date.getMilliseconds();
  };

  useEffect(() => {
    let mounted = true;
    if(mounted){
      (async() => {
        if(!isPickupDisable || !isDestinationDisable) {
          return;
        }
        try {
          const directionsService:any = new google.maps.DirectionsService();
          const response = await directionsService.route({
            origin:origin,
            destination: end,
            travelMode: 'DRIVING',
            drivingOptions: {
              departureTime: new Date(),  
            },
          }
          );
          setDirectionsResponse(response);
          if(response.status !== 'OK') {
            throw new Error(response.status);
          } 
        }
        catch(error:any) {
          console.log(error);
          // if(error.code === 'NOT_FOUND') {
          //   setErrorMessage('Route not found. Select another  location route and try again');
          // }else {
          //   setErrorMessage('Something went wrong. Please try again');
          // }  
        }
      })();
    }
    return ()  => {
      mounted = false;
    }
  }, [getCurrentSeconds, isPickupDisable, isDestinationDisable, origin, end]);
 



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
    <div className={` bg-gray-300  h-[45vh] sm:h-screen w-full`}>
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
            //zoomControl: false

          }}
          // onLoad={(map) => {
          //   setMap(map);
          // }}
          > 
           
          <Marker
          position={center}
          options  = {{
            icon: {
              url: 'https://res.cloudinary.com/rririsrisurisux/image/upload/v1653965126/location-icon_drtx9v.png',
              scaledSize: new google.maps.Size(22, 22), 
            },  
          }}
          />

          {driversLocations?.map((location) => (
            <Marker key={createKey(location)}  position={location}
              options = {{
                icon: {
                  url: 'https://github.com/EfficientProgramming01/uberClone/blob/master/assets/carMarker.png?raw=true',
                  // url: 'https://d1a3f4spazzrp4.cloudfront.net/car-types/map70px/product/map-uberx.png',
                  scaledSize: new google.maps.Size(35, 18),
                }
              }}
            />
          ))}
      {directionsResponse !== null &&
      
      <div>
        <Marker
          position={directionsResponse.routes[0].legs[0].start_location}
          // onLoad={(marker) => {
          //   marker.setMap(map);
          // }}
          options = {{
            icon: {
              url: 'https://www.picng.com/upload/vinyl/png_vinyl_35563.png',
              scaledSize: new google.maps.Size(18, 18),  
            }
           }}
        />
          <InfoComponent
          center = {directionsResponse.routes[0].legs[0].start_location}
          place  = {`From ${origin}`}
        />
         
         <InfoComponent
          center = {directionsResponse.routes[0].legs[0].end_location}
          place  = {`To ${end}`}
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
