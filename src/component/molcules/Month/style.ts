import styled from 'styled-components'

export const MonthComponent = styled.div`
  height: calc(100vh - 30px);
  width: 100%;
`

export const MonthRow = styled.div`
  width: calc(100vw - 350px);
  &:first-child{
    background-color: #e0e0e0;
  color: red;
  }
  &:last-child{
    background-color: #e0e0e0;
  color: rgb(61, 61, 255);
  }
`

export const MonthDay = styled.div`
  width: calc((100vw - 366px) / 7);
  text-align: right;
  float: left;
  font-weight: 600;
  border-right: 1px solid #e9e9e9;
  border-bottom: 1px solid #e9e9e9;
  transition: background-color 0.4s;
`
export const MonthDisplay = styled.div`
  text-align: left;
  width: 100%;
  height: 80%;
  overflow: hidden;
`

export const MonthBox = styled.div`
  width: calc((100vw - 366px) / 7);
  text-align: right;
  float: left;
  font-weight: 600;
  border-right: 1px solid #e9e9e9;
  border-bottom: 1px solid #e9e9e9;
  transition: background-color 0.4s;
    cursor: pointer;
    color: black;
    height: calc((100vh - 30px) / 7);
  & div, & span {
   pointer-events: none;
  }
  &:hover{
    background-color: green !important;
  }
  &:first-child{
    background-color: #e0e0e0;
    color: red;
  }
  &:last-child{
    background-color: #e0e0e0;
    color: rgb(61, 61, 255);
  }
  &.month-selected {
    color: skyblue !important;
  }
  &.monthSelected{
    background-color: violet !important;
  }
  &.month-grayed {
    color: #e9e9e9 !important;
    cursor: unset;
    background-color: transparent !important;
  }
  &.month-grayed:hover {
    background-color: transparent !important;
  }
`





