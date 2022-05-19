import React,{useEffect} from "react";
//import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updatePickup, updatePickupDisable } from "../../Store/slice";
import { useAppDispatch } from "../../Store/hooks";
import FormCard from "../../Component/formCard";
import Header from "../../Component/header";
import Map from "../../Component/map";


const Pick:React.FC = () => {
 const dispatch = useAppDispatch();
 const {origin} = useParams();

  useEffect(() => {
    //let mount = true;
    dispatch(updatePickup(origin));
    dispatch(updatePickupDisable(true));
    return () => {
      dispatch(updatePickup(""));
      dispatch(updatePickupDisable(false));
      //mount = false;
    }
  })


  return (
    <div>
      <Header/>
      <Map/>
      <FormCard
        heading="Where to?"
      />
    </div>
  )
}

export default Pick;