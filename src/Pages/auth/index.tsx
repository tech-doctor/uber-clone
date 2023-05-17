 import {useEffect, useState} from 'react';
 import { app } from "../../firebase";
 import { getAuth, GoogleAuthProvider, FacebookAuthProvider,signInWithPopup} from "firebase/auth";
import { FacebookSVG, LogoSVG, GoogleSVG } from "../../Component/const/svg";

const Auth = () => {
  const auth = getAuth(app);
  const [isError, setIsError] = useState(false);
  const [input, setinput] = useState('');


  const handleChange = (event:any) =>{
    setinput(event.target.value)
  }
  //const [isAuthorised, setIsAuthorised] = useState(false)


  // useEffect(() => {
  //    const userName = localStorage.getItem('userName');
  //     if (userName) {
  //       window.location.href = "/";
  //     }
  //   },[isAuthorised]);

  const signInWithGoogle = () => {
     const provider = new GoogleAuthProvider();
     signInWithPopup(auth, provider)
     .then((result) => {
      const name = result.user.displayName;
      console.log(name);
      if(name){
        localStorage.setItem('userName', name)
        //setIsAuthorised(true)
        window.location.reload()
        
      }

     }).catch((error) => {
       console.log(error);
       if(!error.code && !error.message && !error.customData){
         setIsError(true)
      }
     });
  }
 
 const signInWithFacebook = () => {
     const provider = new FacebookAuthProvider();
     signInWithPopup(auth, provider)
     .then((result) => {
         const name = result.user.displayName;
         console.log(name);
         if(name){
          localStorage.setItem('userName', name)
         window.location.reload()
        }
         }
     ).catch((error) => {
       console.log(error);
       if(!error.code && !error.message && !error.customData){
          setIsError(true)
       }
     }
     );
 }
 
    return (
        <div>
          <header className="bg-black py-6 px-6 md:px-8 cursor-pointer">
            <LogoSVG/>
          </header>
          <section className=" my-[2em] sm:my-[7em]  mx-auto w-[90%] sm:w-[380px] font-[arial] placeholder-text-reed-400">
          {isError && <div className="error_message  mx-auto bg-red-100 py-3 text-center text-red-600 rounded-lg mb-3">
            Something went wrong. Please try again!.
          </div>}
            <form className='login'>
                <h2 className='text-2xl mb-3'>What's your phone number or email?</h2>
                <input className='focus:border bg-gray-200 w-full px-3 py-3 rounded-lg placeholder-gray-500'
                placeholder='Enter phone number or email'
                autoFocus
                inputMode='email'
                autoComplete='email'
                value={input}
                onChange={handleChange}
                />
                {!isPhoneNumberOrEmail(input) && input.length > 0 && <p className='text-red-600 text-sm font-medium my-1'>Please enter a phone number or email </p>
                }
                

                <button className='bg-black text-white w-full px-3 py-3 rounded-lg my-3 font-semibold'>Continue</button>
            </form>

            <span className="flex items-center my-2">
              <hr className="flex-grow border-t-1 border-gray-400 mr-2"/>
              <span className="text-gray-500">or</span>
              <hr className="flex-grow border-t-1 border-gray-400 ml-2"/>
            </span>
            
            <div className='social_media_auth'>
            <div 
              onClick={signInWithGoogle}
              className="google flex cursor-pointer justify-center   px-3 py-3  my-3 hover:bg-gray-200 font-[Arial] bg-gray-100 rounded-lg">
              <GoogleSVG/>
              <button
              className="text-center text-md font-semibold ml-3"
              >Continue with Google</button>
            </div>
            <div
            onClick={signInWithFacebook}
             className="facebook cursor-pointer flex justify-center px-3 py-3 my-3 hover:bg-gray-200 font-[Arial] bg-gray-100 rounded-lg">
              <FacebookSVG/>
              <button className="text-center ml-3 text-md font-semibold" >Continue with Facebook
              </button>
            </div>
            </div>
            < div className='info text-[#6B6B6B] text-[12px] mt-5'>
              <p>By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided.
              </p>
              <p>
              This site is protected by reCAPTCHA and the Google <a className='underline text-black' href='#'>Privacy Policy</a>  and <a className='underline text-black' href='#'>Terms of Service</a> apply.</p>
            </div>
            
          </section>
        </div>
    );
}


function isPhoneNumberOrEmail(input:any) {
  // Phone number regular expression
  const phoneNumberRegex = /^\+?[0-9()-]{7,20}$/;
  
  // Email regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Check if input matches phone number or email format
  if (phoneNumberRegex.test(input) || emailRegex.test(input)) {
    return true;
  } else {
    return false;
  }
}
export default Auth;