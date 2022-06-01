import {useHistory} from 'react-router-dom';
import { Modal } from "./styles";



const  ErrorFallback = ({resetErrorBoundary}) =>{
  const history = useHistory();
  return (
    <Modal className=" py-3 px-4 lg:py-5 lg:px-7 w-[90%] sm:w-[60%]  md:w-[50%] lg:w-[40%] bg-gray-50 shadow-sm shadow-gray-400 rounded-2x " role="alert">
      <h2 className=" text-lg sm:text-xl md:text-2xl font-semibold">Something went wrong...</h2>
      <p className="my-5 md:my-8 font-mono">Route not accessable, select a nearer location and try again...</p>
      <button
      onClick={() => {
        resetErrorBoundary();
        history.push("/");
        window.location.reload();
      }}
      className="w-full center bg-black text-white text-md lg:text-lg font-semibold p-1 md:p-2 hover:opacity-80"
      >Back</button>
    </Modal>
  )
}

  export default ErrorFallback;