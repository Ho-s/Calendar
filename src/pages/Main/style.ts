import styled from "styled-components";

export const AddSchedule = styled.button`
  background-color: #292726;
  color: white;
  position: relative;
  height: 40px;
  width: 320px;
  margin: 5px 15px;
  text-align: center;
  font-size: 18px;
  cursor: pointer;
  outline: 0;
  border: 0;
  border: 1px solid transparent;
  -webkit-transition: all 0.4s cubic-bezier(0.5, 0.24, 0, 1);
  transition: all 0.4s cubic-bezier(0.5, 0.24, 0, 1);
  &::before {
    content: "";
    position: absolute;
    left: 0px;
    bottom: 0px;
    z-index: 1;
    width: 0%;
    height: 1px;
    background: gray;
    box-shadow: inset 0px 0px 0px gray;
    display: block;
    -webkit-transition: all 0.4s cubic-bezier(0.5, 0.24, 0, 1);
    transition: all 0.4s cubic-bezier(0.5, 0.24, 0, 1);
}
    &:hover::before{
    width: 100%;
    }
    &::after {
  content: "";
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 1;
  width: 0%;
  height: 1px;
  background: gray;
  -webkit-transition: all 0.4s cubic-bezier(0.5, 0.24, 0, 1);
  transition: all 0.4s cubic-bezier(0.5, 0.24, 0, 1);
}
&:hover::after {
  width: 100%;
}
    &:hover{
        border-left: 1px solid gray;
  border-right: 1px solid gray;
    }
    & div {
        content: "";
  color: white;
  position: absolute;
  top: 3px;
  right: 0;
  opacity: 0;
  font-size: 20px;
  transition: 0.2s;
  z-index: 1;
    }
`