 import {useEffect, useState} from 'react';
 import { app } from "../../firebase";
 import { getAuth, GoogleAuthProvider, FacebookAuthProvider,signInWithPopup} from "firebase/auth";
import { FacebookSVG, LogoSVG, GoogleSVG } from "../../Component/const/svg";

const Auth = () => {
  const auth = getAuth(app);
  const [isError, setIsError] = useState(false)
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
          <section className=" my-[2em] sm:my-[7em]">
            {isError && <div className="error_message w-[90%] sm:w-[400px] mx-auto bg-red-100 py-3 text-center">
            Something went wrong. Please try again!.
          </div>}
            <div
            onClick={signInWithFacebook}
             className="facebook cursor-pointer flex items-center w-[90%] sm:w-[400px] mx-auto px-3 py-3 border border-solid border-black my-3 hover:bg-gray-50">
              <FacebookSVG/>
              <button className="text-center w-full text-md font-bold" >Continue with Facebook
              </button>
            </div>
            <div 
             onClick={signInWithGoogle}
            className="google flex cursor-pointer items-center w-[90%] sm:w-[400px] mx-auto px-3 py-3 border border-solid border-black my-3 hover:bg-gray-50">
              <GoogleSVG/>
              <button
              className="text-center w-full text-md font-bold"
              >Continue with Google</button>
            </div>
          </section>
        </div>
    );
}
export default Auth;