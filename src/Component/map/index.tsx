import  React,{useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import  {useMediaPredicate} from 'react-media-hook';
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { updateErrorMessage } from '../../Store/slice';
import { useAppSelector, useAppDispatch } from '../../Store/hooks';
import { GOOGLE_API_KEY } from '../const/api';
import { driversLocations } from './driversLocation';
import { mapStyle } from './mapStyle';
import InfoComponent from './infoComponent';
import Loading from '../Loading';


const Map:React.FC = () => {
  const center:{lat:number, lng:number} = useAppSelector(state => state.root.mapInitialPosition);
  const {origin, end} = useParams();
  const dispatch = useAppDispatch();
  const [directionsResponse, setDirectionsResponse] = useState<any>(null);
 const isPickupDisable:boolean = useAppSelector(state => state.root.pickup.disabled);
 const isDestinationDisable:boolean = useAppSelector(state => state.root.destination.disabled);

  const { isLoaded} = useJsApiLoader({
    googleMapsApiKey: `${GOOGLE_API_KEY}`
  }) 


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
           //console.log(response)
          setDirectionsResponse(response);
        }
        catch(error:any) {
          console.log(error);
          if(error.code === 'NOT_FOUND') {
            dispatch(updateErrorMessage('One of your waypoints is not accessible at the moment. Select a near location and try again...'));
          }else if(error.code === 'ZERO_RESULTS') {
            dispatch(updateErrorMessage('Route is currently not available, select an alternative route and try again...'));
          }else{
            dispatch(updateErrorMessage('select an alternative route and try again...'));
          } 
        }
      })();
    }
    return ()  => {
      mounted = false;
      //console.log('unmounting');
    }
  }, [getCurrentSeconds, dispatch,isPickupDisable, isDestinationDisable, origin, end]);
 

  const  biggerScreen = useMediaPredicate('(min-width: 640px)');
  //console.log(center)
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
    <div className={` bg-gray-300  h-[45vh] sm:h-[94vh] w-full`}>
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
        zoomControl: biggerScreen? true: false

      }}
      > 
      <Marker
      position={center}
      clickable={false}
      options  = {{
        icon: {
          url: 'https://res.cloudinary.com/rririsrisurisux/image/upload/v1653965126/location-icon_drtx9v.png',
          scaledSize: new google.maps.Size(22, 22), 
        },  
      }}
      />
        {driversLocations?.map((location, i) => (
          <Marker key={i}  position={location}
           clickable={false}
            zIndex={1}
            options = {{
              icon: {
                // url: 'https://www.uttf.com.ua/assets/images/loader2.gif',
                // url: 'https://github.com/EfficientProgramming01/uberClone/blob/master/assets/carMarker.png?raw=true',
                url: 'https://d1a3f4spazzrp4.cloudfront.net/car-types/map70px/product/map-uberx.png',
                scaledSize:  new google.maps.Size(25, 25),
              }
            }}
          />
        ))}   
  {directionsResponse !== null &&
  <div>
    <Marker
      clickable={false}
      position={directionsResponse.routes[0].legs[0].start_location}
      options = {{
        icon: {
          url: 'https://www.picng.com/upload/vinyl/png_vinyl_35563.png',
          scaledSize: new google.maps.Size(18, 18),  
        }
       }}
    />
      <InfoComponent
      center = {directionsResponse.routes[0].legs[0].start_location}
      place  = {`From ${origin.split(",")[0]}`}
    />
     
     <InfoComponent
      center = {directionsResponse.routes[0].legs[0].end_location}
      place  = {`To ${end.split(",")[0]}`}
    />

    <Marker
      clickable={false}
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
          clickable: false,
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

//https://uber-clone-bd051.firebaseapp.com/__/auth/handler
