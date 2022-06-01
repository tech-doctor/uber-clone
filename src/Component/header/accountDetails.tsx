import React,{useRef, useEffect} from "react";
import GreetUser from "../account";
import { GearSVG, HeadSetSVG, RecieptSVG, TagSVG, WalletSVG } from "../const/svg";
import { Menu, List } from "../styles/header";

interface Props {
  showAccount: boolean;
  setShowAccount: (value: boolean) => void;
}

const Account:React.FC<Props> = ({showAccount, setShowAccount}) => {
  const container = useRef<HTMLDivElement>(null);
  const handleClick = (e:any) => {
    if(container.current && !container.current.contains(e.target)){
      setShowAccount(false);
    }   
   }
   useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    }
  })

	return (
		<Menu className="absolute top-10% right-3 xl:right-14"  ref = {container}>
      <div>
        <GreetUser />
      </div>
		  <ul className="lists">
        <List>
          <button className="flex items-center">
          <RecieptSVG/>
          <div className='font-sans text-lg font-medium ml-2'>My trips</div>
          </button>
        </List>
        <List>
				  <button className="flex items-center">
            <WalletSVG/>
           <div className='font-sans text-lg font-medium ml-2'>Wallet</div>
				  </button>
        </List>
        <List>
				  <button className="flex items-center">
            <TagSVG/>
           <div className='font-sans text-lg font-medium ml-2'>Promo</div>
				  </button>
        </List>
        <List>
				  <button className="flex items-center">
           <HeadSetSVG/>
           <div className='font-sans text-lg font-medium ml-2'>Support Messaage</div>
				  </button>
        </List>
        <List>
				  <button className="flex items-center">
          <GearSVG/>
           <div className='font-sans text-lg font-medium ml-2'>Profile setting</div>
				  </button>
        </List> 
		  </ul>
    </Menu>
	)
}

export default Account;