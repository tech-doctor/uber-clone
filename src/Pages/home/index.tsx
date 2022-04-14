import React from "react";
import FormCard from "../../Component/formCard";
import Header from "../../Component/header";
import Map from "../../Component/map";
import {useLocation} from "react-router-dom";


const Home:React.FC = () => {

 

  console.log(useLocation());
  return (
    <div>
      <Header/>
      <Map/>
      <FormCard
        heading="Where can we pick you up?"
      />
    </div>
  )
}

export default Home;