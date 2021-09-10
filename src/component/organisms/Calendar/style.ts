import styled from 'styled-components'

export const Calendar = styled.div`
  width: 350px;
  background-color: #292726;
  display: inline-block;
`

export const Body = styled.div`
  margin: 0 0 5px 0;
  color: white;
  position: relative;
  padding: 0 7px;
`

export const BodyButton = styled.button`
  float: right;
  border-radius: 7px;
  top: 10px;
  width: 40px;
  height: 47px;
  font-size: 35px;
  color: white;
  border: 0;
  padding: 0;
  background-color: rgb(58, 58, 58);
  cursor: pointer;
  transition: all 0.3s;
  &:hover{
      transform: translateY(-5px);
  }
`

export const MonthSpan = styled.span`
font-size: 32px;
font-weight: 600;
`

export const YearSpan = styled.span`
font-size: 32px;
font-weight: 600;
color:red;
`

export const Row = styled.div`
  width: 350px;
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
  transition: background-color 0.5s;
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
  transition: background-color 0.5s;
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