import React from 'react';

const  GreetUser:React.FC = () => {
  const userName = localStorage.getItem('userName')
   const accountName = userName?.split(' ')[0]

  return(
    <div className="font-sans text-2xl font-medium px-3 py-3">
      {`Hey, ${accountName?accountName: null}`}
    </div>
  )
}
  
export default GreetUser;