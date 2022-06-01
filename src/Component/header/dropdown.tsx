import React,{useRef,useEffect} from "react";
import { Menu, List } from "../styles/header";

interface Name {
  name: string;
  link: string;
}

interface Props {
  key: number;
  title: string;
  position: (top:string, left:string) => object;
  firstList: Name;
  secondList: Name;
  thirdList:Name;
  fourthList: Name;
  fifthList: Name;
  sixthList?: Name;
  setShowRide?: (value: boolean) => void;
  setShowDrive?: (value: boolean) => void;
  setShowMore?: (value: boolean) => void;
}

const Dropdown:React.FC<Props> = ({
  title,
  position,
  firstList,
  secondList,
  thirdList,
  fourthList,
  fifthList,
  sixthList,
  setShowRide,
  setShowDrive,
  setShowMore,
}) => {
  const myPosition = ():any => {
    if(title === 'Ride'){
      return position( '6.5%', '15%');
    }else if(title === 'Drive'){
      return position( '6.5%', '20%');
    }else if(title === 'More'){
      return position( '6.5%', '25%');  
    }
  }

  const container = useRef<HTMLDivElement>(null);
  const handleClick = (e:any) => {
    if(container.current && !container.current.contains(e.target)){
      setShowRide && setShowRide(false);
      setShowDrive && setShowDrive(false);
      setShowMore && setShowMore(false);
    }   
   }

   useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    }
  })
    
  

	return (
      <Menu
    ref={container} 
    style={myPosition()}>
		  <ul className="lists">
        <List>
            <a href = {firstList.link}>
            <div className='font-sans text-lg font-medium'>{firstList.name}</div>
            </a>
        </List>
        <List>
				  <a href= {secondList.link}>
           <div className='font-sans text-lg font-medium'>{secondList.name}</div>
				  </a>
        </List>
        <List>
				  <a href= {thirdList.link}>
           <div className='font-sans text-lg font-medium'>{thirdList.name}</div>
				  </a>
        </List>
        <List>
				  <a href= {fourthList.link}>
           <div className='font-sans text-lg font-medium'>{fourthList.name}</div>
				  </a>
        </List>
        <List>
				  <a href= {fifthList.link}>
           <div className='font-sans text-lg font-medium'>{fifthList.name}</div>
				  </a>
        </List> 
        {sixthList && (
          <List>
            <a href= {sixthList.link}>
              <div className='font-sans text-lg font-medium'>{sixthList.name}</div>
            </a>
          </List>
        )} 
		  </ul>
    </Menu>  
	)
}

export default Dropdown;