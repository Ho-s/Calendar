import styled from 'styled-components'

interface SchedulerProps {
    top: boolean
}

export const Scheduler = styled.div<SchedulerProps>`
    display:${(props)=>(props.top ? 'block' : 'none')};
    width: 344px;
    background-color: white;
    border-radius: 4px;
    border: 2px solid #e9e9e9;
    margin: 1px;
`

export const SchedulerHead = styled.div`
    width: 90%;
    height: 40px;
    padding: 5%;
    border-bottom: 1px solid #e9e9e9;
    position: relative;
`

interface SchedulerHeadInputProps {
    placeholder:string;
}

export const SchedulerHeadInput = styled.input<SchedulerHeadInputProps>`
    padding: 0;
    outline: 0;
    height: 100%;
    width: 100%;
    font-size: 20px;
    font-weight: 600;
    float: left;
    text-decoration: none;
    transition: color .4s, background-color .4s;
    border:${(props)=>(props.placeholder === 'Title' ? 0 : '4px solid red')};
    background-color:${(props)=>(props.placeholder === 'Title' ? 'transparent' : 'red')};
    color:${(props)=>(props.placeholder === 'Title' ? 'black' : 'white')};
    animation: ${(props)=>(props.placeholder === 'Title' ? '' : 'alert .4s .4s forwards')};
    @keyframes alert {
    0% {
        opacity: 1;
        right: 83px;
    }
    100% {
        background-color: transparent;
        color: black;
        border: 4px solid red;
    }
    }
`

export const SchedulerBody = styled.div`
    width: 90%;
    padding: 5%;
    color: black;
    font-weight: 600;
`

interface NoStyleInputProps {
    border?:string
}

export const NoStyleInput = styled.input<NoStyleInputProps>`
    border: 0;
    outline: 0;
    border:${(props)=>props.border};
`

interface SchedulerBodyTimeProps {
    border?:string
}

export const SchedulerBodyTime = styled.div<SchedulerBodyTimeProps>`
    height: 37px;
    margin-bottom: 20px;
    border:${(props)=>props.border};
    & input:nth-child(1),
    & input:nth-child(2),
    & input:nth-child(4),
    & input:nth-child(5){
        width: 30px;
    }
    & input:nth-child(3){
        width: 50px;
        margin-right: 20px;
    }
`

export const SchedulerTimeError = styled.div`
    position: relative;
    font-size: 17px;
    top: 12px;
    left: 104px;
    border:1px solid red;
    z-index: 4;
    color: red;
    background-color: white;
    display: inline-block;
    &::after{
    content: '';
    width: 0;
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 10px solid transparent;
    border-bottom-color: red;
}
`

export const SchedulerDayError = styled.div`
    position: relative;
    font-size: 17px;
    top: 9px;
    left: 50px;
    border:1px solid red;
    z-index: 4;
    color: red;
    background-color: white;
    display: inline-block;
    &::after{
    content: '';
    width: 0;
    position: absolute;
    bottom: 100%;
    left: 22%;
    transform: translateX(-50%);
    border: 10px solid transparent;
    border-bottom-color: red;
}
`

export const SchedulerBodyColor = styled.div`
    height: 40px;
`

export const SchedulerBodyColorSpan = styled.span`
    float: left;
`

export const SchedulerBodyColorInput = styled.input`
    height: 40px;
    width: 40px;
    margin:0 19px;
    cursor: pointer;
    float: left;
    padding: 0;
`

export const SchedulerFoot = styled.div`
    width: 100%;

`

interface SchedulerFootButtonProps {
    backgroundColor: string
}

export const SchedulerFootButton = styled.button<SchedulerFootButtonProps>`
    outline: none;
    border: 0;
    padding: 0;
    color:white;
    border-radius: 14px;
    font-size: 20px;
    width: 250px;
    height: 50px;
    margin:20px 49px;
    cursor: pointer;
    transition: background-color .4s;
    background-color: ${(props)=>props.backgroundColor};
    &:hover{
        background-color:#292726 !important;
        border: 1px solid gray;
    }
`

export const TimeSpan = styled.span`
float: left;
`

export const TimeDiv = styled.div`
margin-left: 26px;
float: left;
`


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
  z-index:3;
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

interface AddScheduleDivProps {
  animation:boolean
}

export const AddScheduleDiv = styled.div<AddScheduleDivProps>`
  animation: ${(props)=>(props.animation ? 'backward .4s forwards' : 'forward .4s forwards')};

@keyframes forward {
  100% {
    opacity: 1;
    right: 83px;
  }
}

@keyframes backward {
  0% {
    opacity: 1;
    right: 83px;
  }
  100% {
    opacity: 0;
    right: 0;
  }
}
`

interface AddScheduleSpanProps {
  paddingRight: string
}

export const AddScheduleSpan = styled.span<AddScheduleSpanProps>`
padding-right: ${(props)=>(props.paddingRight === 'Close Scheduler' ? '20px' : '0')};
position: relative;
transition: all .6s;
`