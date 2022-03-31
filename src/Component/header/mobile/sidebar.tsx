import React, {useState} from "react";
import GreetUser from "../../account";
import { SideBar,List } from "../../styles/header";

interface Props {
  showSideBar: boolean;
  setShowSideBar: (showSideBar: boolean) => void;
}


const Sidebar:React.FC<Props> = ({showSideBar, setShowSideBar}) => {
  const [Opacity, setOpacity] = useState<number>(1)
  let style = {
    opacity: Opacity,
    transition: 'opacity 0.5s ease-in-out'
  }

  const handleClick = () => {
    setOpacity(0)
    setTimeout(() => {
      setShowSideBar(!showSideBar);
    } , 1000)
  }

	return (
		<SideBar style = {style}>
      <div 
      onClick={handleClick}
      className="close cursor-pointer text-xl flex justify-end">
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" data-baseweb="icon" color="inherit"><title>Close</title><path d="M18.1 8.1l-2.2-2.2-3.9 4-3.9-4-2.2 2.2 4 3.9-4 3.9 2.2 2.2 3.9-4 3.9 4 2.2-2.2-4-3.9 4-3.9z" fill="currentColor"></path></svg>
      </div>
      <div className="m-auto w-4/5 my-2">
      <div>
        <GreetUser />
      </div>
		  <ul className="lists">
        <List>
          <a href="#" className="flex items-center">
          <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><title>Receipt</title><path d="M3 23V1h18v22l-5.5-3-3.5 3-3.5-3L3 23zM7 9h10V6H7v3zm10 3H7v3h10v-3z" fill="currentColor"></path></svg>
          <div className='font-sans text-lg font-medium ml-2'>My trips</div>
          </a>
        </List>
        <List className="my-2">
				  <a href="#" className="flex items-center">
            <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><title>Wallet</title><path d="M14.12 14H9.88l-3-3H1v9h22v-9h-5.88l-3 3z" fill="currentColor"></path>,<path d="M1 4v4h7.12l3 3h1.76l3-3H23V4H1z" fill="currentColor"></path></svg>
           <div className='font-sans text-lg font-medium ml-2'>Wallet</div>
				  </a>
        </List>
        <List>
				  <a href="#" className="flex items-center">
          <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><title>Tag</title><path d="M10 24l12-12V2H12L0 14l10 10z" fill="currentColor"></path></svg>
           <div className='font-sans text-lg font-medium ml-2'>Promo</div>
				  </a>
        </List>
        <List className="my-2">
				  <a href="#" className="flex items-center">
          <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><title>Headset</title><path d="M12 1C6.49 1 2 5.49 2 11v2c0 5.51 4.49 10 10 10v-3c-2.79 0-5.2-1.64-6.32-4H8V9H5.29C6.15 6.11 8.83 4 12 4s5.85 2.11 6.71 5H16v7h5.54c.3-.95.46-1.95.46-3v-2c0-5.51-4.49-10-10-10z" fill="currentColor"></path></svg>
           <div className='font-sans text-lg font-medium ml-2'>Support Messaage</div>
				  </a>
        </List>
        <List>
				  <a href="#" className="flex items-center">
          <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><title>Gear</title><path d="M23 13.5v-3h-3.1c-.2-1.1-.6-2.1-1.2-3l2.2-2.2-2.1-2.1-2.2 2.2c-.9-.6-1.9-1-3-1.2V1h-3v3.1c-1.1.2-2.1.6-3 1.2L5.4 3.1 3.3 5.2l2.2 2.2c-.6.9-1 1.9-1.2 3H1.2v3h3.1c.2 1.1.6 2.1 1.2 3l-2.2 2.2 2.1 2.1 2.2-2.2c.9.6 1.9 1 3 1.2v3.1h3v-3.1c1.1-.2 2.1-.6 3-1.2l2.2 2.2 2.1-2.1-2.2-2.2c.6-.9 1-1.9 1.2-3H23v.1zM12 16c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" fill="currentColor"></path></svg>
           <div className='font-sans text-lg font-medium ml-2'>Profile setting</div>
				  </a>
        </List> 
		  </ul>
      </div>
		</SideBar>
	)
}

export default Sidebar;