import styled, {keyframes} from "styled-components";

const fadeIn = keyframes`
 0% {
    opacity: 0; 
    top: 6%; 
  }
  50%{
    opacity: 0.9;
    top: 6.5%;
  }
  100% {opacity: 1;
    top: 6.5%;
  }
  `
  
export const Menu = styled.div`
  box-shadow: rgb(0 0 0 / 16%) 0px 2px 5px;
  background-color: rgb(235, 235, 235);
  width: fit-content;
  block-size: fit-content;
  margin: 0.5em;
  animation: ${fadeIn} 0.3s ease-in-out;
  z-index: 30;
`

export const List = styled.li`
  list-style: none;
  padding: 0.5em 0.8em;
  &:hover{
    background-color: rgb(245, 245, 245);
  }
`

export const MobileNav = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  width: 100%;
  padding: 0.3em 0.8em;

`


const sidebarAnimation = keyframes`
 0% {
    left: 180px; 
  }
  
  100% {
    left: 0;
  }
  `


export const SideBar= styled.div` 
 width: 100%;
 padding: 1em 0.8em;
 height: 100vh;
 position: absolute;
 top: 0;
 left: 0;
 background-color: white;
 z-index: 50;
 overflow:hidden;
 animation: ${sidebarAnimation} 0.4s ease-in-out;
`
 
