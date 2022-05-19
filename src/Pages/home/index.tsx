import React from "react";
import FormCard from "../../Component/formCard";
import Header from "../../Component/header";
import Map from "../../Component/map";


const Home:React.FC = () => {
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