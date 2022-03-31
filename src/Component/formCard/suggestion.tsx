import React from "react";


const Suggestions:React.FC =  () => {
  return (
    <div className="my-5">
      <div className="each_suggestion flex items-center my-3 cursor-pointer">
        <div className="icon bg-light-gray p-2.5 rounded-full mb-3">
          <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" color="#000000"><title>Location marker</title><path d="M18.7 3.8C15 .1 9 .1 5.3 3.8c-3.7 3.7-3.7 9.8 0 13.5L12 24l6.7-6.8c3.7-3.6 3.7-9.7 0-13.4zM12 12.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="currentColor"></path></svg>
        </div>
        <div className=" font-san leading-tight text ml-4 border-solid border-b-2 border-gray-200 w-full tracking-tight pb-3">
          <span className="font-medium leading-tight"> 1 Abule Ijesha Rd</span><br/>
          <span className=" text-gray-500 font-normal leading-tight tracking-tight ">Abule Ijesha, 100001.Lagos</span>
        </div>
      </div>

      <div className="each_suggestion flex items-center my-3 cursor-pointer">
        <div className="icon bg-light-gray p-2.5 rounded-full mb-3">
          <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" color="#000000"><title>Location marker</title><path d="M18.7 3.8C15 .1 9 .1 5.3 3.8c-3.7 3.7-3.7 9.8 0 13.5L12 24l6.7-6.8c3.7-3.6 3.7-9.7 0-13.4zM12 12.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" fill="currentColor"></path></svg>
        </div>
        <div className=" font-san leading-tight text ml-4 border-solid border-b-2 border-gray-200 w-full tracking-tight pb-3">
          <span className="font-medium leading-tight"> 1 Abule Ijesha Rd</span><br/>
          <span className=" text-gray-500 font-normal leading-tight tracking-tight ">Abule Ijesha, 100001.Lagos</span>
        </div>
      </div>

    </div>
  )
}

export default Suggestions;