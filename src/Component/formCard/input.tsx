import React, {useState, useEffect, useRef} from "react";
import Suggestions from "./suggestion";

const FormInput:React.FC = () => {
  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
   



  return(
    <div>
      <div className="input_fields relative">
        <div className="icons absolute  top-6 left-5">
          <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><title>Circle small</title><path fillRule="evenodd" clipRule="evenodd" d="M12 14a2 2 0 100-4 2 2 0 000 4zm5-2a5 5 0 11-10 0 5 5 0 0110 0z" fill="currentColor"></path></svg>
          <img className="w-[2px] h-12  relative left-[7px]" alt="link" style={{backgroundColor: 'black'}} src="https://img.icons8.com/ios-glyphs/344/vertical-line.png"/>
          <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><title>Square small</title><path fillRule="evenodd" clipRule="evenodd" d="M14 10h-4v4h4v-4zM7 7v10h10V7H7z" fill="currentColor"></path></svg>
        </div>
        <div className="input_field">
          <input 
          className="w-full my-2  py-3 pl-14 border-none focus:ring-2  focus:ring-black bg-light-gray"
          type = 'search' 
          placeholder = 'Add pickup location'
          />
           <br/> 
          <input 
          className="w-full my-2 py-3 pl-14 border-none focus:ring-2  focus:ring-black bg-light-gray"
          type = 'search' 
          placeholder = 'Enter your destination'
          />
        </div>
      </div>
      <div className="flex items-center bg-light-gray w-fit py-1.5 px-5 rounded-3xl my-2">
        <div className="leave-time">
          <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><title>Clock</title><path d="M12 1C5.9 1 1 5.9 1 12s4.9 11 11 11 11-4.9 11-11S18.1 1 12 1zm6 13h-8V4h3v7h5v3z" fill="currentColor"></path>
          </svg>
        </div>
        <div className="ml-2 font-medium">
          Leave Now
        </div>
      </div>
      <div>
        <Suggestions/>
      </div>
    </div>
  )
}



export default FormInput;




//  const [query, setQuery] = useState('');
//   const autocompleteRef: React.MutableRefObject<any> = useRef(null);


//   let autoComplete; 
//  const loadScript = (url, callback) => {
//    let script:any = document.createElement('script');
//    script.type = 'text/javascript';
//    if(script.readyState) {
//      script.onreadystatechange = () => {
//        if(script.readyState === 'loaded' || script.readyState === 'complete') {
//          script.onreadystatechange = null;
//          callback();
//        }
//      };
//    }else{
//      script.onload = () => {
//        callback();
//      }
//    }
//    script.src = url;
//    document.getElementsByTagName('head')[0].appendChild(script);
//  }

//  const handleScriptLoad = (updateQuery, autoCompleteRef) => {
//     autoComplete = new window.google.maps.places.Autocomplete(autocompleteRef.current, {
//      types: ['address'], componentRestrictions: {country: 'ng'}
//    });
//    autoComplete.setFields(['address_component', 'formatted_address']);
//    autoComplete.addListener('place_changed', () => {
//      handlePlaceSelect(updateQuery);
//    });
//  }

//  const handlePlaceSelect = (updateQuery) => {
//    const addressObject = autoComplete.getPlace();
//    const query = addressObject.formatted_address;
//    // const latitude = addressObject.geometry.location.lat();
//    // const longitude = addressObject.geometry.location.lng();
//    // updateQuery(query, latitude, longitude);
//    updateQuery(addressObject);
//    console.log(addressObject);

//  }

//  useEffect(() => {
//    loadScript(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`
//    , () => handleScriptLoad(setQuery, autocompleteRef));
//  }, [autocompleteRef]);
