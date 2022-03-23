import React from "react";

const MenuBar: React.FC = () => {
  return(
    <nav className="nav_bar bg-black text-white p-3 px-2 md:px-7 lg:px-20">
    <div className="nav_bar_container flex items-center justify-between px-2 md:px-7 lg:px-20">
      <ul className="nav_left flex items-center ">
        <li className="nav_bar_logo mr-14">
          <a href="https://www.uber.com/">
            <div className='font-sans text-2xl font-normal'>Uber</div>
          </a>
        </li>
        <li className="left_nav_bar_item text-lg">
          <button className="ride font-san font-medium">Ride</button>
        </li>
        <li className="left_nav_bar_item ml-6 text-lg">
          <button className="drive font-medium">Drive</button>
        </li>
        <li className="left_nav_bar_item ml-6 text-lg">
          <button className="more font-medium">More</button>
        </li>
      </ul>
      <ul className="nav_right flex items-center">
        <li className="help text-lg font-medium">
          <a href="https://help.uber.com/riders">
            <div>Help</div>
          </a> 
        </li>
        <li className="Acc_name ml-6 text-lg">
          <button className='font-medium'>Oluka</button>
        </li>
      </ul>  
    </div>
  </nav>
  )
}


export default MenuBar;