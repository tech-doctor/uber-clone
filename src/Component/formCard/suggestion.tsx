import React from "react";
import { useHistory, useParams} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import {updatePickupDisable, updateDestinationDisable} from "../../Store/slice";
import { LocationSVG } from "../const/svg";


interface  Props{
  suggestions : any;
  pickupRef: any;
  destinationRef: any;
}

const Suggestions:React.FC<Props> =  ({suggestions
}) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const {origin} = useParams();

  const isPickupDisable = useAppSelector(state => state.root.pickup.disabled);

  const {description} = suggestions;
  const {main_text, secondary_text} = suggestions.structured_formatting;
 
  const handleClick  = (e:any) => {
    e.preventDefault();
    if(isPickupDisable !== true ){
      dispatch(updatePickupDisable(true));
      history.push(`/pick/${description}`);
    }else{ 
      dispatch(updateDestinationDisable(true));
      history.push(`/drop/${origin}/${description}`);
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

export default Suggestions;