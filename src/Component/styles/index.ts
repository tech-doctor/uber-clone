import styled,{keyframes} from "styled-components";

// export const Container = styled.div`
//     display: flex;
//     justify-content:space-evenly;
//     align-items: center;
//     color: white;
//     padding: 1em;
//     background-color: #131A22;
// `

export const Menu = styled.div`
  box-shadow: rgb(0 0 0 / 16%) 0px 2px 5px;
  background-color: rgb(235, 235, 235);
  width: fit-content;
  block-size: fit-content;
  margin: 0.5em;
`

export const List = styled.li`
  list-style: none;
  padding: 0.5em 0.8em;
  &:hover{
    background-color: rgb(245, 245, 245);
  }
`
