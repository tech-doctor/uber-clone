import React,{useState} from "react";
import FormCard from "../../Component/formCard";
import Header from "../../Component/header";
import Map from "../../Component/map";
import {useLocation, useHistory } from "react-router-dom";
import Category from "./category";


const Drop:React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const [details, setRequest] = useState<any>({
    name: "Hourly",
    price : "",
    duration : "",
    time: "",
    extraDetails: "",
    showSeater: false,
  });
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const categories = [
    {
      id: 1,
      carLink: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/UberX_Hourly.png",
      name: "Hourly",
      price: "NGN 2,520.00",
      duration: "7mins",
      time: "03:55PM",
      showSeater: false,
    },
    {
      id: 2,
      carLink: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Black_v1.png",
      name: "UberX",
      price: "NGN 2,620.00",
      extraDetails: "Affordable, everyday ride",
      duration: "7mins",
      time: "03:55PM",
      showSeater: true,
    },
    // {
    //   id: 3,
    //   carLink: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Black_v1.png",
    //   name: "UberX Share",
    //   price: "NGN 2,520.00",
    //   extraDetails: "Save up to 30% more if shared",
    //   duration: "7mins",
    //   time: "03:55PM",
    //   showSeater: false,
    // }
  ]


  const handleSelect = (name) => {  
    setRequest({name});  
  }

  const doubleClick = ({name,price, duration, time, showSeater, extraDetails}) => {
    setRequest({name, price, duration, time, showSeater, extraDetails});
    setShowDetails(true);
  }

  return (
    
    <div>
      <Header/>
      <Map/>
      <FormCard
        heading="Choose a ride."
      >
      <div className="my-4 sm:my-7">
        {categories.map((category,i) => 
        <Category   
          key={category.id} 
          carLink={category.carLink}
          name={category.name}
          price={category.price}
          extraDetails={category.extraDetails}
          duration={category.duration}
          time={category.time}
          showSeater={category.showSeater}
          handleSelect={handleSelect}
          doubleClick={doubleClick}
       />
        )}
      </div>
      
      {showDetails &&
      <div className="absolute z-10 w-full bg-white left-0 right-0 bottom-[110px] px-5 py-2 h-[30vh]">
        <div 
        onClick={() => setShowDetails(false)}
        className="cancel cursor-pointer hover:bg-gray-200 w-fit p-1 ml-auto">
          <svg 
          width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21.1 5.1l-2.2-2.2-6.9 7-6.9-7-2.2 2.2 7 6.9-7 6.9 2.2 2.2 6.9-7 6.9 7 2.2-2.2-7-6.9 7-6.9z" fill="currentColor"></path></svg>
        </div>
        <div className="top py-2">
          <div className="heading flex justify-between text-xl font-medium">
            <span>{details.name}</span>
            <span>{details.price}</span>
          </div>

          <div className="time_duration text-base text-gray-600">
            <span>{` in ${details.time}. ${details.duration} dropoff`}</span>
          </div>
          <div className="extra-details text-base text-gray-600">
            {`${details.showSeater? `4 Seats.`: ''}  ${details.extraDetails? `${details.extraDetails}`: ''}`}
          </div>
        </div>
        <hr/>
        <div className="bottom pt-3 border-t-2 border-gray-500 border-solid">
          <p className="text-sm text-gray-500">Your fare will be the price presented before the trip or based on the rate above and other applicable surcharges and adjustments. </p>
        </div> 
      </div>}

      <div className='bg-white w-full absolute left-0 bottom-0 px-5 py-4  shadow-[1px_-3px_6px_0px_rgba(0,0,0,0.1)] shadow-gray-300'>
        <div className='cash_request flex pb-2.5'>
          <div className="icon">
            <img  className='w-[20px]  h-[20px'
            alt="payment-method" src="https://tb-static.uber.com/prod/wallet/icons/stored_value_3x.png"></img>
          </div>
          <div className="details  font-medium ml-4">
            Uber cash . Business
          </div>
        </div>
        <button className='button font-medium bg-black text-white text-xl w-full py-3 hover:opacity-80'>
          {`Request ${details.name}`}
        </button>
      </div>   
      </FormCard>
    </div>
  )
}

export default Drop;