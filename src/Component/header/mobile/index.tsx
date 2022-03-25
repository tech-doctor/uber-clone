import React, {useState} from 'react';
import { MobileNav } from '../../styles';
import Sidebar from './sidebar';

const MobileHeader:React.FC = () => {
  const [showSideBar, setShowSideBar] = useState<boolean>(false);

 const handleClick = () =>{
    setShowSideBar(!showSideBar);
 }

  return(
    <div>
      <MobileNav>
    <div className="uber">
      <a href="https://www.uber.com/">
        <div className='font-sans text-2xl font-normal'>Uber</div>
      </a>
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