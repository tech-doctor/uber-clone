import React from 'react';
import SwipeableBottomSheet from 'react-swipeable-bottom-sheet';
import  {useMediaPredicate} from 'react-media-hook';
import { Wrapper } from '../styles/card';
import FormHeading from '../formCard/heading';
import FormInput from '../formCard/input';

interface Props {
  heading: string;
  requestCategory?: string;
  children?: React.ReactNode;
}


const FormCard:React.FC<Props> = ({heading, children, requestCategory}) => {
  // const screenHeight = window.screen.height
  // const initialHeight = (screenHeight * 0.5);
  const [open, setOpen] = React.useState(false);

  const openBottomSheet = (open) => {
    setOpen(open);
  }
  
  const toggleBottomSheet = () => {
    openBottomSheet(true);
  }

  const styles:any ={
    text:{
      padding: '10px',
      boxSizing: 'border-box',
      backgroundColor: 'white',
      fontSize: '18px',
      minHeight: '90vh',
      position: 'relative'
    }
  };


  const  biggerScreen = useMediaPredicate('(min-width: 640px)');
  return (
    <div>
      {biggerScreen ? 
      <Wrapper className = 'sm:min-w-[450px]   absolute bottom-0 w-full h-1/2 rounded-none sm:left-[5%] md:left-[10%] sm:w-[450px] sm:top-20 sm:h-fit sm:rounded-xl'>
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
     <div>
       <SwipeableBottomSheet
					overflowHeight={370}
					open={open}
					onChange={openBottomSheet}
				>
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

{/* <SwipeableBottomSheet overflowHeight={64}>
    <div style={{ height: '240px' }}>
        Here goes the content of your bottom sheet
    </div>
</SwipeableBottomSheet> */}



{/* <SwipeableBottomSheet overflowHeight={300}>
<div style={{ height: '240px' }}>
  <Wrapper className=''>
  <div className = 'sm:hidden h-1 bg-gray-200 w-14 rounded-lg m-auto '></div>
    <FormHeading 
      heading = {heading}
      />
      <FormInput/>
      <div>
        {children}  
      </div>     
    </Wrapper>  
</div> 
</SwipeableBottomSheet> */}





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


