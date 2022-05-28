import styled, {createGlobalStyle, keyframes} from 'styled-components';

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline:0;
        box-sizing:border-box;
        font-family: 'Open Sans', sans-serif; 
    }
    #root{
        margin:0 auto;
    }
 `

 const zoomOut = keyframes`
    0% {
      opacity: 0;
      //transform: scale(0.6);
      
        
    }
    100% {
      opacity: 1;
      //transform: scale(1); 
        
    }
 `

export const Modal = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 1em 1.2em;
    animation: ${zoomOut} 1s ease-in-out;
`
