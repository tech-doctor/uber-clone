import React,{useState} from 'react';
import { Wrapper } from '../styles/card';
import FormHeading from '../formCard/heading';
import FormInput from '../formCard/input';



const FormCard:React.FC = () => {
  return(
    <Wrapper className='absolute  bottom-0 w-full h-1/2 rounded-none sm:left-[5%] md:left-[10%] sm:w-fit sm:top-20 sm:h-fit sm:rounded-xl'>
      <FormHeading/>
      <FormInput/>  
    </Wrapper>
  )
}

export default FormCard;