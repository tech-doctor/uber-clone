import {useEffect, useRef} from 'react'
import { Modal } from "../../Component/styles";

interface Props{
  openResponseModal: boolean;
  setOpenResponseModal: (open: boolean) => void;
  buttonRef: any;
}

const Response:React.FC<Props> =({openResponseModal, setOpenResponseModal, buttonRef}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  console.log(modalRef.current)


  const handleClick = (e:any) => {
    if(modalRef.current && !modalRef.current.contains(e.target) && !buttonRef.current.contains(e.target)){
       setOpenResponseModal(false);
    }   
   }

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    }
  })


  return(
    <div className={openResponseModal?`fixed top-0 w-full h-full left-0`: `hidden`} >
      <Modal ref={modalRef} className=" z-30 opacity-1 py-3 px-4 lg:py-5 lg:px-7 w-[90%] sm:w-[60%]  md:w-[50%] lg:w-[40%] bg-gray-50 shadow-sm shadow-gray-400 rounded-xl" role="alert">
      <h2 className=" text-lg sm:text-xl md:text-2xl font-medium text-center">What are you trying to do? &#128527;</h2>
      <p className="my-4 md:my-6 text-center">Are you really trying to book a ride?&#128514;&#128514;, this is just a personal project for practice dawg..&#128541;</p>
      <p></p>
      <button
      onClick={() => {
        setOpenResponseModal(false)
      }}
      className="w-full center bg-black text-white text-md lg:text-lg font-semibold p-1 md:p-2 hover:opacity-80"
      >Close</button>
      </Modal>
      <div className="fixed top-0 w-full h-full left-0 bottom-0 bg-black opacity-90" >
      </div>
      </div>
  )
}

export default Response;