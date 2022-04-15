import React, {useState} from 'react';
import {useLocation, useHistory } from "react-router-dom";
import { MobileNav } from '../../styles/header';
import Sidebar from './sidebar';

const MobileHeader:React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const [showSideBar, setShowSideBar] = useState<boolean>(false);


 const handleClick = () =>{
    setShowSideBar(!showSideBar);
 }

  return(
    <div className='sm:hidden'>
    <MobileNav>
      <div className="uber bg-inherit py-1">
        {location.pathname ==='/' ?
         <a href="https://www.uber.com/">
          <div className='font-sans text-2xl font-normal'>Uber</div>
        </a> : 
        <svg 
        onClick={(() => history.goBack())} 
        width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none"><title>Arrow left</title><path d="M22 13.5H6.3l5.5 7.5H8.3l-6.5-9 6.5-9h3.5l-5.5 7.5H22v3z" fill="currentColor"></path></svg>
        }  
      </div>
      <div 
        onClick={handleClick}
        className="icon cursor-pointer">
        <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><title>Person</title><path fillRule="evenodd" clipRule="evenodd" d="M17.5 6.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0zM3 20c0-3.3 2.7-6 6-6h6c3.3 0 6 2.7 6 6v3H3v-3z" fill="currentColor"></path></svg>
      </div>
    </MobileNav>
  {showSideBar ? <div>
      <Sidebar
      showSideBar={showSideBar}
      setShowSideBar={setShowSideBar}
      />
    </div>: '' }  
  </div>	
	)
}
export default MobileHeader;