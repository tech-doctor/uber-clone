import React from "react";
import FormCard from "../../Component/formCard";
import Header from "../../Component/header";
import Map from "../../Component/map";
//import {useLocation} from "react-router-dom";


const Pick:React.FC = () => {
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