import React,{useState} from 'react';
import { Wrapper } from '../styles/card';
import FormHeading from '../formCard/heading';
import FormInput from '../formCard/input';

interface Props {
  heading: string;
  requestCategory?: string;
}

const FormCard:React.FC<Props> = ({heading, children, requestCategory}) => {
  return(
    <Wrapper className=' sm:min-w-[450px]   absolute bottom-0 w-full h-1/2 rounded-none sm:left-[5%] md:left-[10%] sm:w-[450px] sm:top-20 sm:h-fit sm:rounded-xl'>
      <FormHeading 
      heading = {heading}
      />
      <FormInput/>
      <div>
        {children}  
      </div>  
      {requestCategory && <div className='bg-white w-full absolute left-0 bottom-0 px-3 py-5  shadow-[1px_-3px_6px_0px_rgba(0,0,0,0.1)] shadow-gray-300'>
        <div className='cash_request flex pb-2.5'>
          <div className="icon">
            <img  className='w-[20px]  h-[20px'
            alt="payment-method" src="https://tb-static.uber.com/prod/wallet/icons/stored_value_3x.png"></img>
          </div>
          <div className="details  font-medium ml-4">
            Uber cash . Business
          </div>
        </div>
        <button className='button font-medium bg-black text-white text-xl w-full py-3 hover:opacity-80'>
          {requestCategory}
        </button>
      </div>}
      
    </Wrapper>
  )
}

export default FormCard;