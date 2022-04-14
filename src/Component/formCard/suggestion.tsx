import React,{useEffect, useState} from "react";
import {useLocation, useHistory} from "react-router-dom";
import axios from "axios";
import { useAppDispatch } from "../../Store/hooks";
import {updatePickup, updateDestination, updatePickupDisable, updateDestinationDisable, updateInitialPosition} from "../../Store/slice";

interface Texts {
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  }
}
interface  Props{
  suggestions : Texts;
  pickupRef: any;
  destinationRef: any;
}


const Suggestions1:React.FC<Props> =  ({suggestions, pickupRef, destinationRef}) => {
  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  const dispatch = useAppDispatch();
  const currentRoute = useLocation();
  const history = useHistory();

  const {main_text, secondary_text} = suggestions.structured_formatting;
  const description = `${main_text}, ${secondary_text}`;
 
  function getCoordinate(address:string) {
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
        dispatch(updateInitialPosition(position));
      }
      catch (error) {
        console.log(error);
      }
    })
  }
  
  
  const handleClick  = (e:any) => {
    e.preventDefault();
    getCoordinate(description);
    if(currentRoute.pathname === "/"){
      history.push("/pick");
      dispatch(updatePickup(main_text));
      dispatch(updatePickupDisable(true));
      
    }else if(currentRoute.pathname === "/pick"){
      history.push("/drop");
      dispatch(updateDestination(main_text));
      dispatch(updateDestinationDisable(true));
    }
    destinationRef.current.focus();
  }
  
   return (
    <div className="my-5">
      <div onClick={handleClick} className="each_suggestion flex items-center my-3 cursor-pointer">
        <div className="icon bg-light-gray p-2.5 rounded-full mb-3">
          <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" color="#000000"><title>Location marker</title><path d="M18.7 3.8C15 .1 9 .1 5.3 3.8c-3.7 3.7-3.7 9.8 0 13.5L12 24l6.7-6.8c3.7-3.6 3.7-9.7 0-13.4zM12 12.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="currentColor"></path></svg>
        </div>
        <div className=" font-san leading-tight text ml-4 border-solid border-b-2 border-gray-200 w-full tracking-tight pb-3">
          <span className="font-medium leading-tight">{main_text}</span><br/>
          <span className=" text-gray-500 font-normal leading-tight tracking-tight ">{secondary_text}</span>
        </div>
      </div>
    </div>
  )
}

export default Suggestions1;