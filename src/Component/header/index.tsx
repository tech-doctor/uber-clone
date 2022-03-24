import React, {useState} from 'react';
import Account from './account';
import Dropdown from './dropdown';
import MenuBar from './menubar';

const Header:React.FC = ()=> {
  interface position {
    position: string;
    top: string;
    left: string;
  } 
  const position = (top:string, left: string):position => {
    const  position = {
      position: 'absolute',
      top: top,
      left: left,
    }
    return position;
  }

  const [showRide, setShowRide] = useState<boolean>(false);
  const [showDrive, setShowDrive] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [showAccount, setShowAccount] = useState<boolean>(true);


  return (
    <div className='hidde md:block '>
      <MenuBar
      showRide={showRide}
      setShowRide={setShowRide}
      showDrive={showDrive}
      setShowDrive={setShowDrive}
      showMore={showMore}
      setShowMore={setShowMore}
      showAccount={showAccount}
      setShowAccount={setShowAccount}
      />
      {showRide? <Dropdown
        key = {1}
        title = "Ride"
        position = {position}
        firstList = {{name: "Overview", link: "https://www.uber.com/ride"}}
        secondList = {{name: "Safety", link: "https://www.uber.com/ride/safety"}}
        thirdList = {{name: "Cities", link: "https://www.uber.com/cities"}}
        fourthList = {{name: "Airports", link: "https://www.uber.com/airports"}}
        fifthList = {{name: "Business", link: "https://www.uber.com/business"}}
      />: '' }
      
      {showDrive? <Dropdown
        key = {2}
        title = "Drive"
        position = {position}
        firstList = {{name: "Overview", link: "https://www.uber.com/drive"}}
        secondList = {{name: "Requirements", link: "https://www.uber.com/drive/requirements"}}
        thirdList = {{name: "Vehicle Solutions", link: "https://www.uber.com/drive/vehicle-solutions"}}
        fourthList = {{name: "Insurance", link: "https://www.uber.com/drive/insurance"}}
        fifthList = {{name: "Rewards", link: "https://www.uber.com/drive/rewards"}}
        sixthList = {{name: "Delivery", link: "https://www.uber.com/drive/delivery"}}
      />: ''}

      {showMore? <Dropdown
        key = {3}
        title = "More"
        position = {position}
        firstList = {{name: "Uber Eats", link: "https://www.ubereats.com/"}}
        secondList= {{name: "Uber for Business", link: "https://www.uber.com/business"}}
        thirdList = {{name: "Delivery", link: "https://www.uber.com/drive/delivery"}}
        fourthList = {{name: "Uber Freight", link: "https://freight.uber.com/"}}
        fifthList = {{name: "Uber Health", link: "https://www.uberhealth.com/"}}
      />: '' }
      {showAccount? 
      <Account/>:''}
    </div>
    
  )
}

  
export default Header;