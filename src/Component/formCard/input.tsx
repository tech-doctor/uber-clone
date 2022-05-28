import React, {useState,  useEffect, useRef} from "react";
import {useLocation, useHistory} from "react-router-dom";
import axios from "axios";
import { GOOGLE_API_KEY } from "../const/api";
import { CenterSVG, ClockSVG, SmallCircleSVG, SmallSquareSVG } from "../const/svg";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { updatePickupCoordinates, updatePickup,updateDestination, updatePickupDisable} from "../../Store/slice";
import  { useGetAddressQuery } from "../../Service/address";
import Suggestions from "./suggestion";

interface Props {
  toggleBottomSheet: () => void;
}

const FormInput:React.FC<Props> = ({toggleBottomSheet}) => {
  const dispatch = useAppDispatch();
  const currentRoute = useLocation();
  const history = useHistory();

  const pickup:string = useAppSelector(state => state.root.pickup.value);
  const destination:string = useAppSelector(state => state.root.destination.value);
  const isPickupDisable:boolean = useAppSelector(state => state.root.pickup.disabled);
  const isDestinationDisable:boolean = useAppSelector(state => state.root.destination.disabled);

  const [suggestions, setSuggestions] = useState<never[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const pickupRef = useRef<any>();
  const destinationRef = useRef<any>();
  const [currentCordinate, setCurrentCordinate] = useState({lat: 0, lng: 0});

  const {data,  error, isFetching, isSuccess, isError} =  useGetAddressQuery<any>(currentCordinate); 



  const fetchPredictions = (input:string) => {
    const proxy = "https://mighty-island-92084.herokuapp.com/"
    setIsLoading(true);
    axios(` ${proxy}https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&components=country:NG&key=${GOOGLE_API_KEY}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then( async res => {
      try {
        const result = await res.data;
        setSuggestions(result.predictions);
        setIsLoading(false);
      }catch (error) {
        console.log(error);
      }
    })
  }

  function getCoordinate(address:string, update:any) {
    const proxy = "https://mighty-island-92084.herokuapp.com/"
    axios(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(async res => {
      try {
        const result = await res.data;
        const position = result.results[0].geometry.location;   
          dispatch(update(position));  
      }
      catch (error) {
        console.log(error);
      }
    })
  }


  const handlePickupInput = (e:any) => {
    dispatch(updatePickup(e.target.value));
    if(pickup.length > 1) {
    fetchPredictions(pickup)
    } 
  }

  const handleDestinationInput = (e:any) => {
     dispatch(updateDestination(e.target.value));
     if(destination.length > 1) {
     fetchPredictions(destination)
     }
  }

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    const signal = controller.signal;
      if (navigator.geolocation){
       navigator.geolocation.getCurrentPosition(
         (position: GeolocationPosition) => {
            const { latitude, longitude } = position.coords;
            setCurrentCordinate({lat: latitude, lng: longitude});      
        },    
       )
      }
    if(currentRoute.pathname === "/"){
      pickupRef.current.focus();
    }else if(currentRoute.pathname === "/pick"){
      destinationRef.current.focus();
    }
    
    return () => {
      setCurrentCordinate({lat: 0, lng: 0});
      mounted = false;
    }
  }, [currentRoute.pathname]);


  const handleClick  = (e:any) => {
    e.preventDefault();
    const currentLocation = data.results[0]?.address_components[1].long_name;
    getCoordinate(currentLocation, updatePickupCoordinates);
    dispatch(updatePickup(currentLocation));
    dispatch(updatePickupDisable(true));
    history.push(`/pick/${currentLocation}`);
  }
  

  
  return(
    <div>
      <div className="input_fields relative">
        <div className="icons absolute  top-6 left-5">
          <SmallCircleSVG/>
          <img className="w-[2px] h-12  relative left-[7px]" alt="link" style={{backgroundColor: 'black'}} src="https://img.icons8.com/ios-glyphs/344/vertical-line.png"/>
          <SmallSquareSVG/>
        </div>
        <div className="input_field">
          <input
          onClick={toggleBottomSheet}
          ref={pickupRef}
          id = "pickup"
          value={pickup}
          onChange={handlePickupInput}
          className="w-full  my-2  py-3 pl-14 border-none focus:ring-2  focus:ring-black bg-light-gray"
          type = 'search' 
          placeholder = 'Add pickup location'
          disabled = {isPickupDisable}
          autoComplete = "off"
          
          />
           <br/> 
          <input 
           onClick={toggleBottomSheet}
          ref={destinationRef}
          id = "destination"
          value={destination}
          onChange={handleDestinationInput}
          className="w-full my-2 py-3 pl-14 border-none focus:ring-2  focus:ring-black bg-light-gray"
          type = 'search' 
          placeholder = 'Enter your destination'
          disabled = {isDestinationDisable}
          autoComplete = "off"
          />
        </div>
      </div>
      <div className="flex items-center bg-light-gray w-fit py-1.5 px-5 rounded-3xl my-2">
        <div className="leave-time">
          <ClockSVG/>
        </div>
        <div className="ml-2 font-medium text-[16px] sm:text-md">
          Leave Now
        </div>
      </div>

      <div className="text-[16px] sm:text-md">
        {!isLoading && suggestions.length <= 0 && currentRoute.pathname === "/"?
            <div className="my-5 ">
            <div onClick={handleClick}  className="each_suggestion flex items-center my-3 cursor-pointer">
              <div className="icon  p-2.5 bg-black rounded-full mb-3">
               <CenterSVG/>
              </div>
              <div className=" font-san leading-tight  ml-4 border-solid border-b border-gray-200 w-full tracking-tight pb-3">
                {isFetching &&<span className="font-medium leading-tight">Fetching...</span>}
                {isSuccess && <span className="font-medium leading-tight">{data.results[0]?.address_components[1].long_name}</span>}
                <br/>
                <span className=" text-gray-500 font-normal leading-tight tracking-tight ">Your current location</span>
              </div>
            </div>
          </div>: ''}
        {isLoading ? <div className="loader font-medium leading-tight mt-2">Fetching...</div> : null} 
        {suggestions?.map<JSX.Element>((data,i) => (
          <Suggestions 
            pickupRef={pickupRef}
            destinationRef={destinationRef}
            key={i} 
            suggestions={data}
            getCoordinate={getCoordinate}
          />))}
      </div>  
    </div>
  )
}



export default React.memo(FormInput);