import {useHistory} from 'react-router-dom';
import { Modal } from "./styles";

const  ErrorFallback = ({error, resetErrorBoundary}) =>{
  const history = useHistory();
 
  return (
    <Modal className=" py-3 px-4 lg:py-5 lg:px-7 w-[70%] sm:w-[60%]  md:w-[50%] lg:w-[40%] bg-gray-50 shadow-sm shadow-gray-400 rounded-2x " role="alert">
      <h2 className="text-xl md:text-2xl font-semibold">Something went wrong...</h2>
      <p className="my-5 md:my-8">Please Try again in a moment</p>
      <button
      onClick={() => {
        resetErrorBoundary();
        history.push("/");
      }}
      className="w-full center bg-black text-white text-md lg:text-lg font-semibold p-1 md:p-2 hover:opacity-80"
      >Change</button>
    </Modal>
  )
}

  export default ErrorFallback;