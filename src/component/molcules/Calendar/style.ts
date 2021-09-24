import styled from 'styled-components'

export const Calendar = styled.div`
  background-color: #292726;
  display: inline-block;
`

export const Body = styled.div`
  color: white;
  position: relative;
  & button:first-child{
    margin-left: 30px;
  }
`
interface CalendarWrapperProps {
  clicked: boolean
}

export const CalendarWrapper = styled.div<CalendarWrapperProps>`
  display: ${(props)=>(props.clicked ? 'block' : 'none')};
`

export const BodyButton = styled.button`
  float: right;
  border-radius: 7px;
  top: 10px;
  width: 50px;
  height: 50px;
  font-size: 24px;
  color: white;
  border: 0;
  padding: 0;
  background-color: rgb(58, 58, 58);
  cursor: pointer;
  transition: all 0.2s;
  &:hover{
      color: red;
  }
`

export const MonthSpan = styled.span`
font-size: 32px;
font-weight: 600;
line-height: 1.62;
`

export const YearSpan = styled.span`
font-size: 32px;
font-weight: 600;
color:red;
`

export const Row = styled.div`
  height: 43px;
  position: relative;
`

export const Box = styled.div`
  margin: 5px;
  width: 33px;
  height: 33px;
  border-radius: 33px;
  float: left;
  text-align: center;
  line-height: 2.1;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: green;
  }
  &.today {
  color: skyblue !important;
    }
    &.selected {
    background-color: rgba(231, 231, 231, 0.384) !important;
    }
    &.grayed {
    color: gray !important;
    cursor: unset;
    background-color: transparent !important;
    }
    
  &:nth-child(2) {
     color: red;
   }
  
   &:last-child {
     color: rgb(61, 61, 255);
   }
`

export const Day = styled.div`
  margin: 5px;
  width: 33px;
  height: 33px;
  border-radius: 33px;
  float: left;
  text-align: center;
  line-height: 2.1;
  color: white;
`

export const DayCw = styled.div`
  border-right: 1px solid gray;
  color: gray;
  margin: 5px;
  width: 33px;
  height: 33px;
  border-radius: 33px;
  float: left;
  text-align: center;
  line-height: 2.1;
  color: white;
`

export const Cw = styled.div`
  margin: 5px;
  width: 33px;
  height: 33px;
  border-radius: 33px;
  float: left;
  text-align: center;
  line-height: 2.1;
  color: white;
  color: gray;
  border-right: 1px solid gray;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
  background-color: green;
}
&.today {
  color: skyblue !important;
    }
    &.selected {
    background-color: rgba(231, 231, 231, 0.384) !important;
    }
`

export const ThisDayWrapper = styled.div`
  position: absolute;
  top: 15px;
  width: 33px;
  height: 10px;
  pointer-events: none;
`

interface ThisDayProps {
  backgroundColor: string
}

export const ThisDay = styled.div<ThisDayProps>`
  margin-left: 1px;
  margin-right: 1px;
  border-radius: 6px;
  width: 6px;
  display: inline-block;
  height: 6px;
  background-color: ${(props)=>props.backgroundColor};
`