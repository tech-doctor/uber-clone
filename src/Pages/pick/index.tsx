import React,{useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import  { GoogleMap, useJsApiLoader, Marker} from '@react-google-maps/api';
import { mapStyle } from "../../Component/map/mapStyle";
import { GOOGLE_API_KEY } from "../../Component/const/api";
import InfoComponent from "../../Component/map/infoComponent";
import { updatePickup, updatePickupDisable, updatePickupCoordinates } from "../../Store/slice";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import FormCard from "../../Component/formCard";
import Header from "../../Component/header";


const Pick:React.FC = () => {
 const dispatch = useAppDispatch();
 const {origin} = useParams();
 //const[map, setMap] = useState<any>(null)
 const pickUpCoordinate = useAppSelector(state => state.root.pickup.coordinates);


 const { isLoaded} = useJsApiLoader({
  googleMapsApiKey: `${GOOGLE_API_KEY}`
}) 


  useEffect(() => {
    let mount = true;
    if(mount){
      dispatch(updatePickup(origin));
      dispatch(updatePickupDisable(true));
      const  getCoordinate = (address:string,) => {
        //const proxy = "https://mighty-island-92084.herokuapp.com/"
        axios(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(async res => {
          try {
            const result = await res.data;
            const position =  await result.results[0].geometry.location;   
             dispatch(updatePickupCoordinates(position));
          }
          catch (error) {
            console.log(error);
          }
        })
      }
      getCoordinate(origin);
    }
    return () => {
      dispatch(updatePickup(""));
      dispatch(updatePickupDisable(false));
      mount = false;  
    }
  }, [ dispatch,  origin])


  if(!isLoaded) {
    return <div>

    </div>
  }

  return (
    <div>
      <Header/>
      <div className={` bg-gray-300  h-[50vh] sm:h-screen w-full`}>
        <GoogleMap
          id='map'
          mapContainerStyle={{width: '100%', height: '100%'}}
          center={pickUpCoordinate}
          zoom={14}
          options = {{
            streetViewControl: false,
            fullscreenControl: false,
            mapTypeControl: false,
            styles: mapStyle,
            clickableIcons: false,
            zoomControl: false,
          }}
          
          // onLoad={(map) => {
          //   setMap(map);
          // }}
        >  
          <Marker
            position={pickUpCoordinate}
            options  = {{
              icon: {
                url: 'https://www.picng.com/upload/vinyl/png_vinyl_35563.png',
                scaledSize: new google.maps.Size(18, 18), 
              },  
            }}
          />
          <InfoComponent
            center = {pickUpCoordinate}
            place  = {`From ${origin}`}
          />
          </GoogleMap>
        </div>
      <FormCard
        heading="Where to?"
      />
    </div>
  )
}

export default Pick;