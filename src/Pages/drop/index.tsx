import React,{useState, useEffect, useCallback, useRef} from "react";
import {useParams} from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { ErrorBoundary } from "react-error-boundary";
import  {useMediaPredicate} from 'react-media-hook';
import { useAppDispatch } from "../../Store/hooks";
import { updatePickup, updateDestination, updatePickupDisable, updateDestinationDisable } from "../../Store/slice";
import { GOOGLE_API_KEY } from "../../Component/const/api";
import FormCard from "../../Component/formCard";
import Header from "../../Component/header";
import Map from "../../Component/map";
import Category from "./category";
import Response from "./response";
import ErrorFallback from "../../Component/ErrorFallBack";



const Drop:React.FC = () => {
  const {origin, end} = useParams();
  const dispatch = useAppDispatch();

  const [travelInfo, setTravelInfo] = useState<any>(null);
  const [time, setTime] = useState<any>("");
  const [openResponseModal, setOpenResponseModal] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  // const [throwError, setThrowError] = useState<boolean>(false);
  // const [errorMessage, setErrorMessage] = useState<string>("something went wrong");
  
  const categories = 
    [
      {
        id: 1,
        carLink: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/UberX_Hourly.png",
        name: "Hourly",
        duration: travelInfo ? travelInfo.duration.text : "loading..",
        time: time? time : "loading..",
        multiplier: 1.5,
        showSeater: false,
      },
      {
        id: 2,
        carLink: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Black_v1.png",
        name: "UberX",
        extraDetails: "Affordable, everyday ride",
        duration: travelInfo ? travelInfo.duration.text : null,
        time: time? time : "loading..",
        multiplier: 1,
        showSeater: true,
      },
    ]

  const tripPrice:any = useCallback((multiplier:number) =>{
    const SURGE_FACTOR = 1.5;
    const tripPrice = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN"
    }).format(travelInfo !==null ? travelInfo.duration.value * SURGE_FACTOR* multiplier/10: 0);
    return tripPrice; 
  }, [travelInfo])


  

  useEffect(() => {
    let mounted = true;
    const abortController = new AbortController();
    const signal = abortController.signal;
    if(mounted) {
    dispatch(updatePickupDisable(true));
    dispatch(updateDestinationDisable(true));
    dispatch(updatePickup(origin));
    dispatch(updateDestination(end));
    const proxy = "https://mighty-island-92084.herokuapp.com/"
    axios(`${proxy}https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${end}&units=imperial&key=${GOOGLE_API_KEY}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      signal
    })
    .then(async res => {
      try {
        const response = await res;
        const {data} = await response;
        const result = data.rows[0].elements[0];
        setTravelInfo(result);    
      }
      catch (error:any)  {
        if(error.name === "AbortError") {
          console.log("Request Aborted");
        }else{
          console.log(error);
        }
      }
    });
   }
    
    
    return () => {
      mounted = false;
      abortController.abort();  
      dispatch(updateDestination(""));
      dispatch(updateDestinationDisable(false));
      dispatch(updatePickupDisable(false));
      dispatch(updatePickup(""));
    } 
  },[ dispatch, origin, end,]);


  
  const [details, setDetails] = useState<any>({
    name: "Hourly",
    duration : "",
    time: "",
    extraDetails: "",
    multiplier: "",
    showSeater: false,
  });
  const [showDetails, setShowDetails] = useState<boolean>(false);

  async  function arrivalTime() {
    const duration =  await travelInfo ? travelInfo.duration.text : null;
    const minutes =  duration? getDuration(duration): null;
    const date = new Date(moment().add(minutes, 'm').format());
    const  dt = date.getTime();
    let time = new Date(dt).toLocaleTimeString().replace(/(.*)\D\d+/, '$1')
    setTime(time);   
  }

  arrivalTime();

  const handleSelect = useCallback ((name:string, duration:string, time:string, extraDetails:string, multiplier:number, showSeater:boolean) => {
    setDetails({name, duration, time, extraDetails, multiplier, showSeater});
    setShowDetails(true);
  },[]);

  const  biggerScreen = useMediaPredicate('(min-width: 640px)');

  return (
    <div>
      <Header/>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}   
      >
        <Map/>
      </ErrorBoundary>
      
      <FormCard
        heading="Choose a ride."
      >
      
        <div className="my-4 sm:my-8 sm:py-4 relative sm:overflow-y-scroll sm:max-h-[200px]  scroll">
       {categories?.map((category,i) => 
        <Category   
          key={category.id} 
          carLink={category.carLink}
          name={category.name}
          extraDetails={category.extraDetails}
          duration={category.duration}
          time = {category.time}
          price = {tripPrice(category?.multiplier)}
          multiplier = {category.multiplier}
          showSeater={category.showSeater}
          handleSelect={handleSelect}
       />
         )}
      </div>
      
      {showDetails &&
      <div className=" absolute  z-10 w-full bg-white left-0 right-0 bottom-[110px] sm:bottom-0  px-5 py-2 h-[80%] sm:h-[57%]">
        <div 
        onClick={() => setShowDetails(false)}
        className="cancel cursor-pointer hover:bg-gray-200 w-fit p-1 ml-auto">
          <svg 
          width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21.1 5.1l-2.2-2.2-6.9 7-6.9-7-2.2 2.2 7 6.9-7 6.9 2.2 2.2 6.9-7 6.9 7 2.2-2.2-7-6.9 7-6.9z" fill="currentColor"></path></svg>
        </div>
        <div className="top py-2">
          <div className="heading flex justify-between text-xl font-medium">
            <span>{details.name}</span>
            <span>{tripPrice(details.multiplier)}</span>
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
        
      {/* <div className='bg-white w-full px-5 py-4  absolute left-0 bottom-0   z-10 shadow-[1px_-3px_6px_0px_rgba(0,0,0,0.1)] shadow-gray-300 sm:rounded-b-xl'> */}
      {biggerScreen && 
      <div className='bg-white w-full px-5 py-4 absolute left-0 bottom-0  z-10 shadow-[1px_-3px_6px_0px_rgba(0,0,0,0.1)] shadow-gray-300 sm:rounded-b-xl'>
      <div className='cash_request flex pb-2.5'>
        <div className="icon">
          <img  className='w-[20px]  h-[20px]'
          alt="payment-method" src="https://tb-static.uber.com/prod/wallet/icons/stored_value_3x.png"></img>
        </div>
        <div className="details  font-medium ml-4">
          Uber cash . Business
        </div>
      </div>
      <button 
      onClick={() => {
        setOpenResponseModal(true);
      }}
      ref={buttonRef}
      className='button font-medium bg-black text-white text-xl w-full py-3 hover:opacity-80'>
        {`Request ${details.name}`}
      </button>
      {openResponseModal && <Response
        openResponseModal={openResponseModal}
        setOpenResponseModal={setOpenResponseModal}
        buttonRef={buttonRef}
      />} 
    </div>  
      }
      </FormCard>
      {!biggerScreen && 
        <div className='bg-white w-full px-5 py-4 fixed left-0 bottom-0  z-10 shadow-[1px_-3px_6px_0px_rgba(0,0,0,0.1)] shadow-gray-300 sm:rounded-b-xl'>
        <div className='cash_request flex pb-2.5'>
          <div className="icon">
            <img  className='w-[20px]  h-[20px]'
            alt="payment-method" src="https://tb-static.uber.com/prod/wallet/icons/stored_value_3x.png"></img>
          </div>
          <div className="details  font-medium ml-4">
            Uber cash . Business
          </div>
        </div>
        <button 
        onClick={() => {
          setOpenResponseModal(true);
        }}
        ref={buttonRef}
        className='button font-medium bg-black text-white text-xl w-full py-3 hover:opacity-80'>
          {`Request ${details.name}`}
        </button>
        {openResponseModal && <Response
          openResponseModal={openResponseModal}
          setOpenResponseModal={setOpenResponseModal}
          buttonRef={buttonRef}
        />} 
      </div>  

      }
      
     </div>
  )
}

function getDuration(duration) {
  const hourNum = parseInt(duration.split(' ')[0])
  const minNum = parseInt(duration.split(' ')[2])
  if (duration.includes('hour' || 'hours')) {
    return hourNum * 60 + minNum;
  }else{
    return minNum;
  }
}

export default React.memo(Drop);


