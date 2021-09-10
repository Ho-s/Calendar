import styled from 'styled-components'

export const WeekComponent = styled.div`
    height: calc(100vh - 30px);
    width: 100%;
    overflow: auto;
    position: relative;
`

export const WeekLeft = styled.div`
    height: 100vh;
    width: 70px;
    float: left;
`

export const WeekBox = styled.div`
    float: left;
    font-weight: 600;
    color:black;
    transition: background-color .5s;
    font-size: 26px;
    width: calc((100vw - 430px) / 7);
    &.week-selected span{
        background-color: skyblue;
        color: white;
        border-radius: 60px;
    }
    &.week-grayed{
        color: #e9e9e9 !important;
        cursor: unset;
        background-color: transparent !important;
    }
`

export const WeekBoxSpan = styled.span``

export const WeekDay = styled.div`
    float: left;
    font-weight: 600;
    color: #e9e9e9;
    width: calc((100vw - 430px) / 7);
`

interface RedLineProps {
    top:string
}

export const RedLine = styled.div<RedLineProps>`
    font-weight: 600;
    color: red;
    height: 0;
    border-bottom: 1px solid red;
    width: 100%;
    position: absolute;
    top:${(props)=>props.top};
`

export const Time = styled.div`
color: gray;
font-weight: 600;
text-align: right;
float: left;
height: 61px;
width: 100%;
`

export const WeekTitleWrapper= styled.div`
float: left;
width: 70px;
height: 55.55px;
margin-bottom: 45px;
font-size: 15px;
font-weight: 600;
`

export const WeekTitleWeek = styled.div`
color: rgb(47, 72, 218);
`

export const WeekTitleMonth = styled.div`
color: black;
 font-size: 14px;
`
export const WeekTitleYear = styled.div`
color: 'red';
`

export const BodyWrapper = styled.div`
position: relative;
width: calc((100vw - 430px) / 7);
float: left;
`

export const BodyTopWrapper = styled.div`
width: calc((100vw - 430px) / 7);
 height: 50px;
`

export const TimeLine = styled.div`
    float: left;
    border-bottom: 1px solid #e9e9e9;
    height: 60px;
    width: 100%;
    border-left: 1px solid #e9e9e9;
`

interface ScheduleWrapperProps{
    top:number
    height:number
}

export const ScheduleWrapper = styled.div<ScheduleWrapperProps>`
    right: 0;
    position: absolute;
    width: 100%;
    top:${(props)=>props.top};
    height:${(props)=>props.height};
`

interface ScheduleBackProps{
    backgroundColor:string
}

export const ScheduleBack = styled.div<ScheduleBackProps>`
opacity: 0.5;
width: 100%;
height: 100%;
float: left;
background-color: ${(props)=>props.backgroundColor};
`

interface ScheduleBodyProps{
    top:number
}

export const ScheduleBody = styled.div<ScheduleBodyProps>`
font-size: 15px;
font-weight: 600;
color: black;
position: relative;
top:${(props)=>props.top};
`

interface ScheduleBodyBackProps{
    height:number
    backgroundColor:number
}

export const ScheduleBodyBack = styled.div<ScheduleBodyBackProps>`
    width: 10px;
    position: absolute;
    left: 0;
    top:${(props)=>props.height};
    height:${(props)=>props.height};
    background-color:${(props)=>props.backgroundColor};
`

export const ScheduleTime = styled.div`
margin-left: 10px;
`

export const ScheduleTitle = styled.div`
width: calc(100% - 10px);
text-overflow: ellipsis;
overflow: hidden;
white-space: nowrap;
height: 17px;
margin-left: 10px;
`
