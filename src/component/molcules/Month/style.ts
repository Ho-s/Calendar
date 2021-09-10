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

export const MonthTitleWrapper = styled.div``

export const MonthTitleLeft = styled.span`
color: black;
font-size: 30px;
font-weight: 500;
`

export const MonthTitleRight = styled.span`
font-size: 36px;
color: red;
`

export const DaySpan = styled.span``

export const ScheduleWrapper = styled.div`
  display: block;
  width: 100%;
  height: 18px;
  position: relative;
`

interface ScheduleColorProps {
  backgroundColor: string
}

export const ScheduleColor = styled.div<ScheduleColorProps>`
margin-left: 6px;
margin-top: 4px;
float: left;
width: 10px;
border-radius: 10px;
height: 10px;
background-color:${(props)=>props.backgroundColor};
`

export const ScheduleTitle = styled.div`
margin-left: 6px;
float: left;
width: calc(100% - 71px);
text-overflow: ellipsis;
overflow: hidden;
white-space: nowrap;
font-weight: 600;
color: black;
`

export const ScheduleTime = styled.div`
line-height: 1.5;
float: right;
margin-right: 6px;
font-size: 14px;
font-weight: 600;
color: gray;
`