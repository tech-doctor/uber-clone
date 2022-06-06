import React,{useState, useEffect} from 'react';
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';
import  {useMediaPredicate} from 'react-media-hook';
import { useAppSelector } from "../../Store/hooks";
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
  const screenHeight = window.screen.height
  const height = (screenHeight * 0.55);
  const isPickupDisable:boolean = useAppSelector(state => state.root.pickup.disabled);
const isDestinationDisable:boolean = useAppSelector(state => state.root.destination.disabled);
  

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
      minHeight: '100vh',
      //height: '100%',
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
    <div className={ isPickupDisable && isDestinationDisable ? `sm:overflow-y-scroll sm:min-h-[340px] mt-[-20px] scroll`: ''}>
      {children}  
    </div>     
  </Wrapper>: 
     <div className='container'>
       <SwipeableBottomSheet
					overflowHeight={height}
					open={open}
         	onChange={openBottomSheet}
          fullScreen = {true}
          style={{
            position: 'relative',
            zIndex: 10,
            //minHeight: '100vh',
          }}
          overlay = {false} 
				>
          {isLoading && <div className='text-black bg-white absolute top-0 bottom-0 w-full h-[50vh] left-0 z-20 sm:rounded-xl'>
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


