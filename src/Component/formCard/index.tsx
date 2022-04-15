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
    </Wrapper>
  )
}

export default FormCard;