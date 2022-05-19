import React from "react";
import {useLocation, useHistory, useParams} from "react-router-dom";
//import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import {updatePickupDisable, updateDestinationDisable} from "../../Store/slice";
//import { GOOGLE_API_KEY } from "../const/api";
import { LocationSVG } from "../const/svg";

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
  const dispatch = useAppDispatch();
 // const currentRoute = useLocation();
  const history = useHistory();
  //const params = useParams();

  const pickup:string = useAppSelector(state => state.root.pickup.value);
  const isPickupDisable = useAppSelector(state => state.root.pickup.disabled);
  //const isDestinationDisable = useAppSelector(state => state.root.destination.disabled);


  const {main_text, secondary_text} = suggestions.structured_formatting;
  //const description = `${main_text}, ${secondary_text}`;
 
  
  // function getCoordinate(address:string) {
  //   const proxy = "https://mighty-island-92084.herokuapp.com/"
  //   axios(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   })
  //   .then(async res => {
  //     try {
  //       const result = await res.data;
  //       const position = result.results[0].geometry.location;   
  //         dispatch(updatePickupCoordinates(position));  
  //     }
  //     catch (error) {
  //       console.log(error);
  //     }
  //   })
  // }
  

  
  const handleClick  = (e:any) => {
    e.preventDefault();
    if(isPickupDisable !== true ){
      dispatch(updatePickupDisable(true));
      //getCoordinate(main_text);
      history.push(`/pick/${main_text}`);
    }else{ 
      dispatch(updateDestinationDisable(true));
      //getCoordinate(main_text);
      history.push(`/drop/${pickup}/${main_text}`);
    }
  }
  
   return (
    <div className="my-5">
      <div onClick={handleClick} className="each_suggestion flex items-center my-3 cursor-pointer">
        <div className="icon bg-light-gray p-2.5 rounded-full mb-3">
          <LocationSVG/>
        </div>
        <div className=" font-san leading-tight text ml-4 border-solid border-b border-gray-200 w-full tracking-tight pb-3">
          <span className="font-medium leading-tight">{main_text}</span><br/>
          <span className=" text-gray-500 font-normal leading-tight tracking-tight ">{secondary_text}</span>
        </div>
      </div>
    </div>
  )
}

export default Suggestions1;