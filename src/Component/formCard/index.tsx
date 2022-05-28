import React,{useRef, useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';
import  {useMediaPredicate} from 'react-media-hook';
import { Wrapper } from '../styles/card';
import FormHeading from '../formCard/heading';
import FormInput from '../formCard/input';
import Loading from '../Loading';

interface Props {
  heading: string;
  requestCategory?: string;
  children?: React.ReactNode;
}


const FormCard:React.FC<Props> = ({heading, children, requestCategory}) => {
  const {pathname} = useLocation();
  const screenHeight = window.screen.height
  const height = (screenHeight * 0.5);

  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if(document.readyState !== "complete") {
      setIsLoading(true)
      setTimeout(() => {
       setIsLoading(false)
     }, 1500) 
    }
    return () => {
      setIsLoading(false)
      clearTimeout();
    }
  }, [])
  
  const [open, setOpen] = React.useState(false);

  const openBottomSheet = (open) => {
    setOpen(open);
  }
  
  const toggleBottomSheet = () => {
    openBottomSheet(true);
  }





  const styles:any = {
    text:{
      padding: '10px 0.8em',
      boxSizing: 'border-box',
      backgroundColor: 'white',
      fontSize: '18px',
      //minHeight: '90vh',
      height: '100%',
      position: 'relative',
      zIndex: 10,
    }
  };


  const  biggerScreen = useMediaPredicate('(min-width: 640px)');
  return (
    <div className='tracking-wider  '>
      
      {biggerScreen? 
      <Wrapper className = 'sm:min-w-[450px] absolute bottom-0 w-full h-1/2 rounded-none sm:left-[5%] md:left-[10%] sm:w-[450px] sm:top-20 sm:h-fit sm:rounded-xl '>
      {isLoading &&  <div className='text-black bg-white absolute top-0 w-full h-full left-0 z-20 sm:rounded-xl'>
        <Loading/>
      </div>}
      <FormHeading 
        heading = {heading}
      />
    <FormInput
      toggleBottomSheet={toggleBottomSheet}
    />
    <div>
      {children}  
    </div>     
  </Wrapper> : 
     <div className='container '>
       <SwipeableBottomSheet
					overflowHeight={height}
					open={open}
         	onChange={openBottomSheet}
          fullScreen = {true}
          style={{
            position: 'relative',
          }}
				>
          {isLoading && <div className='text-black bg-white absolute top-0 w-full h-[50vh] buttom-0 left-0 z-20 sm:rounded-xl'>
             <Loading/>
          </div> }
          <Wrapper style={styles.text}>
         
            <div className = 'sm:hidden h-1 bg-gray-200 w-14 rounded-lg m-auto '></div>
            <FormHeading 
              heading = {heading}
              />
            <FormInput
              toggleBottomSheet = {toggleBottomSheet}
            />
              <div className='h-fit'>
                {children}  
              </div>     
          </Wrapper>  
			  </SwipeableBottomSheet>
     </div>
  }
    </div>
  )
  
}

export default React.memo(FormCard);



//const IP_KEY = process.env.REACT_APP_IP_KEY;

// const currentLocation = () => {
//   if(!navigator.geolocation){
//      return; 
//   }
//   function success(position) {
//     const {latitude, longitude} =position.coords;
//     console.log(longitude,latitude)
//  }
//  navigator.geolocation.getCurrentPosition(success)
// }


