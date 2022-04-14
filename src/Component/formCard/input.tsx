import React, {useState,  useEffect, useRef} from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";
import Suggestions from "./suggestion";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { updatePickup,updateDestination } from "../../Store/slice";

const FormInput:React.FC = ({children}) => {
  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  const dispatch = useAppDispatch();
  const currentRoute = useLocation();

  const pickup = useAppSelector(state => state.root.pickup.value);
  const destination = useAppSelector(state => state.root.destination.value);
  const isPickupDisable = useAppSelector(state => state.root.pickup.disabled);
  const isDestinationDisable = useAppSelector(state => state.root.destination.disabled);

  const [suggestions, setSuggestions] = useState([]);
  const pickupRef = useRef<any>();
  const destinationRef = useRef<any>();


  const fetchPredictions = (input:string) => {
    const proxy = "https://mighty-island-92084.herokuapp.com/"
    axios(` ${proxy}https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=address&components=country:ng|country:fr|country:us&key=${GOOGLE_API_KEY}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then( async res => {
      try {
        const result = await res.data;
        console.log(result.predictions);
        setSuggestions(result.predictions);

      }catch (error) {
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

  
  return(
    <div>
      <div className="input_fields relative">
        <div className="icons absolute  top-6 left-5">
          <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><title>Circle small</title><path fillRule="evenodd" clipRule="evenodd" d="M12 14a2 2 0 100-4 2 2 0 000 4zm5-2a5 5 0 11-10 0 5 5 0 0110 0z" fill="currentColor"></path></svg>
          <img className="w-[2px] h-12  relative left-[7px]" alt="link" style={{backgroundColor: 'black'}} src="https://img.icons8.com/ios-glyphs/344/vertical-line.png"/>
          <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><title>Square small</title><path fillRule="evenodd" clipRule="evenodd" d="M14 10h-4v4h4v-4zM7 7v10h10V7H7z" fill="currentColor"></path></svg>
        </div>
        <div className="input_field">
          <input
          ref={pickupRef}
          value={pickup}
          onChange={handlePickupInput}
          className="w-full  my-2  py-3 pl-14 border-none focus:ring-2  focus:ring-black bg-light-gray"
          type = 'search' 
          placeholder = 'Add pickup location'
          disabled = {isPickupDisable}
          
          />
           <br/> 
          <input 
          ref={destinationRef}
          value={destination}
          onChange={handleDestinationInput}
          className="w-full my-2 py-3 pl-14 border-none focus:ring-2  focus:ring-black bg-light-gray"
          type = 'search' 
          placeholder = 'Enter your destination'
          disabled = {isDestinationDisable}
          />
        </div>
      </div>
      <div className="flex items-center bg-light-gray w-fit py-1.5 px-5 rounded-3xl my-2">
        <div className="leave-time">
          <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><title>Clock</title><path d="M12 1C5.9 1 1 5.9 1 12s4.9 11 11 11 11-4.9 11-11S18.1 1 12 1zm6 13h-8V4h3v7h5v3z" fill="currentColor"></path>
          </svg>
        </div>
        <div className="ml-2 font-medium">
          Leave Now
        </div>
      </div>
      {/* <div>
        {children}
      </div> */}
      <div>
        {suggestions.map((data,i) => (
          <Suggestions 
            pickupRef={pickupRef}
            destinationRef={destinationRef}
            key={i} 
            suggestions={data}
          />))}
      </div>
       
    </div>
  )
}



export default FormInput;