import { SpinnerCircularFixed } from 'spinners-react';

const Loading = () => {
	return(
		<div className='absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]'>
		<div className='font-medium text-md font-sans'>Loading</div>
		<div  className='mx-auto mt-3 text-center  w-fit'><SpinnerCircularFixed size={32} thickness={180} speed={180} color="#276EF1" secondaryColor="#EEEEEE" /></div>
	</div>
	)
}

export default Loading;