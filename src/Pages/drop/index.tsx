import React from "react";
import FormCard from "../../Component/formCard";
import Header from "../../Component/header";
import Map from "../../Component/map";
import {useLocation, useHistory } from "react-router-dom";
import Category from "./category";


const Drop:React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  //console.log(useLocation());


  return (
    <div>
      <Header/>
      <Map/>
      <FormCard
        heading="Choose a ride."
        requestCategory=" Request a ride"
      >
        <div className="my-4 sm:my-7">
          <Category/> 
        </div>
        
      </FormCard>
    </div>
  )
}

export default Drop;