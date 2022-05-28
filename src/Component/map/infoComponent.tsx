import { InfoBox } from "@react-google-maps/api";
import { RightAngleSVG } from "../const/svg";



const infoComponent = ({center, place}) => {
  return(
    <InfoBox
      onLoad={(infoBox) => {
        console.log(infoBox);
      }}
      options={{
        pixelOffset: new google.maps.Size(9, -56),
        closeBoxURL: ``,
        enableEventPropagation: true,
        boxStyle: {
          backgroundColor: '#fff',
        },
        closeBoxMargin: '0px 0px 0px 0px',
        
        isHidden: false,
      }}
      position={center}
    >
    <div className='p-[0.1em] text-[15px] sm:text-[16px] bg-white font-medium text-black w-fit'>
        <div className='flex items-center justify-between shadow-[0_50px_10px_50px] shadow-gray-100 sh px-3 py-2 bg-white'>
        <span>{place}</span>
        <span className='pl-2'><RightAngleSVG/></span>
        </div> 
      </div>
    </InfoBox> 
  )
}

export default infoComponent;